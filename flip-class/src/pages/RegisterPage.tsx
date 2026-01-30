import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { register } from '../lib/auth'
import type { PlanId } from '../lib/types'
import { plans } from '../lib/plans'
import { readLocal, removeLocal } from '../lib/storage'

export function RegisterPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState<PlanId>(() => readLocal<PlanId>('fc_selected_plan') ?? 'BASICO')
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) return <Navigate to="/app" replace />

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-white/5">
        <div className="fc-container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500" />
            <div>
              <div className="text-sm font-semibold leading-tight">FLIP CLASS</div>
              <div className="text-xs text-white/60 leading-tight">Registro</div>
            </div>
          </Link>
          <Link className="fc-btn-secondary" to="/planes">
            Ver planes
          </Link>
        </div>
      </header>

      <main className="fc-container py-12">
        <div className="mx-auto max-w-3xl grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="fc-card p-6">
            <h1 className="text-2xl font-bold">Crear cuenta</h1>
            <p className="mt-2 text-white/70">
              Elige tu plan y entra al portal. Demo sin pagos (solo para mostrar funcionalidad).
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs text-white/60">Nombre</div>
                <input
                  className="fc-input mt-2"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <div className="text-xs text-white/60">Email</div>
                <input
                  className="fc-input mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs text-white/60">Plan</div>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={plan === p.id ? 'fc-btn-primary w-full' : 'fc-btn-secondary w-full'}
                    onClick={() => setPlan(p.id)}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-xs opacity-80">{p.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {error ? <div className="mt-4 text-sm text-red-300">{error}</div> : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link className="fc-btn-secondary" to="/login">
                Ya tengo cuenta
              </Link>
              <button
                className="fc-btn-primary"
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
                Crear y entrar
              </button>
            </div>
          </div>

          <aside className="fc-card p-6">
            <h2 className="text-lg font-semibold">Qué obtienes</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Curso por módulos: desde tu primer flip hasta operar como automotora formal.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Comunidad: comparte casos reales, anuncios, negociación y números.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Materiales: checklists, contrato base y planilla de margen/ROI.
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

