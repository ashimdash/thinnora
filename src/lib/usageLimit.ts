const USAGE_KEY = 'thinnora_daily_usage'
const LIMIT = 2 // free tier daily cap

export function canReflectToday(): boolean {
  const usage = getUsage()
  return usage.count < LIMIT
}

export function recordReflection(): void {
  const usage = getUsage()
  const now = new Date().toISOString()

  const updated = {
    date: usage.date,
    count: usage.count + 1,
  }

  if (!isToday(usage.date)) {
    updated.date = now
    updated.count = 1
  }

  localStorage.setItem(USAGE_KEY, JSON.stringify(updated))
}

export function getRemainingReflections(): number {
  const usage = getUsage()
  return Math.max(0, LIMIT - usage.count)
}

// Helpers
function getUsage(): { date: string; count: number } {
  const raw = localStorage.getItem(USAGE_KEY)
  const today = new Date().toISOString()
  if (!raw) return { date: today, count: 0 }

  try {
    const parsed = JSON.parse(raw)
    if (!isToday(parsed.date)) {
      return { date: today, count: 0 }
    }
    return parsed
  } catch {
    return { date: today, count: 0 }
  }
}

function isToday(dateStr: string): boolean {
  const today = new Date()
  const date = new Date(dateStr)
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  )
}
