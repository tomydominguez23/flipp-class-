import { useMemo, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { updateCurrentUser } from '../lib/auth'
import type { PlanId } from '../lib/types'
import type { User } from '../lib/types'

const plans: Array<{ id: PlanId; name: string; desc: string }> = [
  { id: 'BASICO', name: 'Básico Online', desc: '100% online + comunidad + materiales.' },
  { id: 'HIBRIDO', name: 'Híbrido', desc: 'Online + 1 reunión presencial grupal.' },
  { id: 'PRO', name: 'Pro Automotora', desc: 'Presencial mensual + extras pro + módulos avanzados.' },
]

export function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-semibold text-slate-900">Sin sesión</div>
      </div>
    )
  }

  return <ProfileInner key={user.id} user={user} />
}

function ProfileInner({ user }: { user: User }) {
  const [nombre, setNombre] = useState(user.nombre)
  const [plan, setPlan] = useState<PlanId>(user.plan)
  const [msg, setMsg] = useState<string | null>(null)

  const currentPlan = useMemo(() => plans.find((p) => p.id === plan), [plan])

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Perfil</h1>
        <p className="mt-2 text-slate-600">Edita tu nombre y tu plan (demo).</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs text-slate-500">Nombre</div>
            <input className="fc-auth-input mt-2" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div>
            <div className="text-xs text-slate-500">Email</div>
            <input className="fc-auth-input mt-2" value={user.email} disabled />
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs text-slate-500">Plan</div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {plans.map((p) => (
              <button
                key={p.id}
                className={
                  plan === p.id
                    ? 'fc-btn-primary w-full'
                    : 'fc-btn-secondary w-full !border-slate-300 !bg-white !text-slate-700'
                }
                onClick={() => setPlan(p.id)}
                type="button"
              >
                <div className="text-left">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs opacity-80">{p.desc}</div>
                </div>
              </button>
            ))}
          </div>
          {currentPlan ? (
            <div className="mt-3 text-sm text-slate-600">Seleccionado: {currentPlan.name}</div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          {msg ? <div className="text-sm text-slate-600 sm:mr-auto">{msg}</div> : null}
          <button
            className="fc-btn-primary"
            onClick={() => {
              const n = nombre.trim()
              if (!n) {
                setMsg('Ingresa un nombre.')
                return
              }
              const res = updateCurrentUser({ nombre: n, plan })
              setMsg(res.ok ? 'Perfil actualizado.' : res.error)
                if (res.ok) {
                  setNombre(res.user.nombre)
                  setPlan(res.user.plan)
                }
            }}
          >
            Guardar cambios
          </button>
        </div>
      </section>
    </div>
  )
}

