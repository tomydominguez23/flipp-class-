import { useEffect, useMemo, useState } from 'react'
import { onStorageChange, readLocal } from './storage'

export function useStorageValue<T>(key: string, fallback: T) {
  const [version, setVersion] = useState(0)

  useEffect(() => {
    return onStorageChange(() => setVersion((v) => v + 1))
  }, [])

  // Dependemos de `version` solo para recalcular en cambios de storage.
  return useMemo(() => {
    void version
    const v = readLocal<T>(key)
    return (v ?? fallback) as T
  }, [key, fallback, version])
}

