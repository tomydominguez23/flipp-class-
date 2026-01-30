import { useEffect, useMemo, useState } from 'react'
import { onStorageChange, readLocal } from './storage'

export function useStorageValue<T>(key: string, fallback: T) {
  const [version, setVersion] = useState(0)

  useEffect(() => {
    return onStorageChange(() => setVersion((v) => v + 1))
  }, [])

  return useMemo(() => {
    const v = readLocal<T>(key)
    return (v ?? fallback) as T
  }, [key, fallback, version])
}

