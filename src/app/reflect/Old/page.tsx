'use client'

import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import { saveToHistory } from '@/lib/history'
import { v4 as uuidv4 } from 'uuid'
import {
  canReflectToday,
  recordReflection,
  getRemainingReflections,
} from '@/lib/usageLimit'
import type { ReflectionEntry } from '@/lib/history'

export default function ReflectPage() {
  const router = useRouter()
  const [guide, setGuide] = useState<string | null>(null)
  const [decision, setDecision] = useState('')
  const [options, setOptions] = useState('')
  const [fears, setFears] = useState('')
  const [values, setValues] = useState('')
  const [extra, setExtra] = useState('')
  const [reflection, setReflection] = useState('')
  const [loading, setLoading] = useState(false)

  const autoGrow = (el: HTMLTextAreaElement | null) => {
    if (el) {
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + 'px'
    }
  }

  useEffect(() => {
    const storedGuide = localStorage.getItem('thinnora_guide')
    if (!storedGuide) {
      router.push('/')
    } else {
      setGuide(storedGuide)
    }
  }, [router])

  const handleSubmit = async () => {
    if (!canReflectToday()) {
      alert('You’ve reached your daily limit of 2 reflections. Want more? Send us feedback!')
      router.push('/feedback')
      return
    }

    setLoading(true)
    setReflection('')

    const payload = {
      guide,
      decision,
      options,
      fears,
      values,
      extra,
    }

    try {
      const res = await fetch('/api/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      const reflectionResult = data.result
      const id = uuidv4()

      const newEntry: ReflectionEntry = {
        id,
        guide: guide ?? '',
        decision,
        options,
        fears,
        values,
        extra,
        reflection: reflectionResult,
        timestamp: Date.now(),
        date: new Date().toISOString().split('T')[0],
      }

      localStorage.setItem('latest_reflection', JSON.stringify(newEntry))
      saveToHistory(newEntry)
      recordReflection()

      router.push('/reflection')
    } catch (error) {
      console.error('Reflection submission error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {guide && (
        <p className="text-center text-sm italic text-gray-200 mb-6">
          Reflecting with {guide === 'Gia' ? 'Gia – Gentle & thoughtful 🌿' : 'Vian – Bold & analytical 🔥'}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'decision', label: '🧠 What decision are you facing?', value: decision, setter: setDecision },
          { id: 'options', label: '✍️ Options you’re considering?', value: options, setter: setOptions },
          { id: 'fears', label: '😨 Any fears or doubts?', value: fears, setter: setFears },
          { id: 'values', label: '💡 What do you value most?', value: values, setter: setValues },
        ].map(({ id, label, value, setter }) => (
          <div key={id}>
            <label htmlFor={id} className="block font-semibold mb-2 text-gray-200">{label}</label>
            <textarea
              id={id}
              value={value}
              onChange={(e) => {
                setter(e.target.value);
                autoGrow(e.target);
              }}
              maxLength={300}
              className="w-full p-3 border border-gray-500 bg-transparent text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 overflow-hidden resize-none"
              rows={1}
            />
            <p className="text-sm text-gray-400 text-right">{value.length}/300</p>
          </div>
        ))}

        <div className="md:col-span-2">
          <label htmlFor="extra" className="block font-semibold mb-2 text-gray-200">🗒️ Extra thoughts (optional)</label>
          <textarea
            id="extra"
            value={extra}
            onChange={(e) => {
              setExtra(e.target.value);
              autoGrow(e.target);
            }}
            maxLength={300}
            className="w-full p-3 border border-gray-500 bg-transparent text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 overflow-hidden resize-none"
            rows={1}
          />
          <p className="text-sm text-gray-400 text-right">{extra.length}/300</p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-transparent p-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '🧘‍♀️ Reflecting...' : 'Submit Reflection'}
        </button>
      </div>
    </div>
  )
}
