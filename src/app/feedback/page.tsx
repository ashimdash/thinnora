'use client'

import { useState } from 'react'

export default function FeedbackPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [wantsUpgrade, setWantsUpgrade] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/send-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, email, wantsUpgrade }),
    })

    if (res.ok) {
      setStatus('sent')
      setEmail('')
      setMessage('')
      setWantsUpgrade(false)
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-white space-y-6">
      <h1 className="text-3xl font-bold text-sky-900 drop-shadow">📝 Feedback</h1>
      <p className="text-white/80">Share your thoughts. Your feedback helps improve Thinnora!</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 rounded-xl text-black"
          rows={5}
          placeholder="What did you think?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full p-2 rounded-xl text-black"
          placeholder="Your email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={wantsUpgrade}
            onChange={(e) => setWantsUpgrade(e.target.checked)}
          />
          I’d be interested in more than 2 reflections/day
        </label>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          {status === 'loading' ? 'Sending...' : 'Send Feedback'}
        </button>
      </form>

      {status === 'sent' && <p className="text-green-400">Thank you! Feedback received 💌</p>}
      {status === 'error' && <p className="text-red-400">Something went wrong. Please try again.</p>}
    </div>
  )
}
