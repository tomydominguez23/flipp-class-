import { useEffect, useState } from 'react'
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

type ModuleProgress = {
  value: number
  label: string
  tone: 'complete' | 'progress' | 'new'
}

function moduleProgress(index: number): ModuleProgress {
  const presets: ModuleProgress[] = [
    { value: 100, label: 'Completado', tone: 'complete' },
    { value: 62, label: 'En progreso', tone: 'progress' },
    { value: 35, label: 'En progreso', tone: 'progress' },
    { value: 0, label: 'Nuevo', tone: 'new' },
    { value: 0, label: 'Nuevo', tone: 'new' },
    { value: 0, label: 'Nuevo', tone: 'new' },
  ]
  return presets[index % presets.length]
}

const heroBars = [
  { height: 45, positive: true },
  { height: 30, positive: false },
  { height: 65, positive: true },
  { height: 25, positive: false },
  { height: 70, positive: true },
  { height: 52, positive: true },
  { height: 35, positive: false },
  { height: 82, positive: true },
  { height: 40, positive: false },
  { height: 74, positive: true },
  { height: 55, positive: true },
  { height: 90, positive: true },
]

export function LandingPage() {
  const { isAuthenticated } = useAuth()
  const featuredModules = modules.slice(0, 6)
  const [isNavScrolled, setIsNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsNavScrolled(window.scrollY > 40)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.fc-reveal'))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-fc-count]'))
    if (!counters.length) return

    const animateCounter = (el: HTMLElement) => {
      const targetValue = Number(el.dataset.fcCount ?? '0')
      const suffix = el.dataset.fcSuffix ?? '+'
      const duration = 1800
      const start = performance.now()

      const update = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        const current = Math.floor(targetValue * eased)
        el.textContent = `${current.toLocaleString()}${suffix}`

        if (progress < 1) {
          requestAnimationFrame(update)
        }
      }

      requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.45 },
    )

    counters.forEach((counter) => observer.observe(counter))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen fc-landing-bg">
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
          isNavScrolled
            ? 'border-white/10 bg-slate-950/90 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
            : 'border-transparent bg-slate-950/55'
        }`}
      >
        <div className="fc-container flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg shadow-emerald-500/25" />
            <div>
              <div className="text-sm font-semibold leading-tight">{COURSE_TITLE}</div>
              <div className="text-xs text-white/60 leading-tight">Portal de estudio</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
            <a href="#metodo" className="hover:text-white">
              Programa
            </a>
            <a href="#modulos" className="hover:text-white">
              Módulos
            </a>
            <a href="#planes" className="hover:text-white">
              Planes
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </header>

      <main>
        <section className="fc-landing-hero relative overflow-hidden">
          <img
            src={COURSE_HERO_IMAGE}
            alt="Autos y negocio"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950" />

          <div className="fc-container relative py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="fc-fade-left">
                <div className="fc-badge">FLIP CLASS · Sistema real de negocio automotriz</div>
                <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
                  Conserva tu esencia, ahora con una experiencia visual más pro.
                </h1>
                <p className="mt-4 max-w-2xl text-white/75">{COURSE_SUBTITLE}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link className="fc-btn-primary" to={isAuthenticated ? '/app' : '/registro'}>
                    Empezar ahora
                  </Link>
                  <a className="fc-btn-secondary" href="#modulos">
                    Ver estructura de cards
                  </a>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="fc-stat-card">
                    <span className="fc-stat-number" data-fc-count={String(modules.length)} data-fc-suffix="">
                      0
                    </span>
                    <span className="fc-stat-label">Módulos listos</span>
                  </div>
                  <div className="fc-stat-card">
                    <span className="fc-stat-number" data-fc-count="30" data-fc-suffix="+">
                      0
                    </span>
                    <span className="fc-stat-label">Lecciones prácticas</span>
                  </div>
                  <div className="fc-stat-card">
                    <span className="fc-stat-number" data-fc-count={String(plans.length)} data-fc-suffix="">
                      0
                    </span>
                    <span className="fc-stat-label">Planes disponibles</span>
                  </div>
                </div>
              </div>

              <div className="fc-fade-right">
                <div className="fc-hero-panel">
                  <img src={imgShowroom} alt="Showroom" className="h-44 w-full rounded-2xl object-cover opacity-85" />
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-semibold">Ruta de crecimiento</span>
                    <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                      +12.4%
                    </span>
                  </div>

                  <div className="mt-5 fc-chart-bars" aria-hidden="true">
                    {heroBars.map((bar, index) => (
                      <span
                        key={`${bar.height}-${index}`}
                        className={`fc-chart-bar ${bar.positive ? 'is-positive' : 'is-negative'}`}
                        style={{
                          height: `${bar.height}%`,
                          animationDelay: `${120 + index * 55}ms`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-3 flex justify-between text-[11px] text-white/50">
                    <span>Inicio</span>
                    <span>Aprendizaje</span>
                    <span>Escala</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="fc-container py-14 sm:py-16">
          <div className="text-center">
            <div className="fc-badge">Nuestra metodología</div>
            <h2 className="mt-4 text-3xl font-bold">¿Qué enseña Flip Class?</h2>
            <p className="mx-auto mt-3 max-w-3xl text-white/70">
              No es solo “compra barato y vende caro”. Es un sistema completo: compra inteligente, venta
              profesional, consignación, publicidad, marca personal y formalización.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredModules.slice(0, 4).map((m, index) => (
              <article key={m.id} className="fc-feature-card fc-reveal" style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="fc-feature-number">{index + 1}</div>
                <h3 className="mt-4 text-lg font-bold text-white">{m.titulo.replace(/^M[ÓO]DULO\s+\d+\s+—\s+/i, '')}</h3>
                <p className="mt-2 text-sm text-white/70">{m.subtitulo}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-center">
            <div className="fc-reveal">
              <p className="text-white/70">
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
            <div className="fc-card overflow-hidden fc-reveal">
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

        <section id="modulos" className="fc-container pb-14 sm:pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Nuestros Módulos</h2>
              <p className="mt-2 text-white/70">Contenido principal del curso para avanzar con una ruta clara.</p>
            </div>
            <Link className="fc-btn-secondary" to={isAuthenticated ? '/app/curso' : '/registro'}>
              Ver dentro del portal
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredModules.map((m, index) => {
              const cleanTitle = m.titulo.replace(/^M[ÓO]DULO\s+\d+\s+—\s+/i, '')
              const progress = moduleProgress(index)
              return (
                <article
                  key={m.id}
                  className="fc-module-card fc-reveal"
                  style={{ transitionDelay: `${(index % 3) * 90}ms` }}
                >
                  <div className={`relative min-h-[180px] overflow-hidden bg-gradient-to-br p-4 ${moduleCover(index)}`}>
                    {m.imagenUrl ? (
                      <img
                        src={m.imagenUrl}
                        alt={m.titulo}
                        className="absolute inset-0 h-full w-full object-cover opacity-30"
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

                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${
                          progress.tone === 'complete'
                            ? 'bg-emerald-500'
                            : progress.tone === 'progress'
                              ? 'bg-sky-500'
                              : 'bg-slate-300'
                        }`}
                        style={{ width: `${progress.value}%` }}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                          progress.tone === 'complete'
                            ? 'bg-emerald-100 text-emerald-700'
                            : progress.tone === 'progress'
                              ? 'bg-sky-100 text-sky-700'
                              : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {progress.label}
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

        <section className="fc-counter-section">
          <div className="fc-container py-10">
            <div className="grid gap-5 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="fc-reveal">
                <div className="fc-counter-number" data-fc-count={String(modules.length)} data-fc-suffix="+">
                  0+
                </div>
                <div className="fc-counter-label">Módulos disponibles</div>
              </div>
              <div className="fc-reveal" style={{ transitionDelay: '80ms' }}>
                <div className="fc-counter-number" data-fc-count="30" data-fc-suffix="+">
                  0+
                </div>
                <div className="fc-counter-label">Lecciones aplicables</div>
              </div>
              <div className="fc-reveal" style={{ transitionDelay: '160ms' }}>
                <div className="fc-counter-number" data-fc-count="95" data-fc-suffix="%">
                  0%
                </div>
                <div className="fc-counter-label">Enfoque práctico real</div>
              </div>
              <div className="fc-reveal" style={{ transitionDelay: '240ms' }}>
                <div className="fc-counter-number" data-fc-count={String(plans.length)} data-fc-suffix="">
                  0
                </div>
                <div className="fc-counter-label">Planes para escalar</div>
              </div>
            </div>
          </div>
        </section>

        <section id="planes" className="fc-container py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-50 px-4 py-8 text-slate-900 shadow-lg sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">Planes FLIP CLASS</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Elige tu nivel y empieza con el plan que mejor encaje con tu etapa.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {plans.map((p, index) => (
                <article
                  key={p.id}
                  className={`rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    p.badge ? 'border-amber-400 ring-1 ring-amber-200' : 'border-slate-200'
                  } fc-reveal`}
                  style={{ transitionDelay: `${index * 90}ms` }}
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

        <section id="faq" className="fc-container pb-16">
          <div className="text-center">
            <div className="fc-badge">Preguntas frecuentes</div>
            <h2 className="mt-4 text-3xl font-bold">Resuelve tus dudas</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4">
            {[
              {
                q: '¿Necesito experiencia previa para entrar?',
                a: 'No. La ruta de contenido parte desde fundamentos y escala hacia venta, ads y formalización.',
              },
              {
                q: '¿Incluye parte práctica o solo teoría?',
                a: 'Incluye checklists, plantillas y flujo operativo para aplicar cada módulo en negocios reales.',
              },
              {
                q: '¿Puedo ver planes antes de registrarme?',
                a: 'Sí, puedes revisar planes y beneficios en cualquier momento desde la landing.',
              },
            ].map((item, index) => (
              <article key={item.q} className="fc-card p-5 fc-reveal" style={{ transitionDelay: `${index * 90}ms` }}>
                <h3 className="text-base font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-white/70">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fc-cta-section">
          <div className="fc-container relative z-10 py-16 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Lleva tu proyecto automotriz al siguiente nivel</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              Mismos contenidos, misma esencia de FLIP CLASS, ahora con una presentación visual más moderna y
              orientada a conversión.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link className="fc-btn-primary" to={isAuthenticated ? '/app' : '/registro'}>
                Entrar al portal
              </Link>
              <Link className="fc-btn-secondary" to="/planes">
                Ver planes
              </Link>
            </div>
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

