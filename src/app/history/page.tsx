'use client'

import { useEffect, useState } from 'react'
import { ReflectionEntry, getHistory, deleteFromHistory } from '@/lib/history'
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const [history, setHistory] = useState<ReflectionEntry[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = getHistory()
    setHistory(stored.reverse()) // most recent first
  }, [])

  const handleDelete = (id: string) => {
    deleteFromHistory(id)
    setHistory((prev) => prev.filter((entry) => entry.id !== id))
  }

  const handleReReflect = (entry: ReflectionEntry) => {
    localStorage.setItem('thinnora_guide', entry.guide)
    localStorage.setItem('thinnora_decision', entry.decision)
    localStorage.setItem('thinnora_options', entry.options)
    localStorage.setItem('thinnora_fears', entry.fears)
    localStorage.setItem('thinnora_values', entry.values)
    localStorage.setItem('thinnora_extra', entry.extra)
    router.push('/reflect')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-12 text-black space-y-6">
      <h1 className="text-3xl font-bold text-sky-900 drop-shadow-sm">📚 Your Reflection History</h1>

      {history.length === 0 ? (
        <p className="text-gray-600 italic">No past reflections saved yet.</p>
      ) : (
        history.map((entry) => (
          <div
            key={entry.id}
            className="p-4 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {new Date(entry.date).toLocaleDateString()} • {entry.guide}
              </span>
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
            <p
              onClick={() => router.push(`/history/${entry.id}`)}
              className="font-medium text-sky-700 hover:underline cursor-pointer"
            >
              {entry.decision}
            </p>

            <p className="text-sm text-gray-700 line-clamp-3">
              {entry.reflection}
            </p>

            <button
              onClick={() => handleReReflect(entry)}
              className="text-sm mt-2 text-blue-600 hover:underline"
            >
              🔁 Re-reflect on this
            </button>
          </div>
        ))
      )}

      <div className="text-center pt-6">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          📝 Start New Reflection
        </button>
      </div>
    </div>
  )
}
