import { Link, useParams } from 'react-router-dom'
import { modules } from '../lib/courseData'
import { isLessonCompleted, toggleLessonCompleted } from '../lib/progress'
import { useEffect, useState } from 'react'
import { onStorageChange } from '../lib/storage'
import { ProgressBar } from '../components/ProgressBar'
import { cn } from '../lib/cn'
import { useAuth } from '../auth/useAuth'
import { addLessonComment, getLessonComments, likeLessonComment } from '../lib/lessonDiscussion'

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleString('es-CL', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || 'AL'
}

export function LessonPage() {
  const { moduleId, lessonId } = useParams()
  const { user } = useAuth()
  const [version, setVersion] = useState(0)
  const [commentDraft, setCommentDraft] = useState('')

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
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-semibold text-slate-900">Lección no encontrada</div>
        <div className="mt-2 text-slate-600">
          Vuelve al <Link className="underline" to="/app/curso">listado del curso</Link>.
        </div>
      </div>
    )
  }

  const { mod, lesson, prev, next, done } = model
  const completedInModule = mod.lessons.filter((l) => isLessonCompleted(mod.id, l.id)).length
  const modulePct = mod.lessons.length ? Math.round((completedInModule / mod.lessons.length) * 100) : 0
  const comments = getLessonComments(mod.id, lesson.id)

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-500 shadow-sm">
        <Link to="/app/curso" className="font-semibold text-amber-700">
          Curso
        </Link>{' '}
        / <span>{mod.titulo}</span> / <span className="font-semibold text-slate-900">{lesson.titulo}</span>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-video bg-slate-900">
              {lesson.videoEmbedUrl ? (
                <iframe
                  className="h-full w-full"
                  src={lesson.videoEmbedUrl}
                  title={lesson.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {lesson.imagenUrl ? (
                    <img
                      src={lesson.imagenUrl}
                      alt={lesson.titulo}
                      className="absolute inset-0 h-full w-full object-cover opacity-70"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/65 to-amber-700/65" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                    <div className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                      Lección del módulo
                    </div>
                    <h2 className="mt-4 max-w-3xl px-4 text-3xl font-extrabold">{lesson.titulo}</h2>
                    <div className="mt-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-900">
                      ▶
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className={cn(
              'flex flex-col gap-3 rounded-2xl border px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between',
              done
                ? 'border-emerald-200 bg-emerald-50'
                : 'border-amber-200 bg-amber-50',
            )}
          >
            <div>
              <div className={cn('text-xs font-semibold uppercase tracking-wide', done ? 'text-emerald-700' : 'text-amber-700')}>
                {done ? 'Excelente trabajo' : 'Sigue avanzando'}
              </div>
              <div className="mt-1 text-sm text-slate-700">
                {done ? 'Lección completada. Continúa con la siguiente clase del módulo.' : 'Marca esta lección como completada cuando apliques el contenido.'}
              </div>
            </div>
            <button
              className={done ? 'fc-btn-secondary !border-emerald-300 !bg-white !text-emerald-700' : 'fc-btn-primary'}
              onClick={() => toggleLessonCompleted(mod.id, lesson.id)}
            >
              {done ? 'Marcar como pendiente' : 'Marcar como completada'}
            </button>
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">{lesson.titulo}</h1>
            <p className="mt-2 text-slate-600">{lesson.descripcion}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {lesson.duracionMin ? (
                <span className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {lesson.duracionMin} min
                </span>
              ) : null}
              <span className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {done ? 'Completada' : 'En progreso'}
              </span>
              <span className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {mod.titulo.replace(/^M[ÓO]DULO\s+\d+\s+—\s+/i, '')}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">Qué vas a aplicar en esta clase</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>- Método claro para tomar decisiones con datos y no por intuición.</li>
                <li>- Checkpoints prácticos para evitar errores comunes en operación.</li>
                <li>- Acción concreta para ejecutar hoy y publicar resultados en comunidad.</li>
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Acciones rápidas</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Link className="fc-btn-secondary !border-slate-300 !bg-white !text-slate-700" to="/app/materiales">
                Descargar materiales
              </Link>
              <Link className="fc-btn-secondary !border-slate-300 !bg-white !text-slate-700" to="/app/comunidad">
                Ir a comunidad
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">Comentarios ({comments.length})</h2>
              <span className="text-xs text-slate-500">Comparte avances y dudas del caso</span>
            </div>

            <div className="mt-4">
              <textarea
                className="fc-auth-input min-h-[88px]"
                placeholder="Escribe tu comentario o pregunta sobre esta clase..."
                value={commentDraft}
                onChange={(e) => setCommentDraft(e.target.value)}
              />
              <div className="mt-2 text-right">
                <button
                  className="fc-btn-primary"
                  onClick={() => {
                    const text = commentDraft.trim()
                    if (!text) return
                    addLessonComment({
                      moduleId: mod.id,
                      lessonId: lesson.id,
                      authorName: user?.nombre ?? 'Alumno',
                      body: text,
                    })
                    setCommentDraft('')
                  }}
                >
                  Publicar comentario
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {comments.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                  Aún no hay comentarios en esta lección. Sé el primero en compartir tu avance.
                </div>
              ) : (
                comments.map((comment) => (
                  <article key={comment.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                        {initials(comment.authorName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700">{comment.authorName}</span>
                          <span>•</span>
                          <span>{fmt(comment.createdAt)}</span>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{comment.body}</p>
                        <button
                          className="mt-2 text-xs font-semibold text-amber-700 hover:text-amber-800"
                          onClick={() =>
                            likeLessonComment({
                              moduleId: mod.id,
                              lessonId: lesson.id,
                              commentId: comment.id,
                            })
                          }
                        >
                          👍 Me gusta ({comment.likes})
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Progreso del módulo</div>
            <div className="mt-1 text-xs text-slate-500">
              {completedInModule}/{mod.lessons.length} clases completadas
            </div>
            <div className="mt-3">
              <ProgressBar value={modulePct} />
            </div>
            <div className="mt-2 text-xs font-semibold text-amber-700">{modulePct}% completado</div>

            <div className="mt-4 space-y-2">
              {mod.lessons.map((l) => {
                const active = l.id === lesson.id
                const completed = isLessonCompleted(mod.id, l.id)
                return (
                  <Link
                    key={l.id}
                    to={`/app/curso/modulo/${mod.id}/leccion/${l.id}`}
                    className={cn(
                      'block rounded-xl border px-3 py-3 text-sm transition',
                      active
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : completed
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300',
                    )}
                  >
                    <div className="font-semibold">{l.titulo}</div>
                    <div className={cn('mt-1 text-xs', active ? 'text-white/75' : 'text-slate-500')}>
                      {l.duracionMin ? `${l.duracionMin} min` : 'Duración variable'}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Navegación</div>
            <div className="mt-3 space-y-2">
              {prev ? (
                <Link
                  className="fc-btn-secondary w-full !border-slate-300 !bg-white !text-slate-700"
                  to={`/app/curso/modulo/${mod.id}/leccion/${prev.id}`}
                >
                  ← Lección anterior
                </Link>
              ) : null}
              {next ? (
                <Link
                  className="fc-btn-secondary w-full !border-slate-300 !bg-white !text-slate-700"
                  to={`/app/curso/modulo/${mod.id}/leccion/${next.id}`}
                >
                  Siguiente lección →
                </Link>
              ) : (
                <Link className="fc-btn-secondary w-full !border-slate-300 !bg-white !text-slate-700" to="/app/curso">
                  Volver a módulos
                </Link>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

