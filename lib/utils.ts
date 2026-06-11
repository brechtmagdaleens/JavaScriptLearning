import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function getPartyColor(party: 'D' | 'R' | 'I'): string {
  switch (party) {
    case 'D':
      return 'text-blue-400'
    case 'R':
      return 'text-red-400'
    case 'I':
      return 'text-purple-400'
  }
}

export function getPartyBgColor(party: 'D' | 'R' | 'I'): string {
  switch (party) {
    case 'D':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'R':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'I':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  }
}

export function getPartyLabel(party: 'D' | 'R' | 'I'): string {
  switch (party) {
    case 'D':
      return 'Democrat'
    case 'R':
      return 'Republican'
    case 'I':
      return 'Independent'
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getAvatarBgColor(party: 'D' | 'R' | 'I'): string {
  switch (party) {
    case 'D':
      return 'bg-blue-600'
    case 'R':
      return 'bg-red-600'
    case 'I':
      return 'bg-purple-600'
  }
}

export function formatPerformance(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export function getPerformanceColor(value: number): string {
  return value >= 0 ? 'text-green-400' : 'text-red-400'
}

export function getInsightTypeColor(type: string): string {
  switch (type) {
    case 'Golden Trade':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'Concentration':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    case 'Sector Trend':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'Alert':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}
