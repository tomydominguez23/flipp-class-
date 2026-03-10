import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { COURSE_HERO_IMAGE, COURSE_SUBTITLE, COURSE_TITLE, modules } from '../lib/courseData'
import { plans } from '../lib/plans'
import { useAuth } from '../auth/useAuth'
import { weeklySchedule } from '../lib/schedule'

const imgShowroom =
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80'
const imgShowroomSecondary =
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80'

function moduleCover(index: number) {
  const covers = ['from-zinc-900 to-zinc-700', 'from-stone-800 to-neutral-600', 'from-amber-700 to-amber-500']
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

type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Antes de Pro Trading no sabia nada de trading. En 3 meses ya estaba haciendo operaciones consistentes. La metodologia paso a paso es increible.',
    name: 'Maria Rodriguez',
    role: 'Trader desde 2024',
    initials: 'MR',
  },
  {
    quote:
      'Las clases en vivo y los sabados analiticos son gold. El equipo realmente se preocupa por cada estudiante. 100% recomendado.',
    name: 'Carlos Lopez',
    role: 'Trader desde 2023',
    initials: 'CL',
  },
  {
    quote:
      'Los elementos de soporte y herramientas son fantasticos. El calculo de rango de precio y los checklists me ayudan a mantener la disciplina.',
    name: 'Ana Gutierrez',
    role: 'Trader desde 2024',
    initials: 'AG',
  },
]

type FeatureVisual = {
  toneClass: string
  icon: ReactNode
}

