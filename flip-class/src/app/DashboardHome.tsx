import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { modules } from '../lib/courseData'
import { getProgress } from '../lib/progress'
import { useEffect, useState } from 'react'
import { onStorageChange } from '../lib/storage'
import { ProgressBar } from '../components/ProgressBar'

function computeStats() {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const progress = getProgress()
  const completed = Object.keys(progress.completadas).length
  const pct = totalLessons ? Math.round((completed / totalLessons) * 100) : 0
  return { totalLessons, completed, pct }
}

export function DashboardHome() {
  const { user } = useAuth()
  const [stats, setStats] = useState(() => computeStats())

  useEffect(() => {
    return onStorageChange(() => setStats(computeStats()))
  }, [])

  const firstModule = modules[0]
  const firstLesson = firstModule?.lessons[0]

  return (
    <div className="space-y-6">
      <section className="fc-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="fc-badge">Portal de estudio</div>
            <h1 className="mt-3 text-2xl font-bold">Hola{user ? `, ${user.nombre}` : ''}.</h1>
            <p className="mt-1 text-white/70">
              Bienvenido a FLIP CLASS. Avanza módulo a módulo y deja tus dudas en la comunidad.
            </p>
          </div>

          {firstModule && firstLesson && (
            <Link
              className="fc-btn-primary whitespace-nowrap"
              to={`/app/curso/modulo/${firstModule.id}/leccion/${firstLesson.id}`}
            >
              Continuar curso
            </Link>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Lecciones completadas</div>
            <div className="mt-1 text-xl font-semibold">
              {stats.completed} / {stats.totalLessons}
            </div>
            <div className="mt-3">
              <ProgressBar value={stats.pct} />
              <div className="mt-2 text-xs text-white/60">{stats.pct}% completado</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Tu plan</div>
            <div className="mt-1 text-xl font-semibold">{user?.plan ?? '—'}</div>
            <div className="mt-2 text-sm text-white/70">
              Puedes cambiarlo en <Link className="underline" to="/app/perfil">Perfil</Link>.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Acceso rápido</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link className="fc-btn-secondary" to="/app/curso">
                Ver módulos
              </Link>
              <Link className="fc-btn-secondary" to="/app/comunidad">
                Ir a comunidad
              </Link>
              <Link className="fc-btn-secondary" to="/app/materiales">
                Descargar materiales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="fc-card p-6">
          <h2 className="text-lg font-semibold">Cómo sacarle el máximo</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>- Anota tus números (compra/venta/gastos) desde el día 1.</li>
            <li>- Publica tu caso en la comunidad para feedback de anuncios y negociación.</li>
            <li>- Usa los materiales descargables (checklists/contratos/planilla).</li>
          </ul>
        </div>
        <div className="fc-card p-6">
          <h2 className="text-lg font-semibold">Invitados especiales</h2>
          <p className="mt-2 text-sm text-white/70">
            Influencers automotrices reales en Chile, casos reales (errores, aciertos y números).
            Nada de teoría “gringa” irreal.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="fc-badge">Casos reales</span>
            <span className="fc-badge">Números</span>
            <span className="fc-badge">Proceso</span>
          </div>
        </div>
      </section>
    </div>
  )
}

