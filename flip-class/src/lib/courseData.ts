import type { CourseModule } from './types'

// Imágenes temporales (Unsplash) relacionadas a autos/negocio.
const imgHero =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80'
const imgDealer =
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80'
const imgInspection =
  'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=80'
const imgAds =
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80'
const imgContracts =
  'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=80'
const imgSocial =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80'

export const COURSE_TITLE = 'FLIP CLASS'
export const COURSE_SUBTITLE =
  'El curso real para aprender a comprar, vender y escalar negocios de autos en Chile'

export const COURSE_HERO_IMAGE = imgHero

export const modules: CourseModule[] = [
  {
    id: 'm1',
    titulo: 'MÓDULO 1 — Fundamentos del Flip de Autos',
    subtitulo: 'Márgenes reales, ROI y criterios por capital',
    descripcion:
      'Construye la base del sistema: detectar margen real, evitar pérdidas por “detalles” y elegir autos según tu capital.',
    imagenUrl: imgDealer,
    lessons: [
      {
        id: 'l1',
        titulo: 'Cómo detectar autos con margen real',
        descripcion:
          'Método práctico para estimar margen: precio mercado vs precio compra, tiempo de venta y ajuste por estado.',
        imagenUrl: imgDealer,
        duracionMin: 18,
      },
      {
        id: 'l2',
        titulo: 'Errores comunes que hacen perder plata',
        descripcion:
          'Los clásicos: “me enamoré del auto”, subestimar papeles, apurar compra por presión y no calcular salida real.',
        imagenUrl: imgInspection,
        duracionMin: 16,
      },
      {
        id: 'l3',
        titulo: 'Cálculo de margen, gastos ocultos y ROI real',
        descripcion:
          'Plantilla mental (y planilla) para incluir transferencia, comisiones, mecánica, detailing, ads y costo de oportunidad.',
        imagenUrl: imgAds,
        duracionMin: 22,
      },
    ],
  },
  {
    id: 'm2',
    titulo: 'MÓDULO 2 — Compra Inteligente',
    subtitulo: 'Dónde buscar, cómo negociar y cuándo NO comprar',
    descripcion:
      'Fuentes de compra, negociación sin quemarte, checklist mecánico básico y criterios de descarte.',
    imagenUrl: imgInspection,
    lessons: [
      {
        id: 'l1',
        titulo: 'Marketplace, portales, contactos y remates',
        descripcion:
          'Pros/cons por canal y cómo armar tu “pipeline” de oportunidades sin perder tiempo.',
        duracionMin: 19,
      },
      {
        id: 'l2',
        titulo: 'Negociación: bajar precio sin regalar credibilidad',
        descripcion:
          'Guión para ofertar, validación de fallas, ancla, y cómo cerrar trato con claridad.',
        duracionMin: 17,
      },
      {
        id: 'l3',
        titulo: 'Checklist de revisión mecánica básica',
        descripcion:
          'Lo mínimo que debes revisar (y pedir) antes de pagar: ruidos, fugas, neumáticos, historial y papeles.',
        duracionMin: 24,
      },
    ],
  },
  {
    id: 'm3',
    titulo: 'MÓDULO 3 — Venta Profesional',
    subtitulo: 'Publicaciones que convierten y cierre de objeciones',
    descripcion:
      'Cómo publicar para vender, fotos y copy, filtros de curiosos, gestión de leads y cierres.',
    imagenUrl: imgDealer,
    lessons: [
      {
        id: 'l1',
        titulo: 'Publicación que sí vende (estructura y checklist)',
        descripcion:
          'Título, gancho, specs, beneficios, transparencia y CTA. Menos texto “relleno”, más claridad.',
        duracionMin: 20,
      },
      {
        id: 'l2',
        titulo: 'Fotos, video y copy que convierten',
        descripcion:
          'Orden de fotos, iluminación, ángulos clave, y un guión de video de 45–60s.',
        duracionMin: 18,
      },
      {
        id: 'l3',
        titulo: 'WhatsApp, filtros y objeciones reales',
        descripcion:
          'Mensajes tipo, preguntas filtro, cómo manejar “¿último precio?” y cómo agendar visitas sin perder tiempo.',
        duracionMin: 21,
      },
    ],
  },
  {
    id: 'm4',
    titulo: 'MÓDULO 4 — Consignación de Vehículos',
    subtitulo: 'Escala sin poner capital',
    descripcion:
      'Captación, contratos, comisiones, protección legal y formatos de consignación.',
    imagenUrl: imgContracts,
    lessons: [
      {
        id: 'l1',
        titulo: 'Cómo captar autos en consignación',
        descripcion:
          'Propuesta de valor, credibilidad, y oferta clara de comisión/servicio para el dueño.',
        duracionMin: 17,
      },
      {
        id: 'l2',
        titulo: 'Contratos, comisiones y protección legal',
        descripcion:
          'Cláusulas clave y prácticas para protegerte en entrega, llaves, multas, y comisión.',
        duracionMin: 25,
      },
      {
        id: 'l3',
        titulo: 'Ingreso físico vs consignación externa',
        descripcion:
          'Ventajas/riesgos de cada modelo y cómo elegir según tu caja, espacio y equipo.',
        duracionMin: 15,
      },
    ],
  },
  {
    id: 'm5',
    titulo: 'MÓDULO 5 — Publicidad & Meta Ads',
    subtitulo: 'Campañas con respaldo real',
    descripcion:
      'Estructuras de campañas, qué funciona y qué NO, presupuestos bajos vs escalables, y anuncios para vender y captar consignación.',
    imagenUrl: imgAds,
    lessons: [
      {
        id: 'l1',
        titulo: 'Estructuras de campañas que usan automotoras reales',
        descripcion:
          'Objetivos, audiencias, creatividades y cómo medir leads de calidad (no solo “mensajes”).',
        duracionMin: 22,
      },
      {
        id: 'l2',
        titulo: 'Presupuestos: bajo vs escalable',
        descripcion:
          'Cómo partir con poco sin “quemar” el anuncio y cómo escalar con control.',
        duracionMin: 16,
      },
      {
        id: 'l3',
        titulo: 'Anuncios para vender autos y captar consignaciones',
        descripcion:
          '2 plantillas de anuncio: venta (stock) y captación (dueños).',
        duracionMin: 19,
      },
    ],
  },
  {
    id: 'm6',
    titulo: 'MÓDULO 6 — Marca Personal & Marketing',
    subtitulo: 'Autoridad que vende (aunque partas de cero)',
    descripcion:
      'Contenido para Instagram/TikTok, construcción de autoridad y posicionamiento como referente local.',
    imagenUrl: imgSocial,
    lessons: [
      {
        id: 'l1',
        titulo: 'Autoridad: cómo construir confianza rápido',
        descripcion:
          'Señales de credibilidad: transparencia, proceso, casos, números y consistencia.',
        duracionMin: 14,
      },
      {
        id: 'l2',
        titulo: 'Contenido que vende (IG/TikTok)',
        descripcion:
          'Ideas de reels, estructura en 3 actos y cómo responder objeciones con contenido.',
        duracionMin: 20,
      },
      {
        id: 'l3',
        titulo: 'Referente local: oferta y narrativa',
        descripcion:
          'Cómo transformarte en “el de los autos” de tu comuna/ciudad con un mensaje simple.',
        duracionMin: 15,
      },
    ],
  },
  {
    id: 'm7',
    titulo: 'MÓDULO 7 — Formalización y Empresa',
    subtitulo: 'Pensar como negocio, no como revendedor',
    descripcion:
      'SPA/EIRL, patente comercial, cuenta bancaria, contratos y facturación. Estructura mínima para operar ordenado.',
    imagenUrl: imgContracts,
    lessons: [
      {
        id: 'l1',
        titulo: 'Crear tu empresa (SPA / EIRL)',
        descripcion: 'Qué cambia al formalizar, y checklist de pasos para dejarlo en regla.',
        duracionMin: 18,
      },
      {
        id: 'l2',
        titulo: 'Patente, cuenta bancaria, contratos y facturación',
        descripcion:
          'Lo básico para operar: documentación, cobros ordenados y contratos para reducir riesgos.',
        duracionMin: 20,
      },
      {
        id: 'l3',
        titulo: 'Operar con proceso (stock, delegar y crecer)',
        descripcion:
          'Principios de operación: pipeline, roles, métricas y estándar mínimo de calidad.',
        duracionMin: 17,
      },
    ],
  },
]

