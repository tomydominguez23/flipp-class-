import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { login } from '../lib/auth'
import { useAuth } from '../auth/useAuth'

export function LoginPage() {
  const { isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = useMemo(() => {
    const state = location.state as { from?: string } | null
    return state?.from ?? '/app'
  }, [location.state])

  if (isAuthenticated) return <Navigate to="/app" replace />

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-white/5">
        <div className="fc-container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500" />
            <div>
              <div className="text-sm font-semibold leading-tight">FLIP CLASS</div>
              <div className="text-xs text-white/60 leading-tight">Login</div>
            </div>
          </Link>
          <Link className="fc-btn-secondary" to="/planes">
            Ver planes
          </Link>
        </div>
      </header>

      <main className="fc-container py-12">
        <div className="mx-auto max-w-lg fc-card p-6">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="mt-2 text-white/70">
            Demo: ingresa con tu email (sin contraseña).
          </p>

          <div className="mt-6">
            <div className="text-xs text-white/60">Email</div>
            <input
              className="fc-input mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
            {error ? <div className="mt-2 text-sm text-red-300">{error}</div> : null}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link className="fc-btn-secondary" to="/registro">
              Crear cuenta
            </Link>
            <button
              className="fc-btn-primary"
              onClick={() => {
                const res = login({ email })
                if (!res.ok) {
                  setError(res.error)
                  return
                }
                navigate(redirectTo, { replace: true })
              }}
            >
              Entrar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

