import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { logout } from '../lib/auth'
import { useAuth } from '../auth/useAuth'
import { cn } from '../lib/cn'
import { modules } from '../lib/courseData'
import { getProgress } from '../lib/progress'
import { onStorageChange } from '../lib/storage'
import { ProgressBar } from '../components/ProgressBar'
import { weeklySchedule } from '../lib/schedule'

const nav = [
  { to: '/app', label: 'Inicio', icon: '⌂' },
  { to: '/app/curso', label: 'Curso', icon: '▣' },
  { to: '/app/comunidad', label: 'Comunidad', icon: '◉' },
  { to: '/app/materiales', label: 'Materiales', icon: '⭳' },
  { to: '/app/perfil', label: 'Perfil', icon: '☺' },
]

export function AppLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [version, setVersion] = useState(0)

  useEffect(() => onStorageChange(() => setVersion((v) => v + 1)), [])

  void version
  const total = modules.reduce((acc, mod) => acc + mod.lessons.length, 0)
  const completed = Object.keys(getProgress().completadas).length
  const pct = total ? Math.round((completed / total) * 100) : 0
  const stats = { total, completed, pct }

  const initials =
    user?.nombre
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('') ?? 'AL'

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="fc-container flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-zinc-900 to-amber-600" />
            <div>
              <div className="text-sm font-semibold leading-tight">FLIP CLASS</div>
              <div className="text-xs text-slate-500 leading-tight">
                {user ? `Plan ${user.plan}` : 'Portal de estudio'}
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-2 overflow-x-auto">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app'}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition whitespace-nowrap',
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                  )
                }
              >
                <span className="text-xs opacity-90">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-semibold text-slate-800">{user?.nombre ?? 'Alumno'}</div>
              <div className="text-xs text-slate-500">{stats.completed} sesiones completadas</div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              {initials}
            </div>
            <button
              className="fc-btn-secondary !border-slate-300 !bg-white !text-slate-700 hover:!bg-slate-100"
              onClick={() => {
                logout()
                navigate('/', { replace: true })
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="fc-container grid grid-cols-1 gap-6 py-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 space-y-6">
          <Outlet />
        </main>

        <aside className="space-y-4 xl:sticky xl:top-24 xl:h-fit">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Tu avance general</div>
            <div className="mt-1 text-xs text-slate-500">
              {stats.completed}/{stats.total} lecciones completadas
            </div>
            <div className="mt-3">
              <ProgressBar value={stats.pct} />
            </div>
            <div className="mt-2 text-xs font-semibold text-amber-700">{stats.pct}% completado</div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Sesiones destacadas</div>
            <div className="mt-3 space-y-2">
              {weeklySchedule.slice(0, 3).map((session) => (
                <div key={session.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-sm font-semibold text-slate-800">{session.title}</div>
                  <div className="text-xs text-slate-500">{session.timeLabel}</div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

