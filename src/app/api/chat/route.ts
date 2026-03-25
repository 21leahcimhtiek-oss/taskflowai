import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
export async function POST(req: NextRequest) {
  const { message } = await req.json()
  if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: 'You are TaskFlow AI, an expert project management assistant. Help users organize tasks, set priorities, estimate deadlines, and optimize team workflows. Be actionable and concise.' }, { role: 'user', content: message }],
    max_tokens: 2048,
  })
  return NextResponse.json({ reply: completion.choices[0].message.content })
}
