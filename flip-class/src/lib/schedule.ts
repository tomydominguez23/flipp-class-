export type SessionType =
  | 'mentor'
  | 'premarket'
  | 'europa'
  | 'post'
  | 'tc2000'
  | 'sabados'
  | 'especial'

export type ScheduleSession = {
  id: string
  title: string
  timeLabel: string
  icon: string
  type: SessionType
}

export type CalendarEvent = {
  name: string
  time: string
  type: SessionType
}

export const weeklySchedule: ScheduleSession[] = [
  {
    id: 'mentor',
    title: 'Clase con tu Mentor',
    timeLabel: 'Lunes a Viernes - 8:00 AM',
    icon: 'M',
    type: 'mentor',
  },
  {
    id: 'pre-market',
    title: 'Sesion de Pre-Mercado',
    timeLabel: 'Lunes a Viernes - 11:30 AM',
    icon: 'P',
    type: 'premarket',
  },
  {
    id: 'europa',
    title: 'Sesion Europa',
    timeLabel: 'Martes y Miercoles - 1:00 PM',
    icon: 'E',
    type: 'europa',
  },
  {
    id: 'post-intensivo',
    title: 'Sesion Post-Intensivo',
    timeLabel: 'Martes y Miercoles - 7:00 PM',
    icon: 'I',
    type: 'post',
  },
  {
    id: 'tc2000',
    title: 'Sesion de TC2000',
    timeLabel: 'Miercoles - 11:30 AM',
    icon: 'T',
    type: 'tc2000',
  },
  {
    id: 'sabados',
    title: 'Sabados Analiticos',
    timeLabel: 'Sabados - 8:00 AM',
    icon: 'S',
    type: 'sabados',
  },
]

// 0 = Domingo, 1 = Lunes, ..., 6 = Sabado
export const weeklyCalendarEvents: Record<number, CalendarEvent[]> = {
  1: [
    { name: 'Clase con tu Mentor', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de Pre-Mercado', time: '11:30 AM - 1:00 PM', type: 'premarket' },
  ],
  2: [
    { name: 'Clase con tu Mentor', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de Pre-Mercado', time: '11:30 AM - 1:00 PM', type: 'premarket' },
    { name: 'Sesion Europa', time: '1:00 PM - 2:30 PM', type: 'europa' },
    { name: 'Sesion Post-Intensivo', time: '7:00 PM - 8:30 PM', type: 'post' },
  ],
  3: [
    { name: 'Clase con tu Mentor', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de TC2000', time: '11:30 AM - 12:30 PM', type: 'tc2000' },
    { name: 'Sesion de Pre-Mercado', time: '11:30 AM - 1:00 PM', type: 'premarket' },
  ],
  4: [
    { name: 'Clase con tu Mentor', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de Pre-Mercado', time: '11:30 AM - 1:00 PM', type: 'premarket' },
  ],
  5: [
    { name: 'Clase con tu Mentor', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de Pre-Mercado', time: '11:30 AM - 1:00 PM', type: 'premarket' },
  ],
  6: [{ name: 'Sabados Analiticos', time: '8:00 AM - 10:00 AM', type: 'sabados' }],
}

// Llave: "mes-dia" con mes 0-indexado (0 = Enero)
export const specialCalendarEvents: Record<string, CalendarEvent[]> = {
  '1-2': [{ name: 'Masterclass Intensiva', time: '7:00 PM - 8:30 PM', type: 'especial' }],
  '1-7': [{ name: 'Master Apertura', time: '8:00 AM - 9:00 AM', type: 'especial' }],
  '1-14': [{ name: 'Masterclass con Invitado', time: '7:00 PM - 8:30 PM', type: 'especial' }],
}

export const calendarMonthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export const calendarDayNames = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB']
