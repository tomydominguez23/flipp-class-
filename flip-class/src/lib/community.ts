import type { CommunityComment, CommunityPost, CommunityState } from './types'
import { readLocal, writeLocal } from './storage'

const COMMUNITY_KEY = 'fc_community'

function nowIso() {
  return new Date().toISOString()
}

function uid() {
  return Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
}

function seed(): CommunityState {
  return {
    posts: [
      {
        id: uid(),
        authorName: 'Equipo FLIP CLASS',
        createdAt: nowIso(),
        title: 'Bienvenido a la comunidad',
        body:
          'Comparte tus avances, dudas y oportunidades. Tip: publica tu capital estimado y el tipo de auto que buscas para que te orientemos.',
        likes: 7,
        comments: [
          {
            id: uid(),
            authorName: 'Equipo FLIP CLASS',
            createdAt: nowIso(),
            body: 'Recuerda: no es solo comprar barato; es sistema + proceso + números.',
          },
        ],
      },
      {
        id: uid(),
        authorName: 'Mentor',
        createdAt: nowIso(),
        title: 'Plantilla rápida para calcular margen',
        body:
          'Margen = Precio venta realista - (Precio compra + transferencia + mecánica + detailing + ads + imprevistos). Si tu margen no aguanta 2 semanas extra de stock, no compres.',
        likes: 14,
        comments: [],
      },
    ],
  }
}

export function getCommunity(): CommunityState {
  const current = readLocal<CommunityState>(COMMUNITY_KEY)
  if (current && current.posts) return current
  const s = seed()
  writeLocal(COMMUNITY_KEY, s)
  return s
}

export function addPost(params: { authorName: string; title: string; body: string }) {
  const state = getCommunity()
  const post: CommunityPost = {
    id: uid(),
    authorName: params.authorName,
    createdAt: nowIso(),
    title: params.title.trim(),
    body: params.body.trim(),
    likes: 0,
    comments: [],
  }
  const next: CommunityState = { posts: [post, ...state.posts] }
  writeLocal(COMMUNITY_KEY, next)
  return next
}

export function likePost(postId: string) {
  const state = getCommunity()
  const next: CommunityState = {
    posts: state.posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)),
  }
  writeLocal(COMMUNITY_KEY, next)
  return next
}

export function addComment(params: { postId: string; authorName: string; body: string }) {
  const state = getCommunity()
  const comment: CommunityComment = {
    id: uid(),
    authorName: params.authorName,
    createdAt: nowIso(),
    body: params.body.trim(),
  }
  const next: CommunityState = {
    posts: state.posts.map((p) =>
      p.id === params.postId ? { ...p, comments: [...p.comments, comment] } : p,
    ),
  }
  writeLocal(COMMUNITY_KEY, next)
  return next
}

