import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="fc-container">
        <div className="mx-auto max-w-xl fc-card p-8">
          <div className="text-2xl font-bold">Página no encontrada</div>
          <div className="mt-2 text-white/70">La ruta no existe. Vuelve al inicio.</div>
          <div className="mt-6 flex gap-3">
            <Link className="fc-btn-primary" to="/">
              Ir al inicio
            </Link>
            <Link className="fc-btn-secondary" to="/app">
              Ir al portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

