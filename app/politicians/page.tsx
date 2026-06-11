'use client'

import { useState, useMemo } from 'react'
import { Search, ArrowUpDown } from 'lucide-react'
import { politicians, Politician } from '@/data/politicians'
import PoliticianCard from '@/components/PoliticianCard'
import { cn } from '@/lib/utils'

type SortKey = 'trades' | 'performance' | 'alpha'
type PartyFilter = 'All' | 'D' | 'R' | 'I'
type ChamberFilter = 'All' | 'House' | 'Senate'

export default function PoliticiansPage() {
  const [search, setSearch] = useState('')
  const [party, setParty] = useState<PartyFilter>('All')
  const [chamber, setChamber] = useState<ChamberFilter>('All')
  const [sortBy, setSortBy] = useState<SortKey>('trades')

  const filtered = useMemo(() => {
    let result = [...politicians]

    // Search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.topSectors.some((s) => s.toLowerCase().includes(q))
      )
    }

    // Party filter
    if (party !== 'All') {
      result = result.filter((p) => p.party === party)
    }

    // Chamber filter
    if (chamber !== 'All') {
      result = result.filter((p) => p.chamber === chamber)
    }

    // Sort
    switch (sortBy) {
      case 'trades':
        result.sort((a, b) => b.totalTrades - a.totalTrades)
        break
      case 'performance':
        result.sort((a, b) => b.performanceVsSpx - a.performanceVsSpx)
        break
      case 'alpha':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [search, party, chamber, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Politicians</h1>
        <p className="text-slate-400">
          Ranked list of Congress members by trading activity and portfolio performance.
        </p>
      </div>

      {/* Filter + Sort Bar */}
      <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, state, or sector..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#13131c] border border-[#2a2a3a] rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Party */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Party:</span>
            {(['All', 'D', 'R', 'I'] as PartyFilter[]).map((p) => (
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

          {/* Chamber */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Chamber:</span>
            {(['All', 'House', 'Senate'] as ChamberFilter[]).map((c) => (
              <button
                key={c}
                onClick={() => setChamber(c)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all border',
                  chamber === c
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-600 hover:text-slate-400'
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium mr-1">Sort:</span>
            {([
              ['trades', 'Trade Count'],
              ['performance', 'Performance'],
              ['alpha', 'Alphabetical'],
            ] as [SortKey, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all border',
                  sortBy === key
                    ? 'bg-slate-700 text-slate-200 border-slate-600'
                    : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-600 hover:text-slate-400'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result count */}
      <div className="mb-4">
        <span className="text-sm text-slate-400">
          Showing <span className="font-bold text-slate-200">{filtered.length}</span> politicians
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((pol, idx) => (
          <PoliticianCard
            key={pol.id}
            politician={pol}
            rank={sortBy === 'trades' || sortBy === 'performance' ? idx + 1 : undefined}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500">
            No politicians match your filters.
          </div>
        )}
      </div>
    </div>
  )
}
