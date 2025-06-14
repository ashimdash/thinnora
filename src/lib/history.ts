export type ReflectionEntry = {
  id: string
  guide: string
  decision: string
  options: string
  fears: string
  values: string
  extra: string
  reflection: string
  timestamp: number
  date: string
}

const STORAGE_KEY = 'thinnora_history'

export function getHistory(): ReflectionEntry[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveToHistory(entry: ReflectionEntry): void {
  const history = getHistory()
  history.push(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

export function deleteFromHistory(id: string): void {
  const history = getHistory().filter((entry) => entry.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}
