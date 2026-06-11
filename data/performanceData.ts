export interface PerformanceDataPoint {
  month: string
  politician: number
  spx: number
}

// Generic performance data for charts (12 months of monthly returns)
export const defaultPerformanceData: PerformanceDataPoint[] = [
  { month: 'Jun 24', politician: 2.1, spx: 1.8 },
  { month: 'Jul 24', politician: 4.3, spx: 3.2 },
  { month: 'Aug 24', politician: 3.8, spx: 2.9 },
  { month: 'Sep 24', politician: 7.2, spx: 5.4 },
  { month: 'Oct 24', politician: 6.1, spx: 4.8 },
  { month: 'Nov 24', politician: 10.4, spx: 7.6 },
  { month: 'Dec 24', politician: 14.2, spx: 10.1 },
  { month: 'Jan 25', politician: 16.8, spx: 11.4 },
  { month: 'Feb 25', politician: 19.3, spx: 13.2 },
  { month: 'Mar 25', politician: 22.1, spx: 14.9 },
  { month: 'Apr 25', politician: 24.7, spx: 16.3 },
  { month: 'May 25', politician: 28.4, spx: 17.8 },
]

export const performanceDataByPolitician: Record<string, PerformanceDataPoint[]> = {
  'nancy-pelosi': [
    { month: 'Jun 24', politician: 3.2, spx: 1.8 },
    { month: 'Jul 24', politician: 6.1, spx: 3.2 },
    { month: 'Aug 24', politician: 5.9, spx: 2.9 },
    { month: 'Sep 24', politician: 10.4, spx: 5.4 },
    { month: 'Oct 24', politician: 9.8, spx: 4.8 },
    { month: 'Nov 24', politician: 15.3, spx: 7.6 },
    { month: 'Dec 24', politician: 19.7, spx: 10.1 },
    { month: 'Jan 25', politician: 22.4, spx: 11.4 },
    { month: 'Feb 25', politician: 25.1, spx: 13.2 },
    { month: 'Mar 25', politician: 26.8, spx: 14.9 },
    { month: 'Apr 25', politician: 27.9, spx: 16.3 },
    { month: 'May 25', politician: 28.4, spx: 17.8 },
  ],
  'michael-mccaul': [
    { month: 'Jun 24', politician: 2.8, spx: 1.8 },
    { month: 'Jul 24', politician: 5.4, spx: 3.2 },
    { month: 'Aug 24', politician: 4.9, spx: 2.9 },
    { month: 'Sep 24', politician: 8.7, spx: 5.4 },
    { month: 'Oct 24', politician: 8.1, spx: 4.8 },
    { month: 'Nov 24', politician: 12.6, spx: 7.6 },
    { month: 'Dec 24', politician: 16.4, spx: 10.1 },
    { month: 'Jan 25', politician: 18.2, spx: 11.4 },
    { month: 'Feb 25', politician: 20.1, spx: 13.2 },
    { month: 'Mar 25', politician: 21.4, spx: 14.9 },
    { month: 'Apr 25', politician: 21.9, spx: 16.3 },
    { month: 'May 25', politician: 22.1, spx: 17.8 },
  ],
  'greg-gianforte': [
    { month: 'Jun 24', politician: 4.1, spx: 1.8 },
    { month: 'Jul 24', politician: 7.8, spx: 3.2 },
    { month: 'Aug 24', politician: 7.2, spx: 2.9 },
    { month: 'Sep 24', politician: 12.3, spx: 5.4 },
    { month: 'Oct 24', politician: 11.9, spx: 4.8 },
    { month: 'Nov 24', politician: 17.8, spx: 7.6 },
    { month: 'Dec 24', politician: 20.4, spx: 10.1 },
    { month: 'Jan 25', politician: 22.1, spx: 11.4 },
    { month: 'Feb 25', politician: 23.4, spx: 13.2 },
    { month: 'Mar 25', politician: 24.2, spx: 14.9 },
    { month: 'Apr 25', politician: 24.5, spx: 16.3 },
    { month: 'May 25', politician: 24.7, spx: 17.8 },
  ],
  'tommy-tuberville': [
    { month: 'Jun 24', politician: 1.8, spx: 1.8 },
    { month: 'Jul 24', politician: 4.2, spx: 3.2 },
    { month: 'Aug 24', politician: 5.1, spx: 2.9 },
    { month: 'Sep 24', politician: 8.3, spx: 5.4 },
    { month: 'Oct 24', politician: 9.4, spx: 4.8 },
    { month: 'Nov 24', politician: 12.8, spx: 7.6 },
    { month: 'Dec 24', politician: 14.9, spx: 10.1 },
    { month: 'Jan 25', politician: 16.1, spx: 11.4 },
    { month: 'Feb 25', politician: 17.4, spx: 13.2 },
    { month: 'Mar 25', politician: 18.2, spx: 14.9 },
    { month: 'Apr 25', politician: 18.5, spx: 16.3 },
    { month: 'May 25', politician: 18.6, spx: 17.8 },
  ],
  'scott-peters': [
    { month: 'Jun 24', politician: 2.4, spx: 1.8 },
    { month: 'Jul 24', politician: 5.1, spx: 3.2 },
    { month: 'Aug 24', politician: 5.8, spx: 2.9 },
    { month: 'Sep 24', politician: 9.6, spx: 5.4 },
    { month: 'Oct 24', politician: 10.2, spx: 4.8 },
    { month: 'Nov 24', politician: 13.9, spx: 7.6 },
    { month: 'Dec 24', politician: 17.4, spx: 10.1 },
    { month: 'Jan 25', politician: 18.8, spx: 11.4 },
    { month: 'Feb 25', politician: 20.4, spx: 13.2 },
    { month: 'Mar 25', politician: 21.1, spx: 14.9 },
    { month: 'Apr 25', politician: 21.4, spx: 16.3 },
    { month: 'May 25', politician: 21.6, spx: 17.8 },
  ],
  'kevin-hern': [
    { month: 'Jun 24', politician: 2.9, spx: 1.8 },
    { month: 'Jul 24', politician: 5.7, spx: 3.2 },
    { month: 'Aug 24', politician: 6.4, spx: 2.9 },
    { month: 'Sep 24', politician: 10.1, spx: 5.4 },
    { month: 'Oct 24', politician: 10.8, spx: 4.8 },
    { month: 'Nov 24', politician: 14.6, spx: 7.6 },
    { month: 'Dec 24', politician: 16.9, spx: 10.1 },
    { month: 'Jan 25', politician: 17.8, spx: 11.4 },
    { month: 'Feb 25', politician: 18.4, spx: 13.2 },
    { month: 'Mar 25', politician: 19.1, spx: 14.9 },
    { month: 'Apr 25', politician: 19.2, spx: 16.3 },
    { month: 'May 25', politician: 19.3, spx: 17.8 },
  ],
}

export function getPerformanceData(politicianId: string): PerformanceDataPoint[] {
  return performanceDataByPolitician[politicianId] || defaultPerformanceData
}
