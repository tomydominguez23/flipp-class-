import { useEffect, useMemo, useState } from 'react'
import { getCurrentUser, getSession } from '../lib/auth'
import { onStorageChange } from '../lib/storage'
import type { User } from '../lib/types'

export function useAuth() {
  const [version, setVersion] = useState(0)

  useEffect(() => {
    return onStorageChange(() => setVersion((v) => v + 1))
  }, [])

  return useMemo(() => {
    const session = getSession()
    const user = getCurrentUser()
    return {
      isAuthenticated: Boolean(session && user),
      session,
      user: user as User | null,
      version,
    }
  }, [version])
}

