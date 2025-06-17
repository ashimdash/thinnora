// app/api/send-feedback/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { message, email, wantsUpgrade } = await req.json()

  try {
    await resend.emails.send({
      from: 'admin@thinnora.space',
      to: ['dash.ashim@gmail.com','sunitapanigrahi66@gmail.com'], // ← Change to your receiving inbox
      subject: '📝 New Feedback from Thinnora',
      text: `
New feedback received:

Message:
${message}

User Email: ${email || 'Not provided'}
Interested in upgrade: ${wantsUpgrade ? 'Yes' : 'No'}
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send failed:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
