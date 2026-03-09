import { Link } from 'react-router-dom'
import { COURSE_HERO_IMAGE, COURSE_SUBTITLE, COURSE_TITLE, modules } from '../lib/courseData'
import { plans } from '../lib/plans'
import { useAuth } from '../auth/useAuth'

const imgShowroom =
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80'

function moduleCover(index: number) {
  const covers = ['from-emerald-700 to-emerald-500', 'from-cyan-700 to-sky-500', 'from-amber-700 to-amber-500']
  return covers[index % covers.length]
}

export function LandingPage() {
  const { isAuthenticated } = useAuth()
  const featuredModules = modules.slice(0, 3)

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="fc-container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500" />
            <div>
              <div className="text-sm font-semibold leading-tight">{COURSE_TITLE}</div>
              <div className="text-xs text-white/60 leading-tight">Portal de estudio</div>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link className="fc-btn-secondary" to="/planes">
              Ver planes
            </Link>
            {isAuthenticated ? (
              <Link className="fc-btn-primary" to="/app">
                Ir al portal
              </Link>
            ) : (
              <Link className="fc-btn-primary" to="/registro">
                Entrar / Registrarme
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <img
            src={COURSE_HERO_IMAGE}
            alt="Autos y negocio"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />

          <div className="fc-container relative py-16">
            <div className="max-w-2xl">
              <div className="fc-badge">FLIP CLASS</div>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight">
                El curso real para aprender a comprar, vender y escalar negocios de autos en Chile
              </h1>
              <p className="mt-4 text-white/70">{COURSE_SUBTITLE}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link className="fc-btn-primary" to={isAuthenticated ? '/app' : '/registro'}>
                  Empezar ahora
                </Link>
                <Link className="fc-btn-secondary" to="/planes">
                  Ver planes y beneficios
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Desde tu primer flip</div>
                  <div className="mt-1 text-xs text-white/60">Sistema + números + proceso</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Hasta automotora formal</div>
                  <div className="mt-1 text-xs text-white/60">Orden, contratos y operación</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Escalable y rentable</div>
                  <div className="mt-1 text-xs text-white/60">Consignación + Ads + marca</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fc-container py-14">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold">¿Qué enseña Flip Class?</h2>
              <p className="mt-3 text-white/70">
                No es solo “compra barato y vende caro”. Es un sistema completo: compra inteligente,
                venta profesional, consignación, publicidad, marca personal y formalización.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="fc-badge">Márgenes reales</span>
                <span className="fc-badge">Checklists</span>
                <span className="fc-badge">Ads</span>
                <span className="fc-badge">Contratos</span>
                <span className="fc-badge">Proceso</span>
              </div>
            </div>
            <div className="fc-card overflow-hidden">
              <img
                src={imgShowroom}
                alt="Showroom"
                className="h-64 w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="p-6">
                <div className="text-sm font-semibold">Una ruta clara</div>
                <div className="mt-2 text-sm text-white/70">
                  Entra al portal, revisa módulos y marca lecciones completadas. Participa en la
                  comunidad y descarga plantillas.
                </div>
                <div className="mt-4">
                  <Link className="fc-btn-primary w-full" to={isAuthenticated ? '/app' : '/registro'}>
                    Abrir portal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fc-container pb-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Nuestros Módulos</h2>
              <p className="mt-2 text-white/70">Contenido principal del curso para avanzar con una ruta clara.</p>
            </div>
            <Link className="fc-btn-secondary" to={isAuthenticated ? '/app/curso' : '/registro'}>
              Ver dentro del portal
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {featuredModules.map((m, index) => {
              const cleanTitle = m.titulo.replace(/^M[ÓO]DULO\s+\d+\s+—\s+/i, '')
              return (
                <article key={m.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className={`relative min-h-[150px] bg-gradient-to-br p-4 ${moduleCover(index)}`}>
                    {m.imagenUrl ? (
                      <img
                        src={m.imagenUrl}
                        alt={m.titulo}
                        className="absolute inset-0 h-full w-full object-cover opacity-20"
                        loading="lazy"
                      />
                    ) : null}
                    <div className="relative flex justify-between">
                      <span className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white">
                        FLIP CLASS
                      </span>
                      <span className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white">
                        Módulo {index + 1}
                      </span>
                    </div>
                    <div className="relative mt-6 text-2xl font-extrabold uppercase leading-tight text-white">
                      {cleanTitle}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-lg font-semibold text-slate-900">{cleanTitle}</div>
                    <div className="mt-1 text-sm text-slate-500">{m.subtitulo}</div>
                    <div className="mt-2 text-sm text-slate-600">{m.descripcion}</div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase text-emerald-700">
                        Disponible
                      </span>
                      <Link
                        className="inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                        to={isAuthenticated ? '/app/curso' : '/registro'}
                      >
                        Ver programa
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="fc-container pb-16">
          <div className="rounded-3xl border border-white/10 bg-slate-50 px-4 py-8 text-slate-900 shadow-lg sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">Planes FLIP CLASS</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Elige tu nivel y empieza con el plan que mejor encaje con tu etapa.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {plans.map((p) => (
                <article
                  key={p.id}
                  className={`rounded-3xl border bg-white p-6 shadow-sm ${p.badge ? 'border-amber-400 ring-1 ring-amber-200' : 'border-slate-200'}`}
                >
                  {p.badge ? (
                    <div className="mb-3 inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase text-slate-900">
                      {p.badge}
                    </div>
                  ) : null}
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{p.subtitle}</p>
                  <div className="mt-4">
                    <span className="text-5xl font-extrabold text-emerald-700">${p.priceUsd}</span>
                    <span className="ml-1 text-sm font-semibold text-slate-400">USD</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{p.idealFor}</p>
                  <Link
                    className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      p.badge
                        ? 'bg-amber-400 text-slate-900 hover:opacity-90'
                        : 'border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                    }`}
                    to="/planes"
                  >
                    Seleccionar plan
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link className="fc-btn-secondary" to="/planes">
                Ver comparación completa
              </Link>
              <Link className="fc-btn-primary ml-3" to={isAuthenticated ? '/app' : '/registro'}>
                Entrar al portal
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-white/60">
            * Precios y condiciones referenciales para demo visual.
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-white/5">
        <div className="fc-container py-8 text-sm text-white/60">
          {COURSE_TITLE} · Demo de portal tipo Skool (contenido y recursos en construcción).
        </div>
      </footer>
    </div>
  )
}

