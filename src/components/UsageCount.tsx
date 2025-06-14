'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { getRemainingReflections } from '@/components/usageLimit'

export default function UsageCount() {
  const { user } = useUser()
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress ?? null
    console.log('Logged in email:', email)
    setRemaining(getRemainingReflections(email))
  }, [user])

  return remaining !== null ? (
    <div className="text-xs text-white bg-blue-700 px-2 py-1 rounded-full inline-block">
      {remaining === Infinity ? 'Unlimited reflections' : `${2 - remaining}/2 reflections today`}
    </div>
  ) : null
}