'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/trades', label: 'Trades' },
  { href: '/politicians', label: 'Politicians' },
  { href: '/reports', label: 'Reports' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#2a2a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/40 rounded-lg flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
              <BarChart3 className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-xl font-bold tracking-wider text-amber-400">
              ALTONEER
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-green-400 tracking-wider">
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
