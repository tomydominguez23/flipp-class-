import { Link, useNavigate } from 'react-router-dom'
import { plans } from '../lib/plans'
import { writeLocal } from '../lib/storage'

function planTone(color: string) {
  if (color === 'red') {
    return {
      icon: 'bg-rose-100 text-rose-700',
      price: 'text-rose-700',
      button: 'border-rose-500 text-rose-700 hover:bg-rose-50',
    }
  }
  if (color === 'blue') {
    return {
      icon: 'bg-sky-100 text-sky-700',
      price: 'text-sky-700',
      button: 'border-sky-500 text-sky-700 hover:bg-sky-50',
    }
  }
  return {
    icon: 'bg-emerald-100 text-emerald-700',
    price: 'text-emerald-700',
    button: 'border-emerald-500 text-emerald-700 hover:bg-emerald-50',
  }
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
        <section className="rounded-3xl border border-white/10 bg-slate-50 px-4 py-8 text-slate-900 shadow-lg sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl">Planes FLIP CLASS</h1>
            <p className="mt-3 text-slate-600">
              Elige tu nivel y avanza desde el primer flip hasta una operación profesional.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((p, index) => {
              const tone = planTone(p.color)
              const featured = Boolean(p.badge)
              return (
                <article
                  key={p.id}
                  className={`relative rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    featured ? 'border-amber-400 ring-1 ring-amber-200' : 'border-slate-200'
                  }`}
                >
                  {p.badge ? (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                      {p.badge}
                    </div>
                  ) : null}

                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${tone.icon}`}>
                    <span className="text-sm font-bold">P{index + 1}</span>
                  </div>

                  <h2 className="mt-4 text-center text-3xl font-bold text-slate-900">{p.title}</h2>
                  <p className="mt-1 text-center text-sm text-slate-500">{p.subtitle}</p>

                  <div className="mt-5 text-center">
                    <span className={`text-5xl font-extrabold leading-none ${tone.price}`}>${p.priceUsd}</span>
                    <span className="ml-1 text-sm font-semibold text-slate-400">USD</span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-600">
                    {p.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-sm text-slate-500">{p.idealFor}</p>

                  <button
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${
                      featured ? 'border-amber-400 bg-amber-400 text-slate-900 hover:opacity-90' : tone.button
                    }`}
                    onClick={() => {
                      writeLocal('fc_selected_plan', p.id)
                      navigate('/registro')
                    }}
                  >
                    Seleccionar plan
                  </button>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">¿Qué incluye el portal?</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              Curso por módulos y lecciones con seguimiento de progreso.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              Comunidad tipo foro para dudas, anuncios y casos reales.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              Materiales descargables con plantillas listas para aplicar.
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

