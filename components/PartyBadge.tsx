import { cn, getPartyBgColor } from '@/lib/utils'

interface PartyBadgeProps {
  party: 'D' | 'R' | 'I'
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export default function PartyBadge({ party, showLabel = false, size = 'sm' }: PartyBadgeProps) {
  const label = showLabel
    ? party === 'D'
      ? 'Democrat'
      : party === 'R'
      ? 'Republican'
      : 'Independent'
    : party

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded border',
        getPartyBgColor(party),
        size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-sm'
      )}
    >
      {label}
    </span>
  )
}
