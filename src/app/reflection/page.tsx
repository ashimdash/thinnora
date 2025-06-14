'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ReflectionPage() {
  const router = useRouter()
  const [reflection, setReflection] = useState<string | null>(null)
  const [inputs, setInputs] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem('latest_reflection')
    if (!stored) {
      router.push('/reflect')
    } else {
      const parsed = JSON.parse(stored)
      setReflection(parsed.reflection)
      setInputs(parsed)
    }
  }, [router])

  if (!inputs) return null

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white space-y-10">
      <h1 className="text-3xl font-bold text-center mb-6 drop-shadow">🪞 Your Guided Reflection</h1>
      <div className="bg-white/10 p-6 rounded-2xl space-y-2">
        <p><strong>Guide:</strong> {inputs.guide}</p>
        <p><strong>Decision:</strong> {inputs.decision}</p>
        <p><strong>Options:</strong> {inputs.options}</p>
        <p><strong>Fears:</strong> {inputs.fears}</p>
        <p><strong>Values:</strong> {inputs.values}</p>
        <p><strong>Extra:</strong> {inputs.extra}</p>
        <hr />
        <p className="text-blue-100 whitespace-pre-wrap">
          {reflection || 'No reflection was generated.'}
        </p>
      </div>
    </div>
  )
}