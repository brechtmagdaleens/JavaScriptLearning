import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  trend?: string
  trendDirection?: 'up' | 'down' | 'neutral'
  icon?: LucideIcon
  highlight?: boolean
}

export default function StatCard({
  label,
  value,
  trend,
  trendDirection = 'neutral',
  icon: Icon,
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-[#1a1a24] border rounded-xl p-5 flex flex-col gap-2',
        highlight ? 'border-amber-500/30 bg-amber-500/5' : 'border-[#2a2a3a]'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        {Icon && (
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', highlight ? 'bg-amber-500/15' : 'bg-slate-800')}>
            <Icon className={cn('w-4 h-4', highlight ? 'text-amber-400' : 'text-slate-400')} />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className={cn('text-3xl font-bold tracking-tight', highlight ? 'text-amber-400' : 'text-slate-100')}>
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              'text-sm font-medium mb-0.5',
              trendDirection === 'up' && 'text-green-400',
              trendDirection === 'down' && 'text-red-400',
              trendDirection === 'neutral' && 'text-slate-400'
            )}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}
