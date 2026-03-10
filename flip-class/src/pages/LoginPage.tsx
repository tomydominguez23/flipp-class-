import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { login } from '../lib/auth'
import { useAuth } from '../auth/useAuth'
import { COURSE_TITLE } from '../lib/courseData'

export function LoginPage() {
  const { isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = useMemo(() => {
    const state = location.state as { from?: string } | null
    return state?.from ?? '/app'
  }, [location.state])

  if (isAuthenticated) return <Navigate to="/app" replace />

  return (
    <div className="fc-auth-shell">
      <div className="fc-auth-grid">
        <aside className="fc-auth-brand">
          <div className="fc-auth-brand-inner">
            <Link to="/" className="inline-block">
              <div className="text-4xl font-semibold tracking-wide text-slate-900">{COURSE_TITLE}</div>
              <div className="mt-1 text-sm font-semibold tracking-[0.38em] text-amber-700">AUTOS EN CHILE</div>
            </Link>

            <h1 className="mt-12 text-5xl font-extrabold leading-tight text-white">
              Bienvenido a
              <br />
              {COURSE_TITLE}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              Tu portal de estudio para dominar el negocio automotriz con metodología práctica y
              visión profesional.
            </p>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
              <div>
                <div className="text-5xl font-extrabold text-amber-300">7</div>
                <div className="mt-2 text-sm text-white/65">Modulos</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-amber-300">30+</div>
                <div className="mt-2 text-sm text-white/65">Lecciones</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-amber-300">3</div>
                <div className="mt-2 text-sm text-white/65">Planes</div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <span className="fc-auth-chip">📹 Sesiones en vivo</span>
              <span className="fc-auth-chip">🤝 Comunidad de flippers</span>
              <span className="fc-auth-chip">🧾 Plantillas y contratos</span>
            </div>
          </div>
        </aside>

        <main className="fc-auth-panel">
          <div className="mx-auto w-full max-w-md">
            <h2 className="text-4xl font-extrabold text-slate-800">Iniciar Sesión</h2>
            <p className="mt-2 text-slate-500">
              Ingresa tus credenciales para acceder a tu portal de estudio.
            </p>

            <form
              className="mt-8"
              onSubmit={(e) => {
                e.preventDefault()
                const res = login({ email })
                if (!res.ok) {
                  setError(res.error)
                  return
                }
                navigate(redirectTo, { replace: true })
              }}
            >
              <label className="fc-auth-label" htmlFor="email">
                Correo electrónico
              </label>
              <input
                id="email"
                className="fc-auth-input mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
              />

              <label className="fc-auth-label mt-5" htmlFor="password">
                Contraseña
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  className="fc-auth-input pr-11"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  👁
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <label className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-700 focus:ring-slate-400"
                  />
                  Recordarme
                </label>
                <button type="button" className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}

              <button type="submit" className="fc-auth-submit mt-6 w-full">
                ➜ Ingresar al Portal
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              o continúa con
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" className="fc-auth-social">
                <span className="text-red-500">G</span> Google
              </button>
              <button type="button" className="fc-auth-social">
                <span className="text-blue-600">f</span> Facebook
              </button>
            </div>

            <div className="mt-7 text-center text-sm text-slate-500">
              No tienes una cuenta?{' '}
              <Link to="/registro" className="font-semibold text-teal-700 hover:text-teal-800">
                Regístrate aquí
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

