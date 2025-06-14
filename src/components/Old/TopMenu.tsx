'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SignOutButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

export default function TopMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="fixed top-6 right-6 z-50" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-white text-xl px-3 py-1 rounded-full hover:bg-white/10 transition"
        aria-label="Open menu"
      >
        ⋯
      </button>

      {open && (
        <div className="mt-2 w-60 bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4 text-sm text-black space-y-3">
          <SignedIn>
            <button
              onClick={() => {
                setOpen(false)
                router.push('/history')
              }}
              className="w-full text-left hover:text-sky-700"
            >
              📚 Reflection History
            </button>

            <button
              onClick={() => {
                setOpen(false)
                router.push('/about')
              }}
              className="w-full text-left hover:text-sky-700"
            >
              🧘 About Thinnora
            </button>

            <button
              onClick={() => {
                setOpen(false)
                router.push('/transparency')
              }}
              className="w-full text-left hover:text-sky-700"
            >
              🛡️ Transparency & Trust
            </button>

            <SignOutButton redirectUrl="/">
              <button
                onClick={() => setOpen(false)}
                className="w-full text-left text-red-600 hover:text-red-800"
              >
                🚪 Sign out
              </button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <p className="text-sm text-gray-700">Please log in to access this menu.</p>
            <SignInButton mode="modal">
              <button
                onClick={() => setOpen(false)}
                className="w-full text-left text-sky-700 hover:text-sky-900 underline"
              >
                🔐 Log in
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      )}
    </div>
  )
}
