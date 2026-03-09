import type { PlanId } from './types'

export type Plan = {
  id: PlanId
  color: 'green' | 'blue' | 'red'
  title: string
  subtitle: string
  priceUsd: number
  badge?: string
  includes: string[]
  idealFor: string
}

export const plans: Plan[] = [
  {
    id: 'BASICO',
    color: 'green',
    title: 'Plan Básico',
    subtitle: 'Ideal para iniciar',
    priceUsd: 399,
    includes: [
      'Acceso completo a los módulos online',
      'Clases grabadas y actualizaciones',
      'Material descargable (checklists y planillas)',
      'Acceso a comunidad privada',
    ],
    idealFor: 'Ideal para partir y flippear tu primer auto',
  },
  {
    id: 'HIBRIDO',
    color: 'blue',
    title: 'Plan Híbrido',
    subtitle: 'Mayor frecuencia de clases',
    priceUsd: 699,
    badge: 'Más popular',
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
    title: 'Plan Pro',
    subtitle: 'Cobertura intensiva',
    priceUsd: 1000,
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

