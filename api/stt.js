import crypto from 'crypto'
import WebSocket from 'ws'

const extractText = (msg) => {
  try {
    const st = msg.data?.result?.cn?.st
    if (!st || !Array.isArray(st)) return ''
    const words = []
    for (const sentence of st) {
      if (!sentence.ws) continue
      for (const word of sentence.ws) {
        if (word.cw && word.cw.length > 0) {
          words.push(word.cw[0].w)
        }
      }
    }
    return words.join('')
  } catch {
    return ''
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { audio } = req.body
  if (!audio) {
    return res.status(400).json({ error: 'audio is required' })
  }

  const APPID = process.env.XF_APPID
  const API_KEY = process.env.XF_API_KEY
  const API_SECRET = process.env.XF_API_SECRET

  if (!APPID || !API_KEY || !API_SECRET) {
    return res.status(500).json({ error: 'XF credentials not configured' })
  }

  try {
    const host = 'iat-api.xfyun.cn'
    const uri = '/v2/iat'
    const date = new Date().toUTCString()

    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${uri} HTTP/1.1`
    const sig = crypto.createHmac('sha256', API_SECRET).update(signatureOrigin).digest('base64')
    const auth = Buffer.from(`api_key="${API_KEY}", algorithm="hmac-sha256", headers="host date request-line", signature="${sig}"`).toString('base64')

    const wsUrl = `wss://${host}${uri}?authorization=${encodeURIComponent(auth)}&date=${encodeURIComponent(date)}&host=${host}`

    const { text: result, raw: rawResponses } = await new Promise((resolve, reject) => {
      const ws = new WebSocket(wsUrl)
      const responses = []
      let recognized = ''
      let resolved = false

      const finish = (err, text) => {
        if (resolved) return
        resolved = true
        try { ws.close() } catch {}
        if (err) reject({ message: err, raw: responses })
        else resolve({ text: text || '', raw: responses })
      }

      ws.on('open', () => {
        ws.send(JSON.stringify({
          common: { app_id: APPID },
          business: { language: 'zh_cn', domain: 'iat', accent: 'mandarin', vad_eos: 3000, ptt: 1 },
          data: { status: 0, format: 'audio/L16;rate=16000', encoding: 'raw', audio },
        }))

        ws.send(JSON.stringify({
          data: { status: 2, format: 'audio/L16;rate=16000', encoding: 'raw', audio: '' },
        }))
      })

      ws.on('message', (raw) => {
        const rawStr = raw.toString()
        responses.push(rawStr.slice(0, 200))

        try {
          const msg = JSON.parse(rawStr)

          if (msg.code !== 0) {
            finish(msg.message || `Error ${msg.code}`)
            return
          }

          const text = extractText(msg)
          if (text) recognized = text

          if (msg.data?.status === 2) {
            finish(null, recognized)
          }
        } catch (e) {
          finish('Parse error: ' + e.message)
        }
      })

      ws.on('error', (err) => finish('WebSocket: ' + err.message))

      ws.on('close', () => {
        if (!resolved) finish(null, recognized)
      })

      setTimeout(() => {
        if (recognized) finish(null, recognized)
        else finish('Timeout')
      }, 20000)
    })

    if (!result) {
      return res.status(500).json({
        error: '未识别到语音内容，请重试',
        debug: rawResponses,
      })
    }

    return res.json({ text: result })
  } catch (error) {
    const msg = typeof error === 'object' ? (error.message || 'Unknown') : String(error)
    const raw = error.raw || []
    return res.status(500).json({
      error: msg,
      debug: raw.length > 0 ? raw.slice(-3) : undefined,
    })
  }
}
