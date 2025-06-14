import { getMaxListeners } from "events"

const HARDCODED_WHITELIST = ['dash.ashim@gmail.com', 'panigrahisangeeta4@gmail.com', 'sunitapanigrahi66@gmail.com', 'drayushidash@gmail.com']

export function canReflectToday(email: string | null): boolean {
  console.log('Checking limit for:', email)
  if (email && HARDCODED_WHITELIST.includes(email.toLowerCase())) {
    return true
  }

  const today = new Date().toISOString().split('T')[0]
  const key = `reflections_${today}`
  const count = parseInt(localStorage.getItem(key) || '0', 10)

  return count < 2
}

export function recordReflection(): void {
  const today = new Date().toISOString().split('T')[0]
  const key = `reflections_${today}`
  const current = parseInt(localStorage.getItem(key) || '0', 10)
  localStorage.setItem(key, (current + 1).toString())
}

export function getRemainingReflections(email: string | null): number {
  console.log('Checking limit for:', email)
  if (email && HARDCODED_WHITELIST.includes(email.toLowerCase())) {
    return Infinity
  }

  const today = new Date().toISOString().split('T')[0]
  const key = `reflections_${today}`
  const count = parseInt(localStorage.getItem(key) || '0', 10)

  return 2 - count
}
