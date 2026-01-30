import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../lib/auth'
import { useAuth } from '../auth/useAuth'
import { cn } from '../lib/cn'

const nav = [
  { to: '/app', label: 'Inicio' },
  { to: '/app/curso', label: 'Curso' },
  { to: '/app/comunidad', label: 'Comunidad' },
  { to: '/app/materiales', label: 'Materiales' },
  { to: '/app/perfil', label: 'Perfil' },
]

export function AppLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/10 bg-white/5">
        <div className="fc-container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500" />
            <div>
              <div className="text-sm font-semibold leading-tight">FLIP CLASS</div>
              <div className="text-xs text-white/60 leading-tight">
                {user ? `Plan ${user.plan}` : 'Portal de estudio'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && <div className="hidden sm:block text-sm text-white/80">{user.nombre}</div>}
            <button
              className="fc-btn-secondary"
              onClick={() => {
                logout()
                navigate('/', { replace: true })
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <div className="fc-container grid grid-cols-1 gap-6 py-6 md:grid-cols-[260px_1fr]">
        <aside className="fc-card p-4 md:sticky md:top-6 md:h-[calc(100vh-7rem)]">
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app'}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-3 py-2 text-sm transition whitespace-nowrap',
                    isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 hidden md:block text-xs text-white/50">
            Tip: completa lecciones para ver tu progreso.
          </div>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

