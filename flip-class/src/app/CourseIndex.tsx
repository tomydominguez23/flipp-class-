import { Link } from 'react-router-dom'
import { modules } from '../lib/courseData'
import { getProgress } from '../lib/progress'
import { useEffect, useState } from 'react'
import { onStorageChange } from '../lib/storage'
import { ProgressBar } from '../components/ProgressBar'

function modulePct(moduleId: string, lessonIds: string[]) {
  const progress = getProgress()
  const done = lessonIds.filter((id) => progress.completadas[`${moduleId}:${id}`]).length
  const pct = lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0
  return { done, total: lessonIds.length, pct }
}

export function CourseIndex() {
  const [version, setVersion] = useState(0)
  useEffect(() => onStorageChange(() => setVersion((v) => v + 1)), [])

  void version
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completed = Object.keys(getProgress().completadas).length
  const pct = totalLessons ? Math.round((completed / totalLessons) * 100) : 0
  const overall = { totalLessons, completed, pct }

  return (
    <div className="space-y-6">
      <section className="fc-card p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Curso</h1>
            <p className="mt-1 text-white/70">
              Completa lecciones y marca tu avance. Todo queda guardado en tu navegador.
            </p>
          </div>
          <div className="min-w-[220px]">
            <div className="text-xs text-white/60">
              Progreso total: {overall.completed}/{overall.totalLessons} ({overall.pct}%)
            </div>
            <ProgressBar className="mt-2" value={overall.pct} />
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {modules.map((m) => {
          const ids = m.lessons.map((l) => l.id)
          const stats = modulePct(m.id, ids)
          const firstLesson = m.lessons[0]
          return (
            <div key={m.id} className="fc-card overflow-hidden">
              <div className="grid md:grid-cols-[280px_1fr]">
                <div className="relative">
                  {m.imagenUrl ? (
                    <img
                      src={m.imagenUrl}
                      alt={m.titulo}
                      className="h-full w-full object-cover opacity-90"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full min-h-[160px] bg-white/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-lg font-semibold">{m.titulo}</div>
                      <div className="mt-1 text-sm text-white/70">{m.subtitulo}</div>
                      <div className="mt-2 text-sm text-white/70">{m.descripcion}</div>
                    </div>
                    {firstLesson && (
                      <Link
                        className="fc-btn-primary whitespace-nowrap"
                        to={`/app/curso/modulo/${m.id}/leccion/${firstLesson.id}`}
                      >
                        Abrir
                      </Link>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>
                        {stats.done}/{stats.total} completadas
                      </span>
                      <span>{stats.pct}%</span>
                    </div>
                    <ProgressBar className="mt-2" value={stats.pct} />
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {m.lessons.map((l) => (
                      <Link
                        key={l.id}
                        to={`/app/curso/modulo/${m.id}/leccion/${l.id}`}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm hover:bg-white/10 transition"
                      >
                        <div className="font-semibold">{l.titulo}</div>
                        <div className="mt-1 text-xs text-white/60">{l.descripcion}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

