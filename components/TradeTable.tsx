import { Trade } from '@/data/trades'
import TradeRow from './TradeRow'

interface TradeTableProps {
  trades: Trade[]
  compact?: boolean
}

export default function TradeTable({ trades, compact = false }: TradeTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#2a2a3a]">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#2a2a3a] bg-[#13131c]">
            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Politician
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Ticker / Company
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden xl:table-cell">
              Sector
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Amount
            </th>
            {!compact && (
              <>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                  Trade Date
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                  Disclosed
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden 2xl:table-cell">
                  Committees
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="bg-[#1a1a24]">
          {trades.map((trade) => (
            <TradeRow key={trade.id} trade={trade} />
          ))}
          {trades.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                No trades match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
