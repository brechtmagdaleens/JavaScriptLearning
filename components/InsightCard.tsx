import Link from 'next/link'
import { TrendingUp, Users, Calendar } from 'lucide-react'
import { Insight } from '@/data/insights'
import { getInsightTypeColor, formatDate, cn } from '@/lib/utils'

interface InsightCardProps {
  insight: Insight
}

export default function InsightCard({ insight }: InsightCardProps) {
  return (
    <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-5 hover:border-slate-600 transition-all flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={cn(
            'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border shrink-0',
            getInsightTypeColor(insight.type)
          )}
        >
          {insight.type}
        </span>
        {insight.ticker && (
          <span className="font-mono font-bold text-amber-400 text-sm bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
            {insight.ticker}
          </span>
        )}
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-slate-100 text-base mb-2 leading-snug">
        {insight.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
        {insight.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-800/50 rounded-lg p-2.5 border border-slate-700/50">
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500">Politicians</span>
          </div>
          <span className="text-sm font-bold text-slate-200">{insight.politicians.length}</span>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2.5 border border-slate-700/50">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500">Est. Amount</span>
          </div>
          <span className="text-sm font-bold text-slate-200">{insight.totalEstimatedAmount}</span>
        </div>
      </div>

      {/* Performance */}
      {insight.performanceSince && (
        <div className="flex items-center gap-2 mb-3 p-2.5 bg-green-500/10 border border-green-500/20 rounded-lg">
          <TrendingUp className="w-3.5 h-3.5 text-green-400 shrink-0" />
          <span className="text-xs text-slate-400">Return since disclosure:</span>
          <span className="text-sm font-bold text-green-400 ml-auto">{insight.performanceSince}</span>
        </div>
      )}

      {/* Politicians List */}
      <div className="flex flex-wrap gap-1 mb-3">
        {insight.politicians.slice(0, 4).map((name) => (
          <span key={name} className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
            {name.split(' ').pop()}
          </span>
        ))}
        {insight.politicians.length > 4 && (
          <span className="text-xs text-slate-500 px-1 py-0.5">+{insight.politicians.length - 4} more</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1.5 pt-3 border-t border-[#2a2a3a]">
        <Calendar className="w-3 h-3 text-slate-600" />
        <span className="text-xs text-slate-600">{formatDate(insight.publishedDate)}</span>
        <div className="ml-auto flex flex-wrap gap-1">
          {insight.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-slate-600">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
