import type { PlanId, Session, User } from './types'
import { readLocal, removeLocal, writeLocal } from './storage'

const USERS_KEY = 'fc_users'
const SESSION_KEY = 'fc_session'

type UsersState = {
  users: User[]
}

function nowIso() {
  return new Date().toISOString()
}

function uid() {
  return Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
}

function readUsers(): UsersState {
  return readLocal<UsersState>(USERS_KEY) ?? { users: [] }
}

function writeUsers(state: UsersState) {
  writeLocal(USERS_KEY, state)
}

export function getSession(): Session | null {
  return readLocal<Session>(SESSION_KEY)
}

export function getCurrentUser(): User | null {
  const session = getSession()
  if (!session) return null
  const { users } = readUsers()
  return users.find((u) => u.id === session.userId) ?? null
}

export function logout() {
  removeLocal(SESSION_KEY)
}

export function register(params: {
  nombre: string
  email: string
  plan: PlanId
}): { ok: true; user: User } | { ok: false; error: string } {
  const nombre = params.nombre.trim()
  const email = params.email.trim().toLowerCase()
  if (!nombre) return { ok: false, error: 'Ingresa tu nombre.' }
  if (!email || !email.includes('@')) return { ok: false, error: 'Ingresa un email válido.' }

  const state = readUsers()
  const existing = state.users.find((u) => u.email === email)
  if (existing) return { ok: false, error: 'Ese email ya está registrado. Inicia sesión.' }

  const user: User = {
    id: uid(),
    nombre,
    email,
    plan: params.plan,
    creadoEn: nowIso(),
  }

  state.users.unshift(user)
  writeUsers(state)
  writeLocal<Session>(SESSION_KEY, { userId: user.id, creadoEn: nowIso() })
  return { ok: true, user }
}

export function login(params: {
  email: string
}): { ok: true; user: User } | { ok: false; error: string } {
  const email = params.email.trim().toLowerCase()
  if (!email || !email.includes('@')) return { ok: false, error: 'Ingresa un email válido.' }

  const state = readUsers()
  const user = state.users.find((u) => u.email === email)
  if (!user) return { ok: false, error: 'No encontramos ese email. Regístrate primero.' }

  writeLocal<Session>(SESSION_KEY, { userId: user.id, creadoEn: nowIso() })
  return { ok: true, user }
}

export function updateCurrentUser(patch: Partial<Pick<User, 'nombre' | 'plan'>>) {
  const session = getSession()
  if (!session) return { ok: false as const, error: 'Sin sesión.' }

  const state = readUsers()
  const idx = state.users.findIndex((u) => u.id === session.userId)
  if (idx < 0) return { ok: false as const, error: 'Usuario no encontrado.' }

  state.users[idx] = { ...state.users[idx], ...patch }
  writeUsers(state)
  return { ok: true as const, user: state.users[idx] }
}

