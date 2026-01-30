import type { CourseProgress } from './types'
import { readLocal, writeLocal } from './storage'

const PROGRESS_KEY = 'fc_progress'

function emptyProgress(): CourseProgress {
  return { completadas: {} }
}

export function getProgress(): CourseProgress {
  return readLocal<CourseProgress>(PROGRESS_KEY) ?? emptyProgress()
}

export function isLessonCompleted(moduleId: string, lessonId: string) {
  const p = getProgress()
  return Boolean(p.completadas[`${moduleId}:${lessonId}`])
}

export function toggleLessonCompleted(moduleId: string, lessonId: string) {
  const p = getProgress()
  const key = `${moduleId}:${lessonId}`
  const next = { ...p.completadas }
  if (next[key]) delete next[key]
  else next[key] = true
  const updated: CourseProgress = { completadas: next }
  writeLocal(PROGRESS_KEY, updated)
  return updated
}

