import { Star, TrendingUp, AlertCircle, BarChart2 } from 'lucide-react'
import { insights } from '@/data/insights'
import { trades } from '@/data/trades'
import InsightCard from '@/components/InsightCard'
import GoldenTradeCard from '@/components/GoldenTradeCard'
import { getInsightTypeColor, cn } from '@/lib/utils'

// Sector concentration data
const sectorData = [
  { sector: 'Technology', trades: 32, politicians: 14, topTicker: 'NVDA', color: 'bg-blue-500' },
  { sector: 'Defense', trades: 14, politicians: 6, topTicker: 'LMT', color: 'bg-red-500' },
  { sector: 'Finance', trades: 11, politicians: 7, topTicker: 'JPM', color: 'bg-green-500' },
  { sector: 'Cybersecurity', trades: 7, politicians: 5, topTicker: 'CRWD', color: 'bg-purple-500' },
  { sector: 'Energy', trades: 6, politicians: 4, topTicker: 'XOM', color: 'bg-amber-500' },
  { sector: 'Healthcare', trades: 3, politicians: 3, topTicker: 'UNH', color: 'bg-pink-500' },
  { sector: 'Index Funds', trades: 2, politicians: 2, topTicker: 'SPY', color: 'bg-slate-500' },
]

const maxTrades = Math.max(...sectorData.map((s) => s.trades))

export default function ReportsPage() {
  const goldenInsights = insights.filter((i) => i.type === 'Golden Trade')
  const otherInsights = insights.filter((i) => i.type !== 'Golden Trade')
  const multiPolBuys = insights.filter((i) => i.politicians.length >= 3)
  const alertInsights = insights.filter((i) => i.type === 'Alert')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Insights & Reports</h1>
        <p className="text-slate-400">
          Curated intelligence on Congressional trading patterns, clustered buys, and Golden Trades.
        </p>
      </div>

      {/* Featured Alert Banner */}
      {alertInsights[0] && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Alert</span>
              {alertInsights[0].ticker && (
                <span className="font-mono font-bold text-red-300 text-sm">
                  {alertInsights[0].ticker}
                </span>
              )}
            </div>
            <p className="text-sm text-red-200 font-medium">{alertInsights[0].title}</p>
            <p className="text-xs text-red-300/70 mt-0.5 line-clamp-2">
              {alertInsights[0].description}
            </p>
          </div>
        </div>
      )}

      {/* Golden Trades Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <h2 className="text-xl font-bold text-slate-100">Golden Trades</h2>
          <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium ml-1">
            {goldenInsights.length} active
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goldenInsights.map((insight) => (
            <GoldenTradeCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      {/* Sector Concentration Heatmap */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold text-slate-100">Sector Concentration</h2>
        </div>
        <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-0 border-b border-[#2a2a3a] bg-[#13131c] px-4 py-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sector</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Activity</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Trades</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Politicians</span>
          </div>
          {sectorData.map((row, idx) => (
            <div
              key={row.sector}
              className={cn(
                'grid grid-cols-4 gap-0 px-4 py-3 items-center border-b border-[#2a2a3a] hover:bg-white/[0.02] transition-colors',
                idx === sectorData.length - 1 && 'border-0'
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn('w-2 h-2 rounded-full shrink-0', row.color)} />
                <span className="text-sm font-medium text-slate-200">{row.sector}</span>
                <span className="font-mono text-xs text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                  {row.topTicker}
                </span>
              </div>
              <div className="pr-4">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', row.color)}
                    style={{ width: `${(row.trades / maxTrades) * 100}%`, opacity: 0.7 }}
                  />
                </div>
              </div>
              <div className="text-center">
                <span className="text-base font-bold text-slate-100">{row.trades}</span>
              </div>
              <div className="text-center">
                <span className="text-base font-bold text-slate-100">{row.politicians}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-Politician Buys */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-bold text-slate-100">Concentrated Buys</h2>
          <span className="text-xs text-slate-500 ml-1">3+ politicians in the same stock</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {multiPolBuys.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      {/* All Insights */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl font-bold text-slate-100">All Reports</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>
    </div>
  )
}
