export interface ExamEntry {
  srNo: number
  code: string
  subject: string
  date: string // ISO yyyy-mm-dd for sorting
  displayDate: string // dd-mm-yyyy for display
  time: string
  weekday: string
  startMinutes: number
}

type RawExam = Omit<ExamEntry, 'weekday' | 'startMinutes'>

function parseClockToMinutes(clock: string): number {
  const match = clock.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return 0
  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return hours * 60 + minutes
}

/** Minutes from midnight for the exam start (handles "11:30 AM TO 12:30 PM"). */
export function examStartMinutes(time: string): number {
  const start = time.split(/\s+to\s+/i)[0]?.trim() ?? time
  return parseClockToMinutes(start)
}

export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function weekdayFromIso(iso: string): string {
  return parseIsoDate(iso).toLocaleDateString('en-GB', { weekday: 'long' })
}

function hydrate(exam: RawExam): ExamEntry {
  return {
    ...exam,
    weekday: weekdayFromIso(exam.date),
    startMinutes: examStartMinutes(exam.time),
  }
}

// Internal exam schedule — Artificial Intelligence (AI) and Data Science (Sem 3 / Div 12)
// Source: official internal exam datesheet. Years written as "206" on the sheet are 2026.
const RAW_EXAMS: RawExam[] = [
  {
    srNo: 1,
    code: '102120301',
    subject: 'Artificial Intelligence Concepts and Applications',
    date: '2026-08-24',
    displayDate: '24-08-2026',
    time: '03:30 PM TO 04:30 PM',
  },
  {
    srNo: 2,
    code: '102040304',
    subject: 'Data Structures',
    date: '2026-08-25',
    displayDate: '25-08-2026',
    time: '11:30 AM TO 12:30 PM',
  },
  {
    srNo: 3,
    code: '102040305',
    subject: 'Database Management Systems',
    date: '2026-08-27',
    displayDate: '27-08-2026',
    time: '03:30 PM TO 04:30 PM',
  },
  {
    srNo: 4,
    code: '102003407',
    subject: 'Entrepreneurship Skills',
    date: '2026-08-26',
    displayDate: '26-08-2026',
    time: '11:30 AM TO 12:30 PM',
  },
  {
    srNo: 5,
    code: '102003410',
    subject: 'Introduction to Indian Knowledge System',
    date: '2026-08-25',
    displayDate: '25-08-2026',
    time: '03:30 PM TO 04:30 PM',
  },
  {
    srNo: 6,
    code: '102040306',
    subject: 'Introduction to Python Programming',
    date: '2026-08-26',
    displayDate: '26-08-2026',
    time: '03:30 PM TO 04:30 PM',
  },
  {
    srNo: 7,
    code: '102003406',
    subject: 'Probability, Statistics and Numerical Methods',
    date: '2026-08-24',
    displayDate: '24-08-2026',
    time: '11:30 AM TO 12:30 PM',
  },
]

export interface ExamDayGroup {
  date: string
  displayDate: string
  weekday: string
  items: ExamEntry[]
}

function compareExams(a: ExamEntry, b: ExamEntry): number {
  if (a.date !== b.date) return a.date.localeCompare(b.date)
  if (a.startMinutes !== b.startMinutes) return a.startMinutes - b.startMinutes
  return a.srNo - b.srNo
}

// Sorted date-wise, then by start time (AM before PM — not lexicographic strings)
export const EXAMS: ExamEntry[] = RAW_EXAMS.map(hydrate).sort(compareExams)

export function groupExamsByDate(exams: ExamEntry[] = EXAMS): ExamDayGroup[] {
  const map = new Map<string, ExamEntry[]>()
  for (const exam of exams) {
    const arr = map.get(exam.date) ?? []
    arr.push(exam)
    map.set(exam.date, arr)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, items]) => ({
      date,
      displayDate: items[0].displayDate,
      weekday: items[0].weekday,
      items: [...items].sort(compareExams),
    }))
}

export function daysUntil(dateIso: string, from = new Date()): number {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime()
  const target = parseIsoDate(dateIso).getTime()
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

/** Open Exams by default from a week before the first paper through the last paper. */
export function shouldDefaultToExams(from = new Date()): boolean {
  if (EXAMS.length === 0) return false
  const first = EXAMS[0].date
  const last = EXAMS[EXAMS.length - 1].date
  const untilFirst = daysUntil(first, from)
  const untilLast = daysUntil(last, from)
  return untilFirst <= 7 && untilLast >= 0
}

/** Next paper that has not finished yet. */
export function nextExam(from = new Date()): ExamEntry | null {
  const nowMinutes = from.getHours() * 60 + from.getMinutes()
  for (const exam of EXAMS) {
    const diff = daysUntil(exam.date, from)
    if (diff > 0) return exam
    if (diff === 0 && nowMinutes < exam.startMinutes + 60) return exam
  }
  return null
}
