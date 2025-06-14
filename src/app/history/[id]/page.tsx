'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ReflectionEntry, getHistory } from '@/lib/history'

export default function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params) // ✅ unwrap params using React.use()

  const reflections = getHistory()
  const entry = reflections.find((r) => r.id === id)

  if (!entry) {
    router.push('/history')
    return null
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 text-black space-y-6">
      <h1 className="text-2xl font-semibold">
        🪞 Reflection on: <span className="text-gray-800">{entry.decision}</span>
      </h1>

      <p className="text-sm text-gray-500 italic">
        {new Date(entry.date).toLocaleString()} • Guide: {entry.guide}
      </p>

      <div className="p-6 bg-white/70 rounded-xl shadow-md border border-gray-300 whitespace-pre-line">
        {entry.reflection}
      </div>

      <div className="text-center pt-6">
        <button
          onClick={() => router.push('/history')}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          ⬅ Back to History
        </button>
      </div>
    </div>
  )
}
