import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Altoneer — Congressional Trade Tracker',
  description: 'Track what US politicians buy and sell in the stock market. Real-time Congressional trade disclosures, Golden Trades, and investment insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f13] text-slate-100 antialiased min-h-screen">
        <Navbar />
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
        <footer className="border-t border-[#2a2a3a] mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold tracking-wider text-sm">ALTONEER</span>
                <span className="text-slate-600 text-xs">Congressional Trade Tracker</span>
              </div>
              <p className="text-slate-600 text-xs text-center">
                Data sourced from public STOCK Act disclosures. For informational purposes only. Not financial advice.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
