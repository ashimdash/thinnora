'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function WelcomeOverlay() {
  const [visible, setVisible] = useState(true)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()

    // Time-aware greeting logic
    if (hour >= 5 && hour < 11) {
      setGreeting('Good morning. Start your day with calm.')
    } else if (hour >= 11 && hour < 17) {
      setGreeting('Pause. You have space to reflect.')
    } else if (hour >= 17 && hour < 21) {
      setGreeting('Evenings are for letting go.')
    } else if (hour >= 21 || hour < 1) {
      setGreeting('The night is quiet. Let your thoughts be too.')
    } else {
      setGreeting('It’s late. You’re safe here with your thoughts.')
    }

    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center text-white text-xl font-medium"
          style={{ backgroundImage: "url('/background.jpg')" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="px-6 text-center"
          >
            {greeting}
            <p className="mt-2 text-base opacity-80">
              You don’t need the right words. Just start where you are.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
