export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages is required and must be an array' })
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'DEEPSEEK_API_KEY is not configured' })
  }

  try {
    const judgeSystemPrompt = `分析对话，只返回JSON。{
  "contentReady": boolean,
  "userWantsPost": boolean
}

判断标准：
- contentReady=true：用户至少分享了3条以上具体信息（包含具体的地点/价格/菜名/感受/评价等实质性细节）
- contentReady=false：只有寒暄、笼统回答、信息量太少，不足以写出有内容的帖子
- userWantsPost=true：仅当用户在**最新一条消息**中表达了发帖意愿（包括"帮我写篇笔记""生成帖子""想"等肯定回复）
- userWantsPost=false：用户最新消息只是正常聊天，忽略之前的所有旧意图`

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: judgeSystemPrompt },
          { role: 'user', content: JSON.stringify(messages.map(m => ({
            role: m.role,
            content: typeof m.content === 'string' ? m.content.substring(0, 120) : '[图片]'
          }))) },
        ],
        stream: false,
      }),
    })

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ''

    let result
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : { contentReady: false, userWantsPost: false }
    } catch {
      result = { contentReady: false, userWantsPost: false }
    }

    return res.json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
