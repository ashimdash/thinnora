// UsageCount.tsx
'use client'
import { useEffect, useState } from 'react'
import { getRemainingReflections } from '@/lib/usageLimit'

export default function UsageCount() {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    setRemaining(getRemainingReflections())
  }, [])

  return remaining !== null ? (
    <div className="text-xs text-white bg-blue-700 px-2 py-1 rounded-full inline-block">
      {2 - remaining}/2 reflections today
    </div>
  ) : null
}