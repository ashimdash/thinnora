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
          setShowPrompt(false)
        }
      })
    }
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-xl shadow-md z-50">
      <p>Install Thinnora for a better experience?</p>
      <button onClick={installApp} className="mt-2 px-3 py-1 bg-black text-white rounded">
        Install App
      </button>
    </div>
  )
}
