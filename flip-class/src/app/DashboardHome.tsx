import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { modules } from '../lib/courseData'
import { getProgress } from '../lib/progress'
import { useEffect, useState } from 'react'
import { onStorageChange } from '../lib/storage'
import { ProgressBar } from '../components/ProgressBar'
import { weeklySchedule } from '../lib/schedule'

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
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-700 px-6 py-8 text-white">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                Panel principal
              </div>
              <h1 className="mt-3 text-3xl font-extrabold">
                Hola{user ? `, ${user.nombre}` : ''}. Seguimos avanzando.
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/80">
                Combina clases, plantillas y comunidad para convertir cada operación en un proceso
                repetible y rentable.
              </p>
            </div>
            {firstModule && firstLesson ? (
              <Link
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                to={`/app/curso/modulo/${firstModule.id}/leccion/${firstLesson.id}`}
              >
                Continuar clase actual
              </Link>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Progreso total</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">
              {stats.completed}/{stats.totalLessons}
            </div>
            <div className="mt-3">
              <ProgressBar value={stats.pct} />
            </div>
            <div className="mt-2 text-xs text-slate-500">{stats.pct}% completado</div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tu plan activo</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">{user?.plan ?? '—'}</div>
            <div className="mt-2 text-sm text-slate-600">
              Adminístralo en <Link className="font-semibold text-amber-700 underline" to="/app/perfil">Perfil</Link>.
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Accesos rápidos</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link className="fc-btn-secondary !border-slate-300 !bg-white !text-slate-700" to="/app/curso">
                Ver módulos
              </Link>
              <Link className="fc-btn-secondary !border-slate-300 !bg-white !text-slate-700" to="/app/comunidad">
                Comunidad
              </Link>
              <Link className="fc-btn-secondary !border-slate-300 !bg-white !text-slate-700" to="/app/materiales">
                Materiales
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Cómo sacarle el máximo</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>- Registra números reales (compra, venta y gastos) desde el día 1.</li>
            <li>- Publica tus casos en comunidad para mejorar anuncios y negociación.</li>
            <li>- Usa checklists y plantillas para operar con estándar profesional.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Agenda de esta semana</h2>
          <div className="mt-3 space-y-2">
            {weeklySchedule.slice(0, 4).map((session) => (
              <div key={session.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm font-semibold text-slate-800">{session.title}</div>
                <div className="text-xs text-slate-500">{session.timeLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

