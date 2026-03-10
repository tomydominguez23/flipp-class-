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
    title: 'Clase de Compra Inteligente',
    timeLabel: 'Lunes a Viernes - 8:00 AM',
    icon: 'M',
    type: 'mentor',
  },
  {
    id: 'pre-market',
    title: 'Sesion de Publicacion y Leads',
    timeLabel: 'Lunes a Viernes - 11:30 AM',
    icon: 'P',
    type: 'premarket',
  },
  {
    id: 'europa',
    title: 'Sesion de Negociacion',
    timeLabel: 'Martes y Miercoles - 1:00 PM',
    icon: 'E',
    type: 'europa',
  },
  {
    id: 'post-intensivo',
    title: 'Sesion de Cierres y Objeciones',
    timeLabel: 'Martes y Miercoles - 7:00 PM',
    icon: 'I',
    type: 'post',
  },
  {
    id: 'tc2000',
    title: 'Sesion de Ads y Captacion',
    timeLabel: 'Miercoles - 11:30 AM',
    icon: 'T',
    type: 'tc2000',
  },
  {
    id: 'sabados',
    title: 'Sabados de Casos Reales',
    timeLabel: 'Sabados - 8:00 AM',
    icon: 'S',
    type: 'sabados',
  },
]

// 0 = Domingo, 1 = Lunes, ..., 6 = Sabado
export const weeklyCalendarEvents: Record<number, CalendarEvent[]> = {
  1: [
    { name: 'Clase de Compra Inteligente', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de Publicacion y Leads', time: '11:30 AM - 1:00 PM', type: 'premarket' },
  ],
  2: [
    { name: 'Clase de Compra Inteligente', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de Publicacion y Leads', time: '11:30 AM - 1:00 PM', type: 'premarket' },
    { name: 'Sesion de Negociacion', time: '1:00 PM - 2:30 PM', type: 'europa' },
    { name: 'Sesion de Cierres y Objeciones', time: '7:00 PM - 8:30 PM', type: 'post' },
  ],
  3: [
    { name: 'Clase de Compra Inteligente', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de Ads y Captacion', time: '11:30 AM - 12:30 PM', type: 'tc2000' },
    { name: 'Sesion de Publicacion y Leads', time: '11:30 AM - 1:00 PM', type: 'premarket' },
  ],
  4: [
    { name: 'Clase de Compra Inteligente', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de Publicacion y Leads', time: '11:30 AM - 1:00 PM', type: 'premarket' },
  ],
  5: [
    { name: 'Clase de Compra Inteligente', time: '8:00 AM - 9:30 AM', type: 'mentor' },
    { name: 'Sesion de Publicacion y Leads', time: '11:30 AM - 1:00 PM', type: 'premarket' },
  ],
  6: [{ name: 'Sabados de Casos Reales', time: '8:00 AM - 10:00 AM', type: 'sabados' }],
}

// Llave: "mes-dia" con mes 0-indexado (0 = Enero)
export const specialCalendarEvents: Record<string, CalendarEvent[]> = {
  '1-2': [{ name: 'Masterclass: Escala tu Automotora', time: '7:00 PM - 8:30 PM', type: 'especial' }],
  '1-7': [{ name: 'Workshop: Apertura de Semana', time: '8:00 AM - 9:00 AM', type: 'especial' }],
  '1-14': [{ name: 'Panel con Duenos de Automotora', time: '7:00 PM - 8:30 PM', type: 'especial' }],
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
