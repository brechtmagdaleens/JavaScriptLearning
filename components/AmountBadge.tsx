import { cn } from '@/lib/utils'

interface AmountBadgeProps {
  amount: string
}

function getAmountLevel(amount: string): 'low' | 'mid' | 'high' | 'vhigh' {
  if (amount === '$1M+') return 'vhigh'
  if (amount === '$500K-$1M' || amount === '$250K-$500K') return 'high'
  if (amount === '$100K-$250K' || amount === '$50K-$100K') return 'mid'
  return 'low'
}

export default function AmountBadge({ amount }: AmountBadgeProps) {
  const level = getAmountLevel(amount)
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium border',
        level === 'vhigh' && 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        level === 'high' && 'bg-orange-500/15 text-orange-300 border-orange-500/25',
        level === 'mid' && 'bg-slate-500/20 text-slate-300 border-slate-500/30',
        level === 'low' && 'bg-slate-600/20 text-slate-400 border-slate-600/30'
      )}
    >
      {amount}
    </span>
  )
}
