import type { LessonComment, LessonReply } from './types'
import { readLocal, writeLocal } from './storage'

const LESSON_DISCUSSION_KEY = 'fc_lesson_discussion'
const LESSON_DISCUSSION_META_KEY = 'fc_lesson_discussion_meta'

type LessonDiscussionState = {
  byLesson: Record<string, LessonComment[]>
}

type LessonDiscussionMetaState = {
  byLesson: Record<string, { lastSeenAt: string }>
}

function uid() {
  return Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
}

function nowIso() {
  return new Date().toISOString()
}

function lessonKey(moduleId: string, lessonId: string) {
  return `${moduleId}:${lessonId}`
}

function normalizeComments(comments: LessonComment[]): LessonComment[] {
  return comments.map((comment) => ({
    ...comment,
    likes: Number(comment.likes ?? 0),
    replies: (comment.replies ?? []).map((reply) => ({
      ...reply,
      likes: Number(reply.likes ?? 0),
    })),
  }))
}

function readState(): LessonDiscussionState {
  const raw = readLocal<LessonDiscussionState>(LESSON_DISCUSSION_KEY) ?? { byLesson: {} }
  return {
    byLesson: Object.fromEntries(
      Object.entries(raw.byLesson).map(([key, comments]) => [key, normalizeComments(comments)]),
    ),
  }
}

function writeState(state: LessonDiscussionState) {
  writeLocal(LESSON_DISCUSSION_KEY, state)
}

function readMetaState(): LessonDiscussionMetaState {
  return readLocal<LessonDiscussionMetaState>(LESSON_DISCUSSION_META_KEY) ?? { byLesson: {} }
}

function writeMetaState(state: LessonDiscussionMetaState) {
  writeLocal(LESSON_DISCUSSION_META_KEY, state)
}

export function getLessonComments(moduleId: string, lessonId: string): LessonComment[] {
  const key = lessonKey(moduleId, lessonId)
  const state = readState()
  return state.byLesson[key] ?? []
}

export function addLessonComment(params: {
  moduleId: string
  lessonId: string
  authorName: string
  body: string
}) {
  const state = readState()
  const key = lessonKey(params.moduleId, params.lessonId)
  const current = state.byLesson[key] ?? []

  const comment: LessonComment = {
    id: uid(),
    authorName: params.authorName,
    createdAt: nowIso(),
    body: params.body.trim(),
    likes: 0,
    replies: [],
  }

  const next: LessonDiscussionState = {
    byLesson: {
      ...state.byLesson,
      [key]: [comment, ...current],
    },
  }

  writeState(next)
  return next
}

export function likeLessonComment(params: { moduleId: string; lessonId: string; commentId: string }) {
  const state = readState()
  const key = lessonKey(params.moduleId, params.lessonId)
  const current = state.byLesson[key] ?? []

  const updated = current.map((comment) =>
    comment.id === params.commentId ? { ...comment, likes: comment.likes + 1 } : comment,
  )

  const next: LessonDiscussionState = {
    byLesson: {
      ...state.byLesson,
      [key]: updated,
    },
  }

  writeState(next)
  return next
}

export function addLessonReply(params: {
  moduleId: string
  lessonId: string
  commentId: string
  authorName: string
  body: string
}) {
  const state = readState()
  const key = lessonKey(params.moduleId, params.lessonId)
  const current = state.byLesson[key] ?? []

  const reply: LessonReply = {
    id: uid(),
    authorName: params.authorName,
    createdAt: nowIso(),
    body: params.body.trim(),
    likes: 0,
  }

  const updated = current.map((comment) =>
    comment.id === params.commentId
      ? { ...comment, replies: [...comment.replies, reply] }
      : comment,
  )

  const next: LessonDiscussionState = {
    byLesson: {
      ...state.byLesson,
      [key]: updated,
    },
  }

  writeState(next)
  return next
}

export function likeLessonReply(params: {
  moduleId: string
  lessonId: string
  commentId: string
  replyId: string
}) {
  const state = readState()
  const key = lessonKey(params.moduleId, params.lessonId)
  const current = state.byLesson[key] ?? []

  const updated = current.map((comment) =>
    comment.id === params.commentId
      ? {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === params.replyId ? { ...reply, likes: reply.likes + 1 } : reply,
          ),
        }
      : comment,
  )

  const next: LessonDiscussionState = {
    byLesson: {
      ...state.byLesson,
      [key]: updated,
    },
  }

  writeState(next)
  return next
}

export function getLessonLastSeen(moduleId: string, lessonId: string): string | null {
  const key = lessonKey(moduleId, lessonId)
  const meta = readMetaState()
  return meta.byLesson[key]?.lastSeenAt ?? null
}

export function markLessonSeen(moduleId: string, lessonId: string, atIso = nowIso()) {
  const key = lessonKey(moduleId, lessonId)
  const meta = readMetaState()
  const next: LessonDiscussionMetaState = {
    byLesson: {
      ...meta.byLesson,
      [key]: { lastSeenAt: atIso },
    },
  }
  writeMetaState(next)
  return next
}
