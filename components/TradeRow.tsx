import Link from 'next/link'
import { Star } from 'lucide-react'
import { Trade } from '@/data/trades'
import PartyBadge from './PartyBadge'
import AmountBadge from './AmountBadge'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface TradeRowProps {
  trade: Trade
}

export default function TradeRow({ trade }: TradeRowProps) {
  return (
    <tr className="border-b border-[#2a2a3a] hover:bg-white/[0.02] transition-colors group">
      {/* Politician */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {trade.isGolden && (
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
          )}
          <div>
            <Link
              href={`/politicians/${trade.politicianId}`}
              className="text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              {trade.politicianName}
            </Link>
            <div className="flex items-center gap-1.5 mt-0.5">
              <PartyBadge party={trade.party} />
              <span className="text-xs text-slate-500">{trade.state}</span>
              <span className="text-xs text-slate-600">·</span>
              <span className="text-xs text-slate-500">{trade.chamber}</span>
            </div>
          </div>
        </div>
      </td>

      {/* Ticker */}
      <td className="px-4 py-3">
        <span className="font-mono font-bold text-slate-100 text-sm tracking-wide">
          {trade.ticker}
        </span>
        <div className="text-xs text-slate-500 truncate max-w-[120px]">{trade.company}</div>
      </td>

      {/* Sector */}
      <td className="px-4 py-3 hidden xl:table-cell">
        <span className="text-xs text-slate-400">{trade.sector}</span>
      </td>

      {/* Trade Type */}
      <td className="px-4 py-3">
        <span
          className={cn(
            'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border',
            trade.tradeType === 'Purchase'
              ? 'bg-green-500/15 text-green-400 border-green-500/25'
              : trade.tradeType === 'Sale'
              ? 'bg-red-500/15 text-red-400 border-red-500/25'
              : 'bg-blue-500/15 text-blue-400 border-blue-500/25'
          )}
        >
          {trade.tradeType.toUpperCase()}
        </span>
      </td>

      {/* Amount */}
      <td className="px-4 py-3">
        <AmountBadge amount={trade.amountRange} />
      </td>

      {/* Trade Date */}
      <td className="px-4 py-3 hidden lg:table-cell">
        <span className="text-sm text-slate-300">{formatDate(trade.tradeDate)}</span>
      </td>

      {/* Disclosed */}
      <td className="px-4 py-3 hidden md:table-cell">
        <div>
          <span className="text-sm text-slate-300">{formatDate(trade.disclosureDate)}</span>
          <div>
            <span
              className={cn(
                'text-xs font-medium',
                trade.daysToDisclose > 40 ? 'text-red-400' : trade.daysToDisclose > 30 ? 'text-amber-400' : 'text-slate-500'
              )}
            >
              +{trade.daysToDisclose}d
            </span>
          </div>
        </div>
      </td>

      {/* Committees */}
      <td className="px-4 py-3 hidden 2xl:table-cell">
        <div className="flex flex-wrap gap-1">
          {trade.committees.slice(0, 2).map((c) => (
            <span key={c} className="text-xs bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 truncate max-w-[120px]">
              {c.length > 15 ? c.slice(0, 15) + '…' : c}
            </span>
          ))}
          {trade.committees.length === 0 && (
            <span className="text-xs text-slate-600">—</span>
          )}
        </div>
      </td>
    </tr>
  )
}
