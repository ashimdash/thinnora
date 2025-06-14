'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'

export default function HomePage() {
  const router = useRouter()
  const [guide, setGuide] = useState<'Gia' | 'Vian' | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = () => {
    if (!guide) return
    localStorage.setItem('thinnora_guide', guide)
    router.push('/reflect')
  }

  return (
    <>
      <SignedOut>
        <div className="h-screen overflow-hidden flex items-center justify-center">
          <SignIn
            routing="hash"
            appearance={{
              variables: {
                colorBackground: 'transparent',
                colorInputBackground: 'rgba(255,255,255,0.1)',
                colorText: '#ffffff',
              },
              elements: {
                card: 'bg-transparent backdrop-blur-md border border-white/10 shadow-xl',
                headerTitle: 'text-white',
                headerSubtitle: 'text-white/70',
                formFieldInput: 'bg-white/10 text-white placeholder-white/50',
                footer: 'bg-transparent text-white/60',
                footerAction: 'text-white/60',
                footerActionLink: 'text-white/80 hover:text-white',
              },
            }}
          />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="fixed bottom-6 right-4 md:bottom-10 md:right-10">
          <div
            className={`max-w-xs w-full rounded-2xl shadow-lg px-6 py-5 transition-opacity duration-700 ${
              mounted ? 'opacity-100' : 'opacity-0'
            } bg-white/5 backdrop-blur-sm border border-white/0`}
            style={{ boxShadow: 'inset 0 0 0.5px rgba(255,255,255,0.2)' }}
          >
            <h1 className="text-xl font-semibold text-center text-sky-100 drop-shadow-sm">
              Choose your guide
            </h1>

            <div className="flex flex-col gap-3 text-sm mt-4">
              <label
                className={`flex flex-col gap-1 p-3 rounded-lg transition hover:shadow-md hover:ring-2 hover:ring-rose-400 cursor-pointer ${
                  guide === 'Gia' ? 'bg-white/10 ring-rose-400' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="guide"
                    value="Gia"
                    checked={guide === 'Gia'}
                    onChange={() => setGuide('Gia')}
                    className="accent-rose-400"
                  />
                  <span className="text-cyan-200 font-medium drop-shadow">🧘 Gia</span>
                </div>
                <p className="text-white/70 text-xs pl-6 italic">
                  Emotionally attuned, intuitive, gentle reflection.
                </p>
              </label>

              <label
                className={`flex flex-col gap-1 p-3 rounded-lg transition hover:shadow-md hover:ring-2 hover:ring-indigo-400 cursor-pointer ${
                  guide === 'Vian' ? 'bg-white/10 ring-indigo-400' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="guide"
                    value="Vian"
                    checked={guide === 'Vian'}
                    onChange={() => setGuide('Vian')}
                    className="accent-indigo-500"
                  />
                  <span className="text-indigo-600 font-medium drop-shadow">🧠 Vian</span>
                </div>
                <p className="text-white/70 text-xs pl-6 italic">
                  Logical, calm, clarity-focused decision support.
                </p>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className={`w-full mt-4 py-2 rounded-md font-medium transition ${
                guide
                  ? 'bg-white text-black hover:bg-gray-100'
                  : 'bg-white/30 text-white/60 cursor-not-allowed'
              }`}
              disabled={!guide}
            >
              Continue
            </button>
          </div>
        </div>
      </SignedIn>
    </>
  )
}
