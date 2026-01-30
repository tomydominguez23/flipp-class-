import type { PlanId } from './types'

export type Plan = {
  id: PlanId
  color: 'green' | 'blue' | 'red'
  title: string
  subtitle: string
  includes: string[]
  idealFor: string
}

export const plans: Plan[] = [
  {
    id: 'BASICO',
    color: 'green',
    title: 'PLAN 1 — BÁSICO ONLINE',
    subtitle: '100% Online',
    includes: [
      'Acceso completo a todos los módulos online',
      'Clases grabadas + actualizaciones',
      'Material descargable (checklists, contratos base, planillas)',
      'Acceso a comunidad privada',
    ],
    idealFor: 'Ideal para partir y flippear tu primer auto',
  },
  {
    id: 'HIBRIDO',
    color: 'blue',
    title: 'PLAN 2 — HÍBRIDO',
    subtitle: 'Online + 1 reunión presencial',
    includes: [
      'Todo lo del Plan Básico',
      '1 reunión presencial grupal (networking + Q&A)',
      'Análisis de casos reales',
      'Revisión de publicaciones y estrategias',
    ],
    idealFor: 'Ideal para quien ya quiere hacerlo en serio',
  },
  {
    id: 'PRO',
    color: 'red',
    title: 'PLAN 3 — PRO AUTOMOTORA',
    subtitle: 'Online + presencial mensual',
    includes: [
      'Todo lo anterior',
      'Kit de limpieza profesional (microfibra, shampoo, productos pro)',
      'Scanner LAUNCH con precio preferencial',
      'Contactos reales (créditos, leasing, financiamiento)',
      'Acceso a info de remates',
      'Módulos avanzados: escalar como automotora, operar con stock físico, delegar y crecer',
      'Mentorías grupales presenciales mensuales',
    ],
    idealFor: 'Ideal para quien quiere vivir de esto y escalar',
  },
]

