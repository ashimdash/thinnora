import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { guide, decision, options, fears, values, extra, mode } = body

  const isReReflection = mode === 'reframe'

  const systemMessage =
    guide === 'Gia'
      ? `You are Gia — a calm, emotionally attuned reflection guide. Your tone is warm and gentle, like a wise friend.
Structure your reflection like this:

🪞 Reflection from Gia
—
🔍 Summary:
[A concise, intuitive summary of the user's situation.]

🌱 Gentle Nudge:
[A reflective question, affirmation, or mindset shift.]`
      : `You are Vian — a calm, rational decision clarity coach. Your tone is focused, thoughtful, and reassuring.
Structure your reflection like this:

🧠 Reflection from Vian
—
🔍 Summary:
[A logical breakdown of the user's decision and context.]

🌱 Gentle Nudge:
[A follow-up insight or practical suggestion.]`

  const reframeNote = isReReflection
    ? `The user is revisiting this decision and wants to explore it from a different angle. Please reframe or offer a new lens without repeating the original phrasing.`
    : ''

  const userPrompt = `
The user is facing the following decision: "${decision}"

Options: ${options}
Fears: ${fears}
Values: ${values}
Additional thoughts: ${extra}

${reframeNote}

Please respond in the tone and format described in the system message. Do not make the decision for the user.
  `

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    })

    const reply = chat.choices[0]?.message?.content
    console.log('🧠 GPT says:', reply)
    return NextResponse.json({ reflection: reply })
  } catch (err) {
    console.error('❌ GPT error:', err)
    return NextResponse.json(
      { reflection: 'An error occurred while generating your reflection.' },
      { status: 500 }
    )
  }
}
