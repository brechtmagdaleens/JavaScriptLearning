import Link from 'next/link'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { Politician } from '@/data/politicians'
import PartyBadge from './PartyBadge'
import { formatPerformance, getPerformanceColor, getInitials, getAvatarBgColor, cn } from '@/lib/utils'

interface PoliticianCardProps {
  politician: Politician
  rank?: number
}

export default function PoliticianCard({ politician, rank }: PoliticianCardProps) {
  const buyRatio = politician.totalTrades > 0 ? (politician.buyCount / politician.totalTrades) * 100 : 50

  return (
    <Link href={`/politicians/${politician.id}`}>
      <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-5 hover:border-amber-500/30 hover:bg-[#1e1e2e] transition-all cursor-pointer group">
        <div className="flex items-start gap-3 mb-4">
          {/* Rank */}
          {rank && (
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-slate-400">#{rank}</span>
            </div>
          )}

          {/* Avatar */}
          <div
            className={cn(
              'w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm',
              getAvatarBgColor(politician.party)
            )}
          >
            {getInitials(politician.name)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-100 group-hover:text-amber-400 transition-colors text-sm">
                {politician.name}
              </span>
              <PartyBadge party={politician.party} />
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {politician.state} · {politician.chamber}
              {politician.district && ` · ${politician.district}`}
            </div>
          </div>

          {/* Performance */}
          <div className="text-right shrink-0">
            <div className={cn('flex items-center gap-1 justify-end', getPerformanceColor(politician.performanceVsSpx))}>
              {politician.performanceVsSpx >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span className="font-bold text-sm">{formatPerformance(politician.performanceVsSpx)}</span>
            </div>
            <div className="text-xs text-slate-600 mt-0.5">vs S&P 500</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-100">{politician.totalTrades}</div>
            <div className="text-xs text-slate-500">Trades</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{politician.buyCount}</div>
            <div className="text-xs text-slate-500">Buys</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">{politician.sellCount}</div>
            <div className="text-xs text-slate-500">Sells</div>
          </div>
        </div>

        {/* Buy/Sell Ratio Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Buy ratio</span>
            <span>{buyRatio.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
              style={{ width: `${buyRatio}%` }}
            />
          </div>
        </div>

        {/* Sectors */}
        <div className="flex flex-wrap gap-1">
          {politician.topSectors.slice(0, 3).map((sector) => (
            <span
              key={sector}
              className="text-xs bg-slate-800/80 text-slate-400 px-2 py-0.5 rounded border border-slate-700/50"
            >
              {sector}
            </span>
          ))}
        </div>

        {/* Activity indicator */}
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#2a2a3a]">
          <Activity className={cn(
            'w-3 h-3',
            politician.recentActivity === 'High' ? 'text-green-400' :
            politician.recentActivity === 'Medium' ? 'text-amber-400' : 'text-slate-500'
          )} />
          <span className={cn(
            'text-xs font-medium',
            politician.recentActivity === 'High' ? 'text-green-400' :
            politician.recentActivity === 'Medium' ? 'text-amber-400' : 'text-slate-500'
          )}>
            {politician.recentActivity} Activity
          </span>
          <span className="text-xs text-slate-600 ml-auto">{politician.estimatedPortfolioValue}</span>
        </div>
      </div>
    </Link>
  )
}
