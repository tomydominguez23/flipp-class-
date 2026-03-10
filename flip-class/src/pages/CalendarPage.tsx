import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  calendarDayNames,
  calendarMonthNames,
  specialCalendarEvents,
  weeklyCalendarEvents,
  weeklySchedule,
  type CalendarEvent,
  type SessionType,
} from '../lib/schedule'

type CalendarCell = {
  key: string
  day: number | null
  isToday: boolean
  events: CalendarEvent[]
}

function eventTone(type: SessionType) {
  const tones: Record<SessionType, string> = {
    mentor: 'fc-tone-mentor',
    premarket: 'fc-tone-premarket',
    europa: 'fc-tone-europa',
    post: 'fc-tone-post',
    tc2000: 'fc-tone-tc2000',
    sabados: 'fc-tone-sabados',
    especial: 'fc-tone-especial',
  }
  return tones[type]
}

function compactEventName(name: string) {
  if (name.length <= 24) return name
  return `${name.slice(0, 24)}...`
}

function buildMonthCells(monthDate: Date): CalendarCell[] {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  const cells: CalendarCell[] = []

  for (let i = 0; i < firstDay; i++) {
    cells.push({ key: `empty-${i}`, day: null, isToday: false, events: [] })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dayOfWeek = date.getDay()
    const weeklyEvents = weeklyCalendarEvents[dayOfWeek] ?? []
    const specials = specialCalendarEvents[`${month}-${day}`] ?? []

    cells.push({
      key: `day-${day}`,
      day,
      isToday:
        day === today.getDate() && month === today.getMonth() && year === today.getFullYear(),
      events: [...weeklyEvents, ...specials],
    })
  }

  return cells
}

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const monthLabel = `${calendarMonthNames[currentDate.getMonth()]} de ${currentDate.getFullYear()}`
  const cells = useMemo(() => buildMonthCells(currentDate), [currentDate])

  const quickCards = [
    {
      tag: 'Proximo evento',
      title: 'Clase con tu Mentor',
      time: 'Hoy - 8:00 AM',
      type: 'mentor' as const,
    },
    {
      tag: 'Siguiente',
      title: 'Sesion de Pre-Mercado',
      time: 'Hoy - 11:30 AM',
      type: 'premarket' as const,
    },
    {
      tag: 'Esta semana',
      title: 'Sesion Europa',
      time: 'Martes - 1:00 PM',
      type: 'europa' as const,
    },
    {
      tag: 'Fin de semana',
      title: 'Sabados Analiticos',
      time: 'Sabado - 8:00 AM',
      type: 'sabados' as const,
    },
  ]

  return (
    <div className="fc-calendar-page min-h-screen">
      <header className="fc-calendar-topbar">
        <div className="fc-container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-zinc-900 to-amber-600" />
            <div>
              <div className="text-sm font-semibold leading-tight">FLIP CLASS</div>
              <div className="text-xs text-slate-500 leading-tight">Calendario de eventos</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link className="fc-btn-secondary" to="/">
              Volver al inicio
            </Link>
            <Link className="fc-btn-primary" to="/app">
              Ir al portal
            </Link>
          </div>
        </div>
      </header>

      <section className="fc-calendar-hero">
        <div className="fc-container py-12 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Calendario de Clases y Eventos</h1>
          <p className="mx-auto mt-4 max-w-3xl text-white/75">
            Consulta las proximas clases en vivo, sesiones y eventos especiales. Haz clic en cada
            fecha para revisar tu agenda semanal.
          </p>
        </div>
      </section>

      <main className="fc-container pb-14 pt-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickCards.map((card) => (
            <article key={card.title} className={`fc-calendar-quick ${eventTone(card.type)}`}>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{card.tag}</div>
              <h3 className="mt-1 text-base font-bold text-slate-900">{card.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{card.time}</p>
            </article>
          ))}
        </div>

        <section className="fc-calendar-shell mt-7">
          <div className="fc-calendar-shell-header">
            <div className="flex items-center gap-2">
              <button
                className="fc-calendar-nav-btn"
                onClick={() =>
                  setCurrentDate(
                    (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                  )
                }
              >
                {'<'}
              </button>
              <button
                className="fc-calendar-nav-btn is-today"
                onClick={() => {
                  const now = new Date()
                  setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1))
                }}
              >
                Hoy
              </button>
              <button
                className="fc-calendar-nav-btn"
                onClick={() =>
                  setCurrentDate(
                    (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                  )
                }
              >
                {'>'}
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{monthLabel}</h2>
          </div>

          <div className="fc-calendar-legend">
            <div className="fc-calendar-legend-item">
              <span className="fc-calendar-dot fc-tone-mentor" />
              Clase con Mentor
            </div>
            <div className="fc-calendar-legend-item">
              <span className="fc-calendar-dot fc-tone-premarket" />
              Sesion Pre-Mercado
            </div>
            <div className="fc-calendar-legend-item">
              <span className="fc-calendar-dot fc-tone-europa" />
              Sesion Europa
            </div>
            <div className="fc-calendar-legend-item">
              <span className="fc-calendar-dot fc-tone-post" />
              Sesion Post-Intensivo
            </div>
            <div className="fc-calendar-legend-item">
              <span className="fc-calendar-dot fc-tone-tc2000" />
              Sesion TC2000
            </div>
            <div className="fc-calendar-legend-item">
              <span className="fc-calendar-dot fc-tone-sabados" />
              Sabados Analiticos
            </div>
          </div>

          <div className="fc-calendar-grid-head">
            {calendarDayNames.map((name) => (
              <div key={name} className="fc-calendar-day-head">
                {name}
              </div>
            ))}
          </div>

          <div className="fc-calendar-grid-days">
            {cells.map((cell) => (
              <article
                key={cell.key}
                className={`fc-calendar-day ${cell.day === null ? 'is-empty' : ''} ${
                  cell.isToday ? 'is-today' : ''
                }`}
              >
                {cell.day !== null ? <div className="fc-calendar-day-number">{cell.day}</div> : null}
                {cell.events.slice(0, 4).map((event, idx) => (
                  <div key={`${event.name}-${idx}`} className={`fc-calendar-event ${eventTone(event.type)}`}>
                    {compactEventName(event.name)}
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h3 className="text-2xl font-bold text-slate-900">Proximos Eventos de la Semana</h3>
          <div className="mt-4 grid gap-3">
            {weeklySchedule.map((session) => (
              <article key={session.id} className="fc-upcoming-item">
                <div className={`fc-upcoming-icon ${eventTone(session.type)}`}>{session.icon}</div>
                <div className="flex-1">
                  <div className="text-base font-bold text-slate-900">{session.title}</div>
                  <div className="text-sm text-slate-600">{session.timeLabel}</div>
                </div>
                <span className={`fc-upcoming-tag ${eventTone(session.type)}`}>Programado</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
