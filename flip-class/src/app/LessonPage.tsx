import { Link, useParams } from 'react-router-dom'
import { modules } from '../lib/courseData'
import { isLessonCompleted, toggleLessonCompleted } from '../lib/progress'
import { useEffect, useState } from 'react'
import { onStorageChange } from '../lib/storage'

export function LessonPage() {
  const { moduleId, lessonId } = useParams()
  const [version, setVersion] = useState(0)

  useEffect(() => onStorageChange(() => setVersion((v) => v + 1)), [])

  void version
  const model = (() => {
    const mod = modules.find((m) => m.id === moduleId)
    const lesson = mod?.lessons.find((l) => l.id === lessonId)
    if (!mod || !lesson) return null
    const idx = mod.lessons.findIndex((l) => l.id === lesson.id)
    const prev = idx > 0 ? mod.lessons[idx - 1] : null
    const next = idx >= 0 && idx < mod.lessons.length - 1 ? mod.lessons[idx + 1] : null
    const done = isLessonCompleted(mod.id, lesson.id)
    return { mod, lesson, prev, next, done }
  })()

  if (!model) {
    return (
      <div className="fc-card p-6">
        <div className="text-lg font-semibold">Lección no encontrada</div>
        <div className="mt-2 text-white/70">
          Vuelve al <Link className="underline" to="/app/curso">listado del curso</Link>.
        </div>
      </div>
    )
  }

  const { mod, lesson, prev, next, done } = model

  return (
    <div className="space-y-6">
      <section className="fc-card overflow-hidden">
        <div className="p-6">
          <div className="text-xs text-white/60">
            <Link className="underline" to="/app/curso">
              Curso
            </Link>{' '}
            / {mod.titulo}
          </div>
          <h1 className="mt-2 text-2xl font-bold">{lesson.titulo}</h1>
          <p className="mt-2 text-white/70">{lesson.descripcion}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {lesson.duracionMin ? <span className="fc-badge">{lesson.duracionMin} min</span> : null}
            {done ? <span className="fc-badge">Completada</span> : <span className="fc-badge">En progreso</span>}
          </div>
        </div>

        {lesson.imagenUrl ? (
          <div className="relative">
            <img
              src={lesson.imagenUrl}
              alt={lesson.titulo}
              className="h-56 w-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        ) : null}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="fc-card p-6">
          <h2 className="text-lg font-semibold">Clase</h2>
          <p className="mt-2 text-sm text-white/70">
            Video en construcción. Mientras tanto, usa el resumen y aplica el checklist/materiales.
          </p>
          {lesson.videoEmbedUrl ? (
            <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                className="h-full w-full"
                src={lesson.videoEmbedUrl}
                title={lesson.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              - Objetivo: aplicar el sistema con números (margen/ROI).<br />
              - Acción: completa la planilla de margen antes de comprar.<br />
              - Comunidad: publica el caso y pide feedback.
            </div>
          )}
        </div>

        <aside className="fc-card p-6">
          <h2 className="text-lg font-semibold">Acciones</h2>
          <button
            className={done ? 'fc-btn-secondary mt-3 w-full' : 'fc-btn-primary mt-3 w-full'}
            onClick={() => toggleLessonCompleted(mod.id, lesson.id)}
          >
            {done ? 'Marcar como NO completada' : 'Marcar como completada'}
          </button>

          <div className="mt-6 space-y-2">
            {prev ? (
              <Link
                className="fc-btn-secondary w-full"
                to={`/app/curso/modulo/${mod.id}/leccion/${prev.id}`}
              >
                ← Lección anterior
              </Link>
            ) : null}
            {next ? (
              <Link
                className="fc-btn-secondary w-full"
                to={`/app/curso/modulo/${mod.id}/leccion/${next.id}`}
              >
                Siguiente lección →
              </Link>
            ) : (
              <Link className="fc-btn-secondary w-full" to="/app/curso">
                Volver a módulos
              </Link>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <div className="font-semibold text-white">Siguiente paso</div>
            <div className="mt-2">
              Abre <Link className="underline" to="/app/materiales">Materiales</Link> y descarga la
              planilla/checklists para aplicar hoy mismo.
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

