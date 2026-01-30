export function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

const STORAGE_EVENT = 'fc-storage'

export function emitStorageChange() {
  window.dispatchEvent(new Event(STORAGE_EVENT))
}

export function onStorageChange(cb: () => void) {
  const handler = () => cb()
  window.addEventListener('storage', handler)
  window.addEventListener(STORAGE_EVENT, handler)
  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener(STORAGE_EVENT, handler)
  }
}

export function readLocal<T>(key: string): T | null {
  return safeJsonParse<T>(localStorage.getItem(key))
}

export function writeLocal<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
  emitStorageChange()
}

export function removeLocal(key: string) {
  localStorage.removeItem(key)
  emitStorageChange()
}

