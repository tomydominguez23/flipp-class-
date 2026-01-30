import { useEffect, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { addComment, addPost, getCommunity, likePost } from '../lib/community'
import { onStorageChange } from '../lib/storage'

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleString('es-CL', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

export function CommunityPage() {
  const { user } = useAuth()
  const [version, setVersion] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({})

  useEffect(() => onStorageChange(() => setVersion((v) => v + 1)), [])

  void version
  const state = getCommunity()

  return (
    <div className="space-y-6">
      <section className="fc-card p-6">
        <h1 className="text-2xl font-bold">Comunidad</h1>
        <p className="mt-2 text-white/70">
          Publica oportunidades, dudas y avances. Responde con números y proceso.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-xs text-white/60">Título</div>
            <input
              className="fc-input mt-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: ¿Conviene este auto con 5M de capital?"
            />
          </div>
          <div>
            <div className="text-xs text-white/60">Mensaje</div>
            <textarea
              className="fc-input mt-2 min-h-[48px]"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Cuenta el caso: año, kilometraje, precio compra, precio salida, gastos estimados..."
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="fc-btn-primary"
            onClick={() => {
              const t = title.trim()
              const b = body.trim()
              if (!t || !b) return
              addPost({ authorName: user?.nombre ?? 'Alumno', title: t, body: b })
              setTitle('')
              setBody('')
            }}
          >
            Publicar
          </button>
        </div>
      </section>

      <section className="space-y-4">
        {state.posts.map((p) => (
          <div key={p.id} className="fc-card p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="mt-1 text-xs text-white/60">
                  {p.authorName} · {fmt(p.createdAt)}
                </div>
              </div>
              <button className="fc-btn-secondary" onClick={() => likePost(p.id)}>
                Me gusta ({p.likes})
              </button>
            </div>

            <p className="mt-3 whitespace-pre-wrap text-sm text-white/80">{p.body}</p>

            <div className="mt-5">
              <div className="text-sm font-semibold">Comentarios</div>
              <div className="mt-3 space-y-3">
                {p.comments.length === 0 ? (
                  <div className="text-sm text-white/60">Aún no hay comentarios.</div>
                ) : (
                  p.comments.map((c) => (
                    <div key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/60">
                        {c.authorName} · {fmt(c.createdAt)}
                      </div>
                      <div className="mt-2 whitespace-pre-wrap text-sm text-white/80">{c.body}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
                <input
                  className="fc-input"
                  value={commentDraft[p.id] ?? ''}
                  onChange={(e) =>
                    setCommentDraft((d) => ({
                      ...d,
                      [p.id]: e.target.value,
                    }))
                  }
                  placeholder="Escribe un comentario..."
                />
                <button
                  className="fc-btn-primary"
                  onClick={() => {
                    const draft = (commentDraft[p.id] ?? '').trim()
                    if (!draft) return
                    addComment({ postId: p.id, authorName: user?.nombre ?? 'Alumno', body: draft })
                    setCommentDraft((d) => ({ ...d, [p.id]: '' }))
                  }}
                >
                  Comentar
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

