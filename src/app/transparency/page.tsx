'use client'

import { useRouter } from 'next/navigation'

export default function TransparencyPage() {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 text-black space-y-6">
      <h1 className="text-3xl font-bold text-sky-900 drop-shadow-sm">
        Transparency & Trust
      </h1>

      <p className="text-base text-black drop-shadow-sm">
        Thinnora exists to help you think clearly — and that means being clear with you, too.
        Here's how we handle your data, your reflections, and your trust.
      </p>

      <div className="space-y-4 text-sm text-black drop-shadow-sm">
        <div>
          <h2 className="font-semibold text-black">🧠 Powered by AI</h2>
          <p>
            Reflections are generated using OpenAI's GPT model. Thinnora guides the tone and structure,
            but the response is still machine-generated — not human, not perfect.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-black">🔒 Local-only storage</h2>
          <p>
            Your reflections are saved only in your browser using localStorage. We do not send or store your thoughts
            on any external server. If you clear your browser or use a different device, your reflections won't follow you.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-black">⚠️ Not a clinical tool</h2>
          <p>
            Thinnora is not therapy, diagnosis, or medical advice. It’s a personal reflection space — not a substitute for professional help.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-black">📊 Usage limits</h2>
          <p>
            Free users can reflect up to <strong>2 times per day</strong>. This helps keep the service sustainable. 
            Paid subscribers (coming soon) will receive higher limits and extra features like history sync, voice playback, and export.
          </p>
          <p
            className="mt-2 text-blue-500 underline cursor-pointer"
            onClick={() => router.push('/feedback')}
          >
            Want more? Let us know →
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-black">🚧 Still growing</h2>
          <p>
            Thinnora is a work in progress. We’re learning with you. If you spot an issue or want to suggest
            something, reach out. We're building this mindfully, together.
          </p>
        </div>
      </div>

      <div className="pt-6 text-center">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          ⬅ Back to Start
        </button>
      </div>
    </div>
  )
}
