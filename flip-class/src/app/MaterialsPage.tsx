const resources = [
  {
    title: 'Checklist de revisión mecánica básica (TXT)',
    desc: 'Lista rápida para revisar antes de comprar (mínimo viable).',
    href: '/materiales/checklist-revision.txt',
  },
  {
    title: 'Contrato base de consignación (MD)',
    desc: 'Plantilla editable para consignación (borrador, no asesoría legal).',
    href: '/materiales/contrato-consignacion.md',
  },
  {
    title: 'Planilla de margen y ROI (CSV)',
    desc: 'Estructura para calcular margen, gastos ocultos y ROI real.',
    href: '/materiales/planilla-margen.csv',
  },
]

export function MaterialsPage() {
  return (
    <div className="space-y-6">
      <section className="fc-card p-6">
        <h1 className="text-2xl font-bold">Materiales descargables</h1>
        <p className="mt-2 text-white/70">
          Recursos prácticos para aplicar el sistema. Quedan como descarga directa.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {resources.map((r) => (
            <div key={r.href} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="font-semibold">{r.title}</div>
              <div className="mt-2 text-sm text-white/70">{r.desc}</div>
              <a className="fc-btn-primary mt-4 w-full" href={r.href} download>
                Descargar
              </a>
            </div>
          ))}
        </div>
        <div className="mt-5 text-xs text-white/50">
          Nota: estos documentos son plantillas educativas. Ajusta a tu caso y normativa vigente.
        </div>
      </section>
    </div>
  )
}

