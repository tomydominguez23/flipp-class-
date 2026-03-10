import type { LessonComment } from './types'
import { readLocal, writeLocal } from './storage'

const LESSON_DISCUSSION_KEY = 'fc_lesson_discussion'

type LessonDiscussionState = {
  byLesson: Record<string, LessonComment[]>
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

function readState(): LessonDiscussionState {
  return readLocal<LessonDiscussionState>(LESSON_DISCUSSION_KEY) ?? { byLesson: {} }
}

function writeState(state: LessonDiscussionState) {
  writeLocal(LESSON_DISCUSSION_KEY, state)
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
