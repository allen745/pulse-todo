export interface ExamEntry {
  srNo: number
  code: string
  subject: string
  date: string // ISO yyyy-mm-dd for sorting
  displayDate: string // dd-mm-yyyy for display
  time: string
}

// Internal exam schedule — Artificial Intelligence (AI) and Data Science (Sem 3)
// Source: official internal exam datesheet
const RAW_EXAMS: ExamEntry[] = [
  {
    srNo: 1,
    code: '102120301',
    subject: 'Artificial Intelligence Concepts and Applications',
    date: '2026-08-24',
    displayDate: '24-08-2026',
    time: '03:30 PM to 04:30 PM',
  },
  {
    srNo: 2,
    code: '102040304',
    subject: 'Data Structures',
    date: '2026-08-25',
    displayDate: '25-08-2026',
    time: '11:30 AM to 12:30 PM',
  },
  {
    srNo: 3,
    code: '102040305',
    subject: 'Database Management Systems',
    date: '2026-08-27',
    displayDate: '27-08-2026',
    time: '03:30 PM to 04:30 PM',
  },
  {
    srNo: 4,
    code: '102003407',
    subject: 'Entrepreneurship Skills',
    date: '2026-08-26',
    displayDate: '26-08-2026',
    time: '11:30 AM to 12:30 PM',
  },
  {
    srNo: 5,
    code: '102003410',
    subject: 'Introduction to Indian Knowledge System',
    date: '2026-08-25',
    displayDate: '25-08-2026',
    time: '03:30 PM to 04:30 PM',
  },
  {
    srNo: 6,
    code: '102040306',
    subject: 'Introduction to Python Programming',
    date: '2026-08-26',
    displayDate: '26-08-2026',
    time: '03:30 PM to 04:30 PM',
  },
  {
    srNo: 7,
    code: '102003406',
    subject: 'Probability, Statistics and Numerical Methods',
    date: '2026-08-24',
    displayDate: '24-08-2026',
    time: '11:30 AM to 12:30 PM',
  },
]

// Sorted date-wise (and by time within the same date)
export const EXAMS: ExamEntry[] = [...RAW_EXAMS].sort((a, b) => {
  if (a.date !== b.date) return a.date.localeCompare(b.date)
  return a.time.localeCompare(b.time)
})

export function groupExamsByDate(exams: ExamEntry[]): { date: string; displayDate: string; items: ExamEntry[] }[] {
  const map = new Map<string, ExamEntry[]>()
  for (const exam of exams) {
    const arr = map.get(exam.date) ?? []
    arr.push(exam)
    map.set(exam.date, arr)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, items]) => ({ date, displayDate: items[0].displayDate, items }))
}

export function daysUntil(dateIso: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateIso + 'T00:00:00')
  const diffMs = target.getTime() - today.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}
