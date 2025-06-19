'use client'

import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)

      const alreadyInstalled = localStorage.getItem('thinnora_installed')
      if (!alreadyInstalled) {
        setShowPrompt(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          localStorage.setItem('thinnora_installed', 'yes')
        }
        setShowPrompt(false)
      })
    }
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
    // Optional: delay the next prompt attempt
    localStorage.setItem('thinnora_prompt_dismissed', Date.now().toString())
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-xl shadow-md z-50 max-w-xs">
      <p className="font-medium">Install Thinnora for a better experience?</p>
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={dismissPrompt}
          className="px-3 py-1 text-sm text-black border border-gray-400 rounded hover:bg-gray-100"
        >
          Maybe Later
        </button>
        <button
          onClick={installApp}
          className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-900"
        >
          Install App
        </button>
      </div>
    </div>
  )
}
