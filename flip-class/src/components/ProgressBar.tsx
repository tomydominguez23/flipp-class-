import { cn } from '../lib/cn'

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('h-2 w-full rounded-full bg-slate-200', className)}>
      <div
        className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
        style={{ width: `${v}%` }}
      />
    </div>
  )
}

