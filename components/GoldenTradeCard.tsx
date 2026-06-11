import { Star, TrendingUp, Users, DollarSign } from 'lucide-react'
import { Insight } from '@/data/insights'
import PartyBadge from './PartyBadge'
import { politicians } from '@/data/politicians'
import { cn } from '@/lib/utils'

interface GoldenTradeCardProps {
  insight: Insight
}

function getPartyForPolitician(name: string): 'D' | 'R' | 'I' {
  const pol = politicians.find((p) => p.name === name)
  return pol?.party ?? 'I'
}

export default function GoldenTradeCard({ insight }: GoldenTradeCardProps) {
  return (
    <div className="bg-[#1a1a24] border-2 border-amber-500/30 rounded-xl p-5 hover:border-amber-500/50 transition-all relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/40 rounded-xl flex items-center justify-center shrink-0">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Golden Trade
            </span>
          </div>
          {insight.ticker && (
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono font-black text-2xl text-amber-400 leading-none">
                {insight.ticker}
              </span>
              <span className="text-sm text-slate-400 truncate">{insight.company}</span>
            </div>
          )}
        </div>
        {insight.performanceSince && (
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-bold text-lg">{insight.performanceSince}</span>
            </div>
            <div className="text-xs text-slate-500">since disclosure</div>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-slate-100 text-base mb-2 leading-snug">
        {insight.title}
      </h3>

      {/* Why it's golden */}
      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {insight.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 bg-amber-500/5 border border-amber-500/15 rounded-lg px-3 py-2">
          <Users className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <div className="text-lg font-bold text-amber-400">{insight.politicians.length}</div>
            <div className="text-xs text-slate-500">Politicians</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/5 border border-amber-500/15 rounded-lg px-3 py-2">
          <DollarSign className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <div className="text-sm font-bold text-amber-400 leading-tight">{insight.totalEstimatedAmount}</div>
            <div className="text-xs text-slate-500">Est. total</div>
          </div>
        </div>
      </div>

      {/* Politicians involved */}
      <div className="mb-3">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Politicians Involved</div>
        <div className="flex flex-wrap gap-1.5">
          {insight.politicians.map((name) => {
            const party = getPartyForPolitician(name)
            return (
              <div key={name} className="flex items-center gap-1 bg-slate-800/60 border border-slate-700/50 rounded-lg px-2 py-1">
                <PartyBadge party={party} />
                <span className="text-xs text-slate-300">{name.split(' ').pop()}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 pt-3 border-t border-amber-500/10">
        {insight.tags.map((tag) => (
          <span key={tag} className="text-xs text-amber-600/70 font-medium">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
