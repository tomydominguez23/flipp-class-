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

function moduleTone(index: number) {
  const tones = [
    {
      cover: 'from-emerald-700 to-emerald-500',
      progress: 'bg-emerald-500',
      button: 'bg-emerald-600 hover:bg-emerald-700',
    },
    {
      cover: 'from-cyan-700 to-sky-500',
      progress: 'bg-sky-500',
      button: 'bg-sky-600 hover:bg-sky-700',
    },
    {
      cover: 'from-amber-700 to-amber-500',
      progress: 'bg-amber-500',
      button: 'bg-amber-500 hover:bg-amber-600 text-slate-900',
    },
  ]
  return tones[index % tones.length]
}

function moduleStatus(pct: number) {
  if (pct >= 100) {
    return {
      label: 'Completado',
      classes: 'bg-emerald-100 text-emerald-700',
    }
  }
  if (pct > 0) {
    return {
      label: 'En progreso',
      classes: 'bg-sky-100 text-sky-700',
    }
  }
  return {
    label: 'Pendiente',
    classes: 'bg-slate-100 text-slate-600',
  }
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
        <div className="text-center">
          <div className="mx-auto inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
            Contenido premium
          </div>
          <h1 className="mt-3 text-3xl font-extrabold">Nuestros Módulos</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/70">
            Accede a todo el contenido del curso y avanza paso a paso. Tu progreso queda guardado
            automáticamente.
          </p>
        </div>
        <div className="mx-auto mt-6 max-w-xl">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>
              Progreso total: {overall.completed}/{overall.totalLessons}
            </span>
            <span>{overall.pct}%</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={overall.pct} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {modules.map((m, index) => {
          const ids = m.lessons.map((l) => l.id)
          const stats = modulePct(m.id, ids)
          const firstLesson = m.lessons[0]
          const tone = moduleTone(index)
          const status = moduleStatus(stats.pct)
          const cleanTitle = m.titulo.replace(/^M[ÓO]DULO\s+\d+\s+—\s+/i, '')

          return (
            <article key={m.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className={`relative min-h-[170px] bg-gradient-to-br p-4 ${tone.cover}`}>
                {m.imagenUrl ? (
                  <img
                    src={m.imagenUrl}
                    alt={m.titulo}
                    className="absolute inset-0 h-full w-full object-cover opacity-20"
                    loading="lazy"
                  />
                ) : null}
                <div className="relative flex items-start justify-between gap-2">
                  <div className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white">
                    FLIP CLASS
                  </div>
                  <div className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white">
                    Módulo {index + 1}
                  </div>
                </div>
                <div className="relative mt-6 text-3xl font-extrabold uppercase leading-tight text-white">
                  {cleanTitle}
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-900">{cleanTitle}</h2>
                <p className="mt-1 text-sm text-slate-500">{m.subtitulo}</p>
                <p className="mt-2 text-sm text-slate-600">{m.descripcion}</p>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{stats.pct}% completado</span>
                    <span>
                      {stats.done}/{stats.total} lecciones
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200">
                    <div
                      className={`h-1.5 rounded-full ${tone.progress}`}
                      style={{ width: `${stats.pct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${status.classes}`}>
                    {status.label}
                  </span>
                  {firstLesson ? (
                    <Link
                      className={`inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${tone.button}`}
                      to={`/app/curso/modulo/${m.id}/leccion/${firstLesson.id}`}
                    >
                      Ver programa
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}

