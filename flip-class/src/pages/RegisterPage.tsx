import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { register } from '../lib/auth'
import type { PlanId } from '../lib/types'
import { plans } from '../lib/plans'
import { readLocal, removeLocal } from '../lib/storage'
import { COURSE_HERO_IMAGE, COURSE_TITLE } from '../lib/courseData'

export function RegisterPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState<PlanId>(() => readLocal<PlanId>('fc_selected_plan') ?? 'BASICO')
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) return <Navigate to="/app" replace />

  return (
    <div className="fc-register-shell">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="fc-container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-zinc-900 to-amber-600" />
            <div>
              <div className="text-sm font-semibold leading-tight">{COURSE_TITLE}</div>
              <div className="text-xs text-slate-500 leading-tight">Registro</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link className="fc-btn-secondary" to="/planes">
              Ver planes
            </Link>
            <Link className="fc-btn-primary" to="/login">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </header>

      <main className="fc-container py-10 sm:py-12">
        <div className="fc-register-grid">
          <aside className="fc-register-visual">
            <img src={COURSE_HERO_IMAGE} alt="Porsche en carretera" className="fc-register-visual-img" />
            <div className="fc-register-visual-overlay" />
            <div className="fc-register-visual-content">
              <div className="fc-badge border-white/25 bg-black/35 text-white">Acceso inmediato al portal</div>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Crea tu cuenta y empieza a construir tu sistema de compra/venta de autos.
              </h1>
              <p className="mt-4 max-w-xl text-base text-white/80">
                Módulos aplicables, recursos prácticos y comunidad para pasar de tu primer flip a una
                operación más profesional.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="fc-register-chip">
                  <div className="text-2xl font-extrabold text-amber-300">7</div>
                  <div className="text-xs text-white/70">Módulos</div>
                </div>
                <div className="fc-register-chip">
                  <div className="text-2xl font-extrabold text-amber-300">30+</div>
                  <div className="text-xs text-white/70">Lecciones</div>
                </div>
                <div className="fc-register-chip">
                  <div className="text-2xl font-extrabold text-amber-300">3</div>
                  <div className="text-xs text-white/70">Planes</div>
                </div>
              </div>
            </div>
          </aside>

          <section className="fc-register-panel">
            <h2 className="text-3xl font-extrabold text-slate-900">Crear cuenta</h2>
            <p className="mt-2 text-sm text-slate-600">
              Selecciona tu plan y entra al portal. Demo sin cobro real, enfocado en la experiencia.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="fc-auth-label" htmlFor="register-name">
                  Nombre
                </label>
                <input
                  id="register-name"
                  className="fc-auth-input mt-2"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="fc-auth-label" htmlFor="register-email">
                  Email
                </label>
                <input
                  id="register-email"
                  className="fc-auth-input mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="mt-7">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Elige tu plan</div>
              <div className="mt-3 grid gap-3">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`fc-register-plan ${plan === p.id ? 'is-selected' : ''}`}
                    onClick={() => setPlan(p.id)}
                  >
                    <div>
                      <div className="text-base font-bold text-slate-900">{p.title}</div>
                      <div className="text-xs text-slate-500">{p.subtitle}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-slate-900">${p.priceUsd}</div>
                      <div className="text-xs text-slate-500">USD</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {error ? <div className="mt-4 text-sm text-red-600">{error}</div> : null}

            <button
              className="fc-auth-submit mt-7 w-full"
              onClick={() => {
                const res = register({ nombre, email, plan })
                if (!res.ok) {
                  setError(res.error)
                  return
                }
                removeLocal('fc_selected_plan')
                navigate('/app', { replace: true })
              }}
            >
              Crear cuenta y entrar al portal
            </button>

            <div className="mt-5 text-center text-sm text-slate-500">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="font-semibold text-amber-700 hover:text-amber-800">
                Inicia sesión
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

