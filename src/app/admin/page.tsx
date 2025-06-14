'use client'

import { useEffect, useState } from 'react'

export default function AdminUsersPage() {
  const [emailInput, setEmailInput] = useState('')
  const [whitelist, setWhitelist] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('thinnora_whitelist')
    if (stored) {
      setWhitelist(JSON.parse(stored))
    }
  }, [])

  const saveWhitelist = (list: string[]) => {
    setWhitelist(list)
    localStorage.setItem('thinnora_whitelist', JSON.stringify(list))
  }

  const addEmail = () => {
    const email = emailInput.trim().toLowerCase()
    if (email && !whitelist.includes(email)) {
      saveWhitelist([...whitelist, email])
      setEmailInput('')
    }
  }

  const removeEmail = (emailToRemove: string) => {
    saveWhitelist(whitelist.filter(e => e !== emailToRemove))
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-white space-y-6">
      <h1 className="text-2xl font-bold text-sky-500">🔓 Admin: Whitelist Users</h1>

      <p className="text-sm text-white/70">Add emails here for users who should bypass the 2-reflection limit.</p>

      <div className="flex gap-2">
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="email@example.com"
          className="flex-1 p-2 rounded text-black"
        />
        <button
          onClick={addEmail}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 text-sm">
        {whitelist.map((email) => (
          <li key={email} className="flex justify-between items-center bg-white/10 p-2 rounded">
            <span>{email}</span>
            <button
              onClick={() => removeEmail(email)}
              className="text-red-400 hover:text-red-600 text-xs"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}