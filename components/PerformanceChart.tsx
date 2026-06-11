'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { PerformanceDataPoint } from '@/data/performanceData'

interface PerformanceChartProps {
  data: PerformanceDataPoint[]
  politicianName?: string
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a24] border border-[#2a2a3a] rounded-lg p-3 shadow-xl">
        <p className="text-xs text-slate-500 mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-slate-400">{entry.name}:</span>
            <span
              className="text-xs font-bold"
              style={{ color: entry.color }}
            >
              {entry.value >= 0 ? '+' : ''}
              {entry.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function PerformanceChart({ data, politicianName = 'Portfolio' }: PerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#2a2a3a"
          horizontal={true}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={{ stroke: '#2a2a3a' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v >= 0 ? '+' : ''}${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: '12px' }}
          formatter={(value) => (
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>{value}</span>
          )}
        />
        <Line
          type="monotone"
          dataKey="politician"
          name={politicianName}
          stroke="#f59e0b"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4, fill: '#f59e0b', stroke: '#0f0f13', strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="spx"
          name="S&P 500"
          stroke="#475569"
          strokeWidth={1.5}
          dot={false}
          strokeDasharray="4 2"
          activeDot={{ r: 3, fill: '#475569', stroke: '#0f0f13', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