const featureVisuals: FeatureVisual[] = [
  {
    toneClass: 'bg-amber-100 text-amber-700',
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 13h2l2-4h10l2 4h2v4h-2" />
        <path d="M5 17h14" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    toneClass: 'bg-sky-100 text-sky-700',
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4" />
        <path d="M10 12h5" />
        <path d="M10 16h5" />
      </svg>
    ),
  },
  {
    toneClass: 'bg-violet-100 text-violet-700',
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="8" cy="10" r="3" />
        <path d="M11 10h10" />
        <path d="M18 10v3" />
        <path d="M15 10v2" />
      </svg>
    ),
  },
  {
    toneClass: 'bg-emerald-100 text-emerald-700',
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12v-2l10-4v12L3 14z" />
        <path d="M13 10h4l3-2v8l-3-2h-4" />
        <path d="M6 15l1 4h3l-1-3" />
      </svg>
    ),
  },
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
            ? 'border-[#ece5d8] bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
            : 'border-transparent bg-white/80'
        }`}
      >
        <div className="fc-container flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-zinc-900 to-amber-600 shadow-lg shadow-amber-200" />
            <div>
              <div className="text-sm font-semibold leading-tight">{COURSE_TITLE}</div>
              <div className="text-xs text-slate-500 leading-tight">Portal de estudio</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 lg:flex">
            <a href="#metodo" className="hover:text-slate-900">
              Programa
            </a>
            <a href="#modulos" className="hover:text-slate-900">
              Módulos
            </a>
            <a href="#agenda" className="hover:text-slate-900">
              Agenda
            </a>
            <a href="#planes" className="hover:text-slate-900">
              Planes
            </a>
            <a href="#faq" className="hover:text-slate-900">
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
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70 saturate-125 contrast-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/56 to-black/72" />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 82% 18%, rgba(251, 146, 60, 0.34), transparent 42%)',
            }}
          />

          <div className="fc-container relative py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="fc-fade-left">
                <div className="fc-badge border-white/20 bg-black/40 text-white">
                  FLIP CLASS · Sistema real de negocio automotriz
                </div>
                <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                  Conserva tu esencia, ahora con una experiencia visual más pro.
                </h1>
                <p className="mt-4 max-w-2xl text-white/80">{COURSE_SUBTITLE}</p>

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
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
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

                  <div className="mt-3 flex justify-between text-[11px] text-slate-500">
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
            <p className="mx-auto mt-3 max-w-3xl text-slate-600">
              No es solo “compra barato y vende caro”. Es un sistema completo: compra inteligente, venta
              profesional, consignación, publicidad, marca personal y formalización.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredModules.slice(0, 4).map((m, index) => {
              const visual = featureVisuals[index % featureVisuals.length]
              const cleanTitle = m.titulo.replace(/^M[ÓO]DULO\s+\d+\s+—\s+/i, '')
              return (
                <article
                  key={m.id}
                  className="fc-feature-card fc-reveal text-center"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="flex justify-center">
                    <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl ${visual.toneClass}`}>
                      {visual.icon}
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{cleanTitle}</h3>
                  <p className="mt-2 text-sm text-slate-600">{m.subtitulo}</p>
                </article>
              )
            })}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="fc-reveal">
              <p className="text-slate-600">
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

              <div className="mt-10 rounded-2xl border border-[#ece6dc] bg-white p-5 shadow-sm">
                <h3 className="text-center text-2xl font-extrabold text-slate-900">Lo que dicen nuestros estudiantes</h3>
                <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-amber-500" />
                <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-500">
                  Historias reales de personas que avanzaron con una ruta clara.
                </p>

                <div className="mt-6 grid gap-3">
                  {testimonials.map((testimonial) => (
                    <article key={testimonial.name} className="rounded-2xl border border-[#ece6dc] bg-white p-4">
                      <div className="text-sm text-amber-500">★★★★★</div>
                      <p className="mt-2 text-sm italic text-slate-600">"{testimonial.quote}"</p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                          {testimonial.initials}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{testimonial.name}</div>
                          <div className="text-xs text-slate-500">{testimonial.role}</div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="fc-card overflow-hidden fc-reveal">
                <img
                  src={imgShowroom}
                  alt="Showroom"
                  className="h-64 w-full object-cover opacity-90"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="text-sm font-semibold">Una ruta clara</div>
                  <div className="mt-2 text-sm text-slate-600">
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

              <article className="fc-card overflow-hidden fc-reveal" style={{ transitionDelay: '100ms' }}>
                <img
                  src={imgShowroomSecondary}
                  alt="Auto en exhibición"
                  className="h-48 w-full object-cover opacity-90"
                  loading="lazy"
                />
                <div className="p-5">
                  <div className="text-sm font-semibold">Tip rápido de venta</div>
                  <p className="mt-2 text-sm text-slate-600">
                    Publica 12-15 fotos claras, historial básico y un precio con argumento. Eso
                    aumenta la confianza y acelera cierres.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="modulos" className="fc-container pb-14 sm:pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Nuestros Módulos</h2>
              <p className="mt-2 text-slate-600">Contenido principal del curso para avanzar con una ruta clara.</p>
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
                            ? 'bg-amber-500'
                            : progress.tone === 'progress'
                              ? 'bg-violet-500'
                              : 'bg-slate-300'
                        }`}
                        style={{ width: `${progress.value}%` }}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                          progress.tone === 'complete'
                            ? 'bg-amber-100 text-amber-800'
                            : progress.tone === 'progress'
                              ? 'bg-violet-100 text-violet-700'
                              : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {progress.label}
                      </span>
                      <Link
                        className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
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

        <section id="agenda" className="fc-container py-16">
          <div className="text-center">
            <div className="fc-badge">Agenda Semanal</div>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Horario de Sesiones en Vivo
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-600">
              Sesiones todas las semanas con horarios flexibles para que avances en compra,
              venta, negociacion y escala de tu negocio automotriz.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
            {weeklySchedule.map((session, index) => (
              <article
                key={session.id}
                className={`fc-schedule-card fc-reveal ${session.type === 'mentor' ? 'is-active' : ''}`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className={`fc-schedule-icon fc-tone-${session.type}`}>{session.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{session.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{session.timeLabel}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link className="fc-btn-primary" to="/calendario">
              Ver Calendario Completo
            </Link>
          </div>
        </section>

        <section id="planes" className="fc-container py-16">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-8 text-slate-900 shadow-lg sm:px-6 lg:px-8">
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
                    <span className="text-5xl font-extrabold text-slate-900">${p.priceUsd}</span>
                    <span className="ml-1 text-sm font-semibold text-slate-400">USD</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{p.idealFor}</p>
                  <Link
                    className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      p.badge
                        ? 'bg-amber-400 text-slate-900 hover:opacity-90'
                        : 'border-2 border-slate-700 text-slate-700 hover:bg-slate-100'
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
          <div className="mt-4 text-center text-xs text-slate-500">
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
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fc-cta-section">
          <div className="fc-container relative z-10 py-16 text-center text-white">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Lleva tu proyecto automotriz al siguiente nivel</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
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

      <footer className="border-t border-slate-200 bg-white">
        <div className="fc-container py-8 text-sm text-slate-500">
          {COURSE_TITLE} · Demo de portal tipo Skool (contenido y recursos en construcción).
        </div>
      </footer>
    </div>
  )
}

