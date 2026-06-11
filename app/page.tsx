import Link from 'next/link'
import { TrendingUp, Users, Star, Clock, ArrowRight, Activity } from 'lucide-react'
import { trades } from '@/data/trades'
import { politicians } from '@/data/politicians'
import { insights } from '@/data/insights'
import StatCard from '@/components/StatCard'
import TradeTable from '@/components/TradeTable'
import GoldenTradeCard from '@/components/GoldenTradeCard'
import PartyBadge from '@/components/PartyBadge'
import { formatPerformance, getPerformanceColor, getInitials, getAvatarBgColor, cn } from '@/lib/utils'

export default function DashboardPage() {
  // Stats
  const thisMonthTrades = trades.filter((t) => {
    const d = new Date(t.tradeDate)
    return d >= new Date('2025-01-01')
  }).length

  const activePoliticians = new Set(
    trades
      .filter((t) => new Date(t.tradeDate) >= new Date('2024-06-01'))
      .map((t) => t.politicianId)
  ).size

  const goldenTradeCount = trades.filter((t) => t.isGolden).length

  const avgDisclosureLag = Math.round(
    trades.reduce((sum, t) => sum + t.daysToDisclose, 0) / trades.length
  )

  // Recent trades (last 10 by date)
  const recentTrades = [...trades]
    .sort((a, b) => new Date(b.tradeDate).getTime() - new Date(a.tradeDate).getTime())
    .slice(0, 10)

  // Golden insights
  const goldenInsights = insights.filter((i) => i.type === 'Golden Trade').slice(0, 3)

  // Top politicians by trade count
  const topPoliticians = [...politicians]
    .sort((a, b) => b.totalTrades - a.totalTrades)
    .slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Congressional Intelligence
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 mb-4 leading-tight">
          Track What Politicians Buy{' '}
          <span className="text-amber-400">Before You Do</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          Real-time STOCK Act disclosure tracking for all 535 members of Congress.
          Discover Golden Trades, concentrated sector bets, and bipartisan buying patterns.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/trades"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            View All Trades
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Insights & Reports
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Trades This Year"
          value={String(thisMonthTrades)}
          trend="+12% vs prior year"
          trendDirection="up"
          icon={TrendingUp}
        />
        <StatCard
          label="Active Politicians"
          value={String(activePoliticians)}
          trend="Past 12 months"
          trendDirection="neutral"
          icon={Users}
        />
        <StatCard
          label="Golden Trades"
          value={String(goldenTradeCount)}
          trend="Clustered buys"
          trendDirection="up"
          icon={Star}
          highlight
        />
        <StatCard
          label="Avg Disclosure Lag"
          value={`${avgDisclosureLag}d`}
          trend="STOCK Act: 45d max"
          trendDirection="neutral"
          icon={Clock}
        />
      </div>

      {/* Golden Trades */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h2 className="text-xl font-bold text-slate-100">Latest Golden Trades</h2>
          </div>
          <Link
            href="/reports"
            className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            View all reports
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goldenInsights.map((insight) => (
            <GoldenTradeCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      {/* Recent Trades + Top Politicians */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Trades Table */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-100">Recent Trades</h2>
            <Link
              href="/trades"
              className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <TradeTable trades={recentTrades} compact={false} />
        </div>

        {/* Top Politicians Leaderboard */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-100">Top by Activity</h2>
            <Link
              href="/politicians"
              className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-2">
            {topPoliticians.map((pol, idx) => (
              <Link key={pol.id} href={`/politicians/${pol.id}`}>
                <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-4 hover:border-amber-500/30 hover:bg-[#1e1e2e] transition-all flex items-center gap-3">
                  {/* Rank */}
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                  </div>

                  {/* Avatar */}
                  <div
                    className={cn(
                      'w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0',
                      getAvatarBgColor(pol.party)
                    )}
                  >
                    {getInitials(pol.name)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-slate-200 truncate">
                        {pol.name}
                      </span>
                      <PartyBadge party={pol.party} />
                    </div>
                    <div className="text-xs text-slate-500">{pol.state} · {pol.chamber}</div>
                  </div>

                  {/* Trades count */}
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold text-slate-100">{pol.totalTrades}</div>
                    <div className="text-xs text-slate-500">trades</div>
                  </div>

                  {/* Performance */}
                  <div className={cn('text-right shrink-0 hidden sm:block', getPerformanceColor(pol.performanceVsSpx))}>
                    <div className="text-sm font-bold">{formatPerformance(pol.performanceVsSpx)}</div>
                    <div className="text-xs text-slate-500">vs SPX</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
