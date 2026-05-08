import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

function hasImagePart(messages) {
  return messages.some(
    (m) => Array.isArray(m.content) && m.content.some((c) => c.type === 'image')
  )
}

function collectTextFromParts(parts) {
  return parts
    .filter((c) => c.type === 'text')
    .map((c) => c.text)
    .join('\n')
}

async function analyzeImagesWithGLM(messages, glmClient) {
  const result = await streamText({
    model: glmClient.chat('glm-4v-flash'),
    system: '请详细描述图片中的内容，包括物体、场景、颜色、文字、人物动作等细节。',
    messages,
  })

  let description = ''
  const stream = result.textStream
  for await (const chunk of stream) {
    description += chunk
  }
  return description
}

function replaceImagePartsWithText(messages, imageDescription) {
  return messages.map((m) => {
    if (Array.isArray(m.content)) {
      const textContent = collectTextFromParts(m.content)
      const imageNote = imageDescription ? `[用户发送了一张照片，照片内容为：${imageDescription}]` : '用户发送了一张照片'
      const combined = [textContent, imageNote].filter(Boolean).join('\n')
      return { role: m.role, content: combined || '用户发送了一张图片' }
    }
    return m
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const deepseekKey = process.env.DEEPSEEK_API_KEY
  const zhipuKey = process.env.ZHIPU_API_KEY

  if (!deepseekKey) {
    return res.status(500).json({ error: 'DEEPSEEK_API_KEY is not configured' })
  }

  try {
    const { messages, systemPrompt } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages is required and must be an array' })
    }

    const deepseek = createOpenAI({
      apiKey: deepseekKey,
      baseURL: 'https://api.deepseek.com/v1',
    })

    let finalMessages = messages

    if (hasImagePart(messages)) {
      if (!zhipuKey) {
        return res.status(500).json({ error: 'ZHIPU_API_KEY is required for image analysis' })
      }

      const glm = createOpenAI({
        apiKey: zhipuKey,
        baseURL: 'https://open.bigmodel.cn/api/paas/v4',
      })

      const imageDescription = await analyzeImagesWithGLM(messages, glm)
      finalMessages = replaceImagePartsWithText(messages, imageDescription)
    }

    const result = await streamText({
      model: deepseek.chat('deepseek-chat'),
      system: systemPrompt || '',
      messages: finalMessages,
    })

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Connection': 'keep-alive',
    })

    const stream = result.textStream
    for await (const chunk of stream) {
      res.write(chunk)
    }

    res.end()
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}