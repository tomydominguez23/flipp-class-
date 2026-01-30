export type PlanId = 'BASICO' | 'HIBRIDO' | 'PRO'

export type User = {
  id: string
  nombre: string
  email: string
  plan: PlanId
  creadoEn: string
}

export type Session = {
  userId: string
  creadoEn: string
}

export type CourseLesson = {
  id: string
  titulo: string
  descripcion: string
  videoEmbedUrl?: string
  imagenUrl?: string
  duracionMin?: number
}

export type CourseModule = {
  id: string
  titulo: string
  subtitulo: string
  descripcion: string
  imagenUrl?: string
  lessons: CourseLesson[]
}

export type CourseProgress = {
  completadas: Record<string, true>
}

export type CommunityComment = {
  id: string
  authorName: string
  createdAt: string
  body: string
}

export type CommunityPost = {
  id: string
  authorName: string
  createdAt: string
  title: string
  body: string
  likes: number
  comments: CommunityComment[]
}

export type CommunityState = {
  posts: CommunityPost[]
}

