import { Link, useNavigate } from 'react-router-dom'
import { plans } from '../lib/plans'
import { writeLocal } from '../lib/storage'

function planAccent(color: string) {
  if (color === 'red') return 'from-rose-500 to-orange-400'
  if (color === 'blue') return 'from-sky-500 to-indigo-400'
  return 'from-emerald-500 to-sky-500'
}

export function PlansPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="fc-container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500" />
            <div>
              <div className="text-sm font-semibold leading-tight">FLIP CLASS</div>
              <div className="text-xs text-white/60 leading-tight">Planes</div>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <Link className="fc-btn-secondary" to="/login">
              Iniciar sesión
            </Link>
            <Link className="fc-btn-primary" to="/registro">
              Registrarme
            </Link>
          </nav>
        </div>
      </header>

      <main className="fc-container py-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold">Planes FLIP CLASS</h1>
          <p className="mt-3 text-white/70">
            Elige el plan según tu etapa: partir, hacerlo en serio o escalar como automotora.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.id} className="fc-card overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${planAccent(p.color)}`} />
              <div className="p-6">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-white/70">{p.subtitle}</div>

                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  {p.includes.map((x) => (
                    <li key={x} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      {x}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 text-sm text-white/70">{p.idealFor}</div>

                <button
                  className="fc-btn-primary mt-6 w-full"
                  onClick={() => {
                    writeLocal('fc_selected_plan', p.id)
                    navigate('/registro')
                  }}
                >
                  Elegir este plan
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 fc-card p-6">
          <h2 className="text-lg font-semibold">¿Qué incluye el portal?</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              Curso por módulos y lecciones (con progreso).
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              Comunidad tipo foro para dudas/casos.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              Materiales descargables (plantillas).
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

