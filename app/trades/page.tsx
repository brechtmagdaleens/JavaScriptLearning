'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { trades, Trade } from '@/data/trades'
import TradeTable from '@/components/TradeTable'
import { cn } from '@/lib/utils'

const PARTIES = ['All', 'D', 'R', 'I'] as const
const TRADE_TYPES = ['All', 'Purchase', 'Sale', 'Exchange'] as const
const AMOUNT_RANGES = [
  'All',
  '$1K-$15K',
  '$15K-$50K',
  '$50K-$100K',
  '$100K-$250K',
  '$250K-$500K',
  '$500K-$1M',
  '$1M+',
] as const

type PartyFilter = typeof PARTIES[number]
type TradeTypeFilter = typeof TRADE_TYPES[number]
type AmountFilter = typeof AMOUNT_RANGES[number]

export default function TradesPage() {
  const [search, setSearch] = useState('')
  const [party, setParty] = useState<PartyFilter>('All')
  const [tradeType, setTradeType] = useState<TradeTypeFilter>('All')
  const [amount, setAmount] = useState<AmountFilter>('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filteredTrades = useMemo(() => {
    return trades.filter((t) => {
      // Search
      if (search) {
        const q = search.toLowerCase()
        if (
          !t.ticker.toLowerCase().includes(q) &&
          !t.politicianName.toLowerCase().includes(q) &&
          !t.company.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      // Party
      if (party !== 'All' && t.party !== party) return false
      // Trade type
      if (tradeType !== 'All' && t.tradeType !== tradeType) return false
      // Amount
      if (amount !== 'All' && t.amountRange !== amount) return false
      // Date range
      if (dateFrom && t.tradeDate < dateFrom) return false
      if (dateTo && t.tradeDate > dateTo) return false
      return true
    })
  }, [search, party, tradeType, amount, dateFrom, dateTo])

  const sortedTrades = useMemo(
    () =>
      [...filteredTrades].sort(
        (a, b) => new Date(b.tradeDate).getTime() - new Date(a.tradeDate).getTime()
      ),
    [filteredTrades]
  )

  const hasFilters =
    search || party !== 'All' || tradeType !== 'All' || amount !== 'All' || dateFrom || dateTo

  function clearFilters() {
    setSearch('')
    setParty('All')
    setTradeType('All')
    setAmount('All')
    setDateFrom('')
    setDateTo('')
  }

  const purchaseCount = filteredTrades.filter((t) => t.tradeType === 'Purchase').length
  const saleCount = filteredTrades.filter((t) => t.tradeType === 'Sale').length
  const goldenCount = filteredTrades.filter((t) => t.isGolden).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Trade Feed</h1>
        <p className="text-slate-400">
          All Congressional STOCK Act disclosures. Updated within 45 days of trade date.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-4 mb-4">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search ticker, politician, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#13131c] border border-[#2a2a3a] rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-[#13131c] border border-[#2a2a3a] rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 w-36"
              title="From date"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-[#13131c] border border-[#2a2a3a] rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 w-36"
              title="To date"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4">
          {/* Party */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Party:</span>
            {PARTIES.map((p) => (
              <button
                key={p}
                onClick={() => setParty(p)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all border',
                  party === p
                    ? p === 'D'
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : p === 'R'
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : 'bg-slate-700 text-slate-200 border-slate-600'
                    : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-600 hover:text-slate-400'
                )}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Trade Type */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Type:</span>
            {TRADE_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setTradeType(t)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all border',
                  tradeType === t
                    ? t === 'Purchase'
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : t === 'Sale'
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : 'bg-slate-700 text-slate-200 border-slate-600'
                    : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-600 hover:text-slate-400'
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Amount filter */}
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          <span className="text-xs text-slate-500 font-medium mr-1">Amount:</span>
          {AMOUNT_RANGES.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-medium transition-all border',
                amount === a
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-600 hover:text-slate-400'
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Bar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            <span className="font-bold text-slate-100">{sortedTrades.length}</span> trades
          </span>
          <span className="text-sm text-green-400">
            <span className="font-bold">{purchaseCount}</span> purchases
          </span>
          <span className="text-sm text-red-400">
            <span className="font-bold">{saleCount}</span> sales
          </span>
          <span className="text-sm text-amber-400">
            <span className="font-bold">{goldenCount}</span> golden
          </span>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {/* Trades Table */}
      <TradeTable trades={sortedTrades} />
    </div>
  )
}
