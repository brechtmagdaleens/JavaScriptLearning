import { notFound } from 'next/navigation'
import { TrendingUp, TrendingDown, Building2, BarChart3, Star } from 'lucide-react'
import { politicians } from '@/data/politicians'
import { trades } from '@/data/trades'
import { getPerformanceData } from '@/data/performanceData'
import TradeTable from '@/components/TradeTable'
import PartyBadge from '@/components/PartyBadge'
import StatCard from '@/components/StatCard'
import PerformanceChart from '@/components/PerformanceChart'
import {
  getInitials,
  getAvatarBgColor,
  formatPerformance,
  getPerformanceColor,
  getPartyLabel,
  cn,
} from '@/lib/utils'

export async function generateStaticParams() {
  return politicians.map((p) => ({ id: p.id }))
}

interface Props {
  params: { id: string }
}

export default function PoliticianProfilePage({ params }: Props) {
  const politician = politicians.find((p) => p.id === params.id)
  if (!politician) notFound()

  const politicianTrades = trades
    .filter((t) => t.politicianId === politician.id)
    .sort((a, b) => new Date(b.tradeDate).getTime() - new Date(a.tradeDate).getTime())

  const performanceData = getPerformanceData(politician.id)
  const goldenTrades = politicianTrades.filter((t) => t.isGolden).length

  // Committee sector mapping
  const committeeSectors: Record<string, string[]> = {
    'Armed Services': ['Defense', 'Aerospace', 'Cybersecurity'],
    'Financial Services': ['Finance', 'Banking', 'Insurance'],
    'Banking Housing and Urban Affairs': ['Finance', 'Real Estate', 'Banking'],
    'Energy and Commerce': ['Energy', 'Healthcare', 'Technology'],
    'Foreign Affairs': ['Defense', 'Technology', 'Finance'],
    'Ways and Means': ['Finance', 'Healthcare', 'Tax Policy'],
    'Oversight and Accountability': ['Government Services', 'Technology'],
    'Science Space and Technology': ['Technology', 'Aerospace', 'Clean Energy'],
    'Homeland Security': ['Cybersecurity', 'Defense', 'Technology'],
  }

  const relevantSectors = politician.committees.flatMap(
    (c) => committeeSectors[c] || []
  )
  const uniqueSectors = Array.from(new Set(relevantSectors)).slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Avatar */}
          <div
            className={cn(
              'w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl shrink-0',
              getAvatarBgColor(politician.party)
            )}
          >
            {getInitials(politician.name)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-slate-100">{politician.name}</h1>
              <PartyBadge party={politician.party} size="md" />
              <span
                className={cn(
                  'text-sm font-semibold px-2.5 py-1 rounded-full',
                  politician.recentActivity === 'High'
                    ? 'bg-green-500/15 text-green-400'
                    : politician.recentActivity === 'Medium'
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'bg-slate-700 text-slate-400'
                )}
              >
                {politician.recentActivity} Activity
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400 mb-3">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {politician.chamber}
              </span>
              <span>{politician.state}{politician.district ? ` · ${politician.district}` : ''}</span>
              <span>{getPartyLabel(politician.party)}</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
              {politician.bio}
            </p>

            {/* Committees */}
            {politician.committees.length > 0 && (
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider mr-2">Committees:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {politician.committees.map((c) => (
                    <span
                      key={c}
                      className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-lg"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {politician.committees.length === 0 && (
              <span className="text-sm text-slate-500 italic">No committee assignments (leadership role)</span>
            )}
          </div>

          {/* Performance */}
          <div className="bg-[#13131c] border border-[#2a2a3a] rounded-xl p-4 text-center shrink-0">
            <div className={cn('flex items-center gap-1.5 justify-center', getPerformanceColor(politician.performanceVsSpx))}>
              {politician.performanceVsSpx >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="text-2xl font-black">
                {formatPerformance(politician.performanceVsSpx)}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1">vs S&P 500</div>
            <div className="text-xs text-slate-600 mt-0.5">12-month return</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Trades"
          value={String(politician.totalTrades)}
          icon={BarChart3}
        />
        <StatCard
          label="Purchases"
          value={String(politician.buyCount)}
          trend={`${((politician.buyCount / politician.totalTrades) * 100).toFixed(0)}% of trades`}
          trendDirection="up"
        />
        <StatCard
          label="Sales"
          value={String(politician.sellCount)}
          trend={`${((politician.sellCount / politician.totalTrades) * 100).toFixed(0)}% of trades`}
          trendDirection="down"
        />
        <StatCard
          label="Golden Trades"
          value={String(goldenTrades)}
          icon={Star}
          highlight
        />
      </div>

      {/* Committee Context */}
      {uniqueSectors.length > 0 && (
        <div className="bg-[#1a1a24] border border-amber-500/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-500/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-400 mb-1">Committee Context</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                {politician.name} sits on the{' '}
                <span className="text-slate-200 font-medium">
                  {politician.committees.join(', ')}
                </span>{' '}
                committee{politician.committees.length > 1 ? 's' : ''}.
                Relevant sectors with potential oversight access:{' '}
                <span className="text-amber-400 font-medium">{uniqueSectors.join(', ')}</span>.
                Trades in these sectors may warrant closer scrutiny.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Portfolio Performance</h2>
              <p className="text-xs text-slate-500 mt-0.5">12-month cumulative return vs S&P 500</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-amber-400 inline-block rounded-full" />
                <span className="text-slate-400">{politician.name.split(' ').pop()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-600 inline-block rounded-full" style={{ backgroundImage: 'linear-gradient(to right, #475569 50%, transparent 50%)', backgroundSize: '6px 2px' }} />
                <span className="text-slate-400">S&P 500</span>
              </div>
            </div>
          </div>
          <PerformanceChart data={performanceData} politicianName={politician.name.split(' ').pop() || politician.name} />
        </div>

        {/* Portfolio Info */}
        <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-5">
          <h2 className="text-lg font-bold text-slate-100 mb-4">Portfolio Profile</h2>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                Est. Portfolio Value
              </div>
              <div className="text-xl font-bold text-amber-400">{politician.estimatedPortfolioValue}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                Top Traded Sectors
              </div>
              <div className="space-y-2">
                {politician.topSectors.map((sector, idx) => (
                  <div key={sector} className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        style={{ width: `${90 - idx * 20}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-24 text-right">{sector}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                Buy / Sell Split
              </div>
              <div className="flex gap-3">
                <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-400">{politician.buyCount}</div>
                  <div className="text-xs text-slate-500">Buys</div>
                </div>
                <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-red-400">{politician.sellCount}</div>
                  <div className="text-xs text-slate-500">Sells</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trade History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-100">
            Trade History
            <span className="ml-2 text-sm font-normal text-slate-500">
              ({politicianTrades.length} trades)
            </span>
          </h2>
        </div>
        <TradeTable trades={politicianTrades} />
      </div>
    </div>
  )
}
