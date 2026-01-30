import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { updateCurrentUser } from '../lib/auth'
import type { PlanId } from '../lib/types'
import { onStorageChange } from '../lib/storage'

const plans: Array<{ id: PlanId; name: string; desc: string }> = [
  { id: 'BASICO', name: 'Básico Online', desc: '100% online + comunidad + materiales.' },
  { id: 'HIBRIDO', name: 'Híbrido', desc: 'Online + 1 reunión presencial grupal.' },
  { id: 'PRO', name: 'Pro Automotora', desc: 'Presencial mensual + extras pro + módulos avanzados.' },
]

export function ProfilePage() {
  const { user } = useAuth()
  const [version, setVersion] = useState(0)
  const [nombre, setNombre] = useState(user?.nombre ?? '')
  const [plan, setPlan] = useState<PlanId>(user?.plan ?? 'BASICO')
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => onStorageChange(() => setVersion((v) => v + 1)), [])
  useEffect(() => {
    setNombre(user?.nombre ?? '')
    setPlan(user?.plan ?? 'BASICO')
  }, [user, version])

  const currentPlan = useMemo(() => plans.find((p) => p.id === plan), [plan])

  if (!user) {
    return (
      <div className="fc-card p-6">
        <div className="text-lg font-semibold">Sin sesión</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="fc-card p-6">
        <h1 className="text-2xl font-bold">Perfil</h1>
        <p className="mt-2 text-white/70">Edita tu nombre y tu plan (demo).</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs text-white/60">Nombre</div>
            <input className="fc-input mt-2" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div>
            <div className="text-xs text-white/60">Email</div>
            <input className="fc-input mt-2" value={user.email} disabled />
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs text-white/60">Plan</div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {plans.map((p) => (
              <button
                key={p.id}
                className={plan === p.id ? 'fc-btn-primary w-full' : 'fc-btn-secondary w-full'}
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
            <div className="mt-3 text-sm text-white/70">Seleccionado: {currentPlan.name}</div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          {msg ? <div className="text-sm text-white/70 sm:mr-auto">{msg}</div> : null}
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
            }}
          >
            Guardar cambios
          </button>
        </div>
      </section>
    </div>
  )
}

