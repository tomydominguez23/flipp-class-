import { Link } from 'react-router-dom'
import { COURSE_HERO_IMAGE, COURSE_SUBTITLE, COURSE_TITLE, modules } from '../lib/courseData'
import { useAuth } from '../auth/useAuth'

const imgShowroom =
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80'

export function LandingPage() {
  const { isAuthenticated } = useAuth()

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
              <h2 className="text-2xl font-bold">Módulos</h2>
              <p className="mt-2 text-white/70">El contenido base del curso (7 módulos).</p>
            </div>
            <Link className="fc-btn-secondary" to={isAuthenticated ? '/app/curso' : '/registro'}>
              Ver dentro del portal
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {modules.map((m) => (
              <div key={m.id} className="fc-card overflow-hidden">
                <div className="grid sm:grid-cols-[160px_1fr]">
                  {m.imagenUrl ? (
                    <img
                      src={m.imagenUrl}
                      alt={m.titulo}
                      className="h-full w-full object-cover opacity-90"
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-white/10" />
                  )}
                  <div className="p-5">
                    <div className="font-semibold">{m.titulo}</div>
                    <div className="mt-1 text-sm text-white/70">{m.subtitulo}</div>
                    <div className="mt-2 text-sm text-white/70">{m.descripcion}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="fc-container pb-16">
          <div className="fc-card p-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Planes FLIP CLASS</h2>
                <p className="mt-3 text-white/70">
                  Elige tu nivel: desde online para partir, hasta Pro para escalar como automotora.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link className="fc-btn-primary" to="/planes">
                    Ver planes
                  </Link>
                  <Link className="fc-btn-secondary" to={isAuthenticated ? '/app' : '/registro'}>
                    Entrar al portal
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Básico</div>
                  <div className="mt-1 text-xs text-white/60">Online + comunidad</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Híbrido</div>
                  <div className="mt-1 text-xs text-white/60">Online + 1 presencial</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Pro</div>
                  <div className="mt-1 text-xs text-white/60">Presencial mensual</div>
                </div>
              </div>
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

