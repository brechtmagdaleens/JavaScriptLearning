export interface Insight {
  id: string
  title: string
  description: string
  type: 'Golden Trade' | 'Concentration' | 'Sector Trend' | 'Alert'
  ticker?: string
  company?: string
  politicians: string[]
  totalEstimatedAmount: string
  publishedDate: string
  performanceSince?: string
  tags: string[]
}

export const insights: Insight[] = [
  {
    id: 'i001',
    title: '6 Politicians Bought ServiceNow (NOW) This Quarter',
    description:
      'A striking pattern has emerged: six members of Congress across both parties purchased ServiceNow shares within a 6-week window. The cluster includes members of the Technology, Foreign Affairs, Ways and Means, and Financial Services committees. ServiceNow\'s government cloud business has seen significant contract wins, suggesting possible advance knowledge of procurement decisions.',
    type: 'Golden Trade',
    ticker: 'NOW',
    company: 'ServiceNow Inc.',
    politicians: ['Nancy Pelosi', 'Josh Gottheimer', 'Michael McCaul', 'Kevin Hern', 'Bill Foster', 'Greg Gianforte'],
    totalEstimatedAmount: '$2.1M-$4.5M',
    publishedDate: '2024-05-30',
    performanceSince: '+34.2%',
    tags: ['Technology', 'Government Cloud', 'Enterprise Software', 'Bipartisan'],
  },
  {
    id: 'i002',
    title: 'Defense Sector Surge: 4 Armed Services Members Load Up on LMT',
    description:
      'Four members of the Senate and House Armed Services committees purchased Lockheed Martin shares within days of each other. The coordinated buying preceded a major defense appropriations vote and followed classified briefings on global security threats. Lockheed\'s F-35 program and missile defense systems are positioned to benefit from increased Pentagon spending.',
    type: 'Concentration',
    ticker: 'LMT',
    company: 'Lockheed Martin Corp.',
    politicians: ['Tommy Tuberville', 'Dan Crenshaw', 'Mark Kelly', 'Ro Khanna'],
    totalEstimatedAmount: '$350K-$700K',
    publishedDate: '2024-02-20',
    performanceSince: '+22.8%',
    tags: ['Defense', 'Armed Services', 'Bipartisan', 'Pentagon Spending'],
  },
  {
    id: 'i003',
    title: "Pelosi's AI Play: NVDA Position Builds Ahead of Earnings",
    description:
      'Nancy Pelosi has made two separate NVIDIA purchases totaling over $2M in estimated value. The timing — weeks before NVIDIA\'s blowout earnings — and her husband Paul Pelosi\'s track record of well-timed tech bets has put this trade under the spotlight. NVIDIA\'s AI chip dominance and government contracts with DARPA and NSF provide regulatory insight opportunities.',
    type: 'Golden Trade',
    ticker: 'NVDA',
    company: 'NVIDIA Corporation',
    politicians: ['Nancy Pelosi'],
    totalEstimatedAmount: '$2M-$4M',
    publishedDate: '2025-02-20',
    performanceSince: '+41.6%',
    tags: ['AI', 'Technology', 'Semiconductors', 'High Conviction'],
  },
  {
    id: 'i004',
    title: 'Concentrated MSFT Buys: Bipartisan Consensus on Microsoft',
    description:
      'Microsoft has attracted purchases from 5 politicians across multiple committees. The convergence suggests broad confidence in Microsoft\'s AI integration (Copilot), government cloud contracts (JEDI/Azure), and its dominant position in enterprise software. The Armed Services connection is notable given Microsoft\'s $21.9B Army HoloLens contract.',
    type: 'Concentration',
    ticker: 'MSFT',
    company: 'Microsoft Corporation',
    politicians: ['Nancy Pelosi', 'Josh Gottheimer', 'Mark Kelly', 'Bill Foster', 'Kevin Hern'],
    totalEstimatedAmount: '$1.2M-$2.8M',
    publishedDate: '2024-07-25',
    performanceSince: '+18.4%',
    tags: ['Technology', 'Cloud', 'AI', 'Government Contracts', 'Bipartisan'],
  },
  {
    id: 'i005',
    title: 'Cybersecurity Alert: Congress Loads Up Before Major Legislation',
    description:
      'A cluster of purchases in CRWD (CrowdStrike) and PANW (Palo Alto Networks) has appeared across multiple committee members. The trades came weeks before a significant cybersecurity funding bill markup in the Homeland Security and Foreign Affairs committees. Both companies are positioned as primary beneficiaries of the proposed $2.6B federal cybersecurity investment package.',
    type: 'Alert',
    ticker: 'CRWD',
    company: 'CrowdStrike Holdings',
    politicians: ['Mark Kelly', 'Dan Crenshaw', 'Michael McCaul', 'Scott Peters', 'Bill Foster'],
    totalEstimatedAmount: '$450K-$900K',
    publishedDate: '2025-04-10',
    performanceSince: '+15.3%',
    tags: ['Cybersecurity', 'Homeland Security', 'Federal Contracts', 'Alert'],
  },
  {
    id: 'i006',
    title: 'Banking Committee Members Accumulate JPM and GS',
    description:
      'Members of the Senate Banking Committee — Pat Toomey, Josh Gottheimer, and Beth Van Duyne from Ways and Means — have been systematically accumulating positions in JPMorgan and Goldman Sachs. This follows closed-door hearings on bank stress tests and interest rate policy discussions that remain non-public. The trades suggest insiders expect a more favorable regulatory environment for big banks.',
    type: 'Sector Trend',
    ticker: 'JPM',
    company: 'JPMorgan Chase & Co.',
    politicians: ['Pat Toomey', 'Josh Gottheimer', 'Beth Van Duyne', 'Kevin Hern'],
    totalEstimatedAmount: '$400K-$850K',
    publishedDate: '2024-03-12',
    performanceSince: '+24.1%',
    tags: ['Finance', 'Banking', 'Deregulation', 'Interest Rates'],
  },
  {
    id: 'i007',
    title: 'Energy Sector Rotation: Oil Majors Get Renewed Congressional Interest',
    description:
      'Multiple members serving on energy-relevant committees have been purchasing shares in XOM and CVX following private briefings on LNG export infrastructure. The trades predate formal announcements of expanded permitting for new liquefied natural gas export facilities, suggesting advance knowledge of regulatory changes that would significantly boost Exxon and Chevron revenues.',
    type: 'Sector Trend',
    ticker: 'XOM',
    company: 'Exxon Mobil Corporation',
    politicians: ['Dan Crenshaw', 'Tommy Tuberville', 'Marjorie Taylor Greene'],
    totalEstimatedAmount: '$100K-$250K',
    publishedDate: '2024-07-15',
    performanceSince: '+8.7%',
    tags: ['Energy', 'LNG', 'Oil', 'Permitting'],
  },
  {
    id: 'i008',
    title: 'Silicon Valley Representatives All-In on Arista Networks (ANET)',
    description:
      'Representatives from California\'s tech-heavy districts — Ro Khanna (CA-17, Silicon Valley) and Scott Peters (CA-52) — have both purchased Arista Networks stock. Arista\'s hyperscaler networking equipment is increasingly central to AI data center buildouts for Meta, Microsoft, and Google. The Silicon Valley connection gives these legislators unique insight into enterprise networking demand trends.',
    type: 'Golden Trade',
    ticker: 'ANET',
    company: 'Arista Networks',
    politicians: ['Ro Khanna', 'Scott Peters'],
    totalEstimatedAmount: '$65K-$150K',
    publishedDate: '2024-09-20',
    performanceSince: '+29.5%',
    tags: ['Technology', 'Networking', 'AI Infrastructure', 'Data Centers'],
  },
]
