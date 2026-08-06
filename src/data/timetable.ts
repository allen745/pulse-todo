import type { DayId, ScheduleTemplate } from '../types'

export const DAYS: { id: DayId; label: string; short: string }[] = [
  { id: 'monday', label: 'Monday', short: 'Mon' },
  { id: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { id: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { id: 'thursday', label: 'Thursday', short: 'Thu' },
  { id: 'friday', label: 'Friday', short: 'Fri' },
  { id: 'saturday', label: 'Saturday', short: 'Sat' },
]

export const SUBJECTS: Record<string, string> = {
  PSNM: 'Probability, Statistics & Numerical Methods',
  PP: 'Introduction to Python Programming',
  DS: 'Data Structures',
  DBMS: 'Database Management Systems',
  AICA: 'Artificial Intelligence Concepts & Applications',
  IKS: 'Introduction to Indian Knowledge System',
  ES: 'Entrepreneurship Skills',
}

export const FACULTY: Record<string, string> = {
  MBA: 'Prof. Mayur B. Ajmeri',
  JAP: 'Prof. Jitiksha A. Patel',
  HKJ: 'Prof. Himani K. Joshi',
  RBM: 'Prof. Ranna B. Makwana',
  KKP: 'Prof. Kavya Prajapati',
  SRS: 'Faculty (SRS)',
  BP: 'Faculty (BP)',
  MAP: 'Faculty (MAP)',
  KMP: 'Faculty (KMP)',
  RPJ: 'Faculty (RPJ)',
  KAP: 'Faculty (KAP)',
}

/** ADIT AI&DS Sem-3 · Div 1 · Room 211 · Effective 06/07/2026 */
export const TIMETABLE: ScheduleTemplate[] = [
  // ——— Monday ———
  {
    id: 'mon-pp',
    day: 'monday',
    start: '10:00',
    end: '10:50',
    code: 'PP',
    title: SUBJECTS.PP,
    faculty: 'JAP',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'mon-ds',
    day: 'monday',
    start: '10:55',
    end: '11:45',
    code: 'DS',
    title: SUBJECTS.DS,
    faculty: 'HKJ',
    room: '201',
    kind: 'lecture',
  },
  {
    id: 'mon-dbms',
    day: 'monday',
    start: '14:20',
    end: '15:10',
    code: 'DBMS',
    title: SUBJECTS.DBMS,
    faculty: 'RBM',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'mon-psnm',
    day: 'monday',
    start: '15:15',
    end: '16:05',
    code: 'PSNM',
    title: SUBJECTS.PSNM,
    faculty: 'KKP',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'mon-aica',
    day: 'monday',
    start: '16:10',
    end: '17:00',
    code: 'AICA',
    title: SUBJECTS.AICA,
    faculty: 'SRS',
    room: '211',
    kind: 'lecture',
  },

  // ——— Tuesday ———
  {
    id: 'tue-aica-a',
    day: 'tuesday',
    start: '09:05',
    end: '10:50',
    code: 'AICA',
    title: SUBJECTS.AICA,
    faculty: 'RPJ',
    room: 'IT-4',
    batch: '1A12',
    kind: 'lab',
  },
  {
    id: 'tue-aica-b',
    day: 'tuesday',
    start: '09:05',
    end: '10:50',
    code: 'AICA',
    title: SUBJECTS.AICA,
    faculty: 'MAP',
    room: 'IT-4',
    batch: '1B12',
    kind: 'lab',
  },
  {
    id: 'tue-dbms-c',
    day: 'tuesday',
    start: '09:05',
    end: '10:50',
    code: 'DBMS',
    title: SUBJECTS.DBMS,
    faculty: 'RBM',
    room: 'IT-3',
    batch: '1C12',
    kind: 'lab',
  },
  {
    id: 'tue-ds',
    day: 'tuesday',
    start: '10:55',
    end: '11:45',
    code: 'DS',
    title: SUBJECTS.DS,
    faculty: 'HKJ',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'tue-dbms',
    day: 'tuesday',
    start: '11:50',
    end: '12:40',
    code: 'DBMS',
    title: SUBJECTS.DBMS,
    faculty: 'RBM',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'tue-pp',
    day: 'tuesday',
    start: '14:20',
    end: '15:10',
    code: 'PP',
    title: SUBJECTS.PP,
    faculty: 'JAP',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'tue-dbms-lab-a',
    day: 'tuesday',
    start: '15:15',
    end: '17:00',
    code: 'DBMS',
    title: SUBJECTS.DBMS,
    faculty: 'RBM',
    room: 'IT-6',
    batch: '1A12',
    kind: 'lab',
  },
  {
    id: 'tue-dbms-lab-b',
    day: 'tuesday',
    start: '15:15',
    end: '17:00',
    code: 'DBMS',
    title: SUBJECTS.DBMS,
    faculty: 'HKJ',
    room: 'IT-6',
    batch: '1B12',
    kind: 'lab',
  },

  // ——— Wednesday ———
  {
    id: 'wed-py-a',
    day: 'wednesday',
    start: '09:05',
    end: '10:50',
    code: 'PP',
    title: SUBJECTS.PP,
    faculty: 'JAP',
    room: 'IT-5',
    batch: '1A12',
    kind: 'lab',
  },
  {
    id: 'wed-py-b',
    day: 'wednesday',
    start: '09:05',
    end: '10:50',
    code: 'PP',
    title: SUBJECTS.PP,
    faculty: 'KMP',
    room: 'IT-5',
    batch: '1B12',
    kind: 'lab',
  },
  {
    id: 'wed-ds-c',
    day: 'wednesday',
    start: '10:55',
    end: '12:40',
    code: 'DS',
    title: SUBJECTS.DS,
    faculty: 'HKJ',
    room: 'IT-6',
    batch: '1C12',
    kind: 'tutorial',
  },
  {
    id: 'wed-dbms',
    day: 'wednesday',
    start: '13:25',
    end: '14:15',
    code: 'DBMS',
    title: SUBJECTS.DBMS,
    faculty: 'RBM',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'wed-es',
    day: 'wednesday',
    start: '14:20',
    end: '15:10',
    code: 'ES',
    title: SUBJECTS.ES,
    faculty: 'BP',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'wed-psnm',
    day: 'wednesday',
    start: '15:15',
    end: '16:05',
    code: 'PSNM',
    title: SUBJECTS.PSNM,
    faculty: 'KKP',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'wed-iks',
    day: 'wednesday',
    start: '16:10',
    end: '17:00',
    code: 'IKS',
    title: SUBJECTS.IKS,
    faculty: 'BP',
    room: '211',
    kind: 'lecture',
  },

  // ——— Thursday ———
  {
    id: 'thu-ds-a',
    day: 'thursday',
    start: '10:55',
    end: '12:40',
    code: 'DS',
    title: SUBJECTS.DS,
    faculty: 'KAP',
    room: 'IT-3',
    batch: '1A12',
    kind: 'lab',
  },
  {
    id: 'thu-ds-b',
    day: 'thursday',
    start: '10:55',
    end: '12:40',
    code: 'DS',
    title: SUBJECTS.DS,
    faculty: 'HKJ',
    room: 'IT-3',
    batch: '1B12',
    kind: 'lab',
  },
  {
    id: 'thu-aica-c',
    day: 'thursday',
    start: '10:55',
    end: '12:40',
    code: 'AICA',
    title: SUBJECTS.AICA,
    faculty: 'MBA',
    room: 'IT-5',
    batch: '1C12',
    kind: 'lab',
  },
  {
    id: 'thu-psnm',
    day: 'thursday',
    start: '13:25',
    end: '14:15',
    code: 'PSNM',
    title: SUBJECTS.PSNM,
    faculty: 'KKP',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'thu-py-c',
    day: 'thursday',
    start: '15:15',
    end: '17:00',
    code: 'PP',
    title: SUBJECTS.PP,
    faculty: 'JAP',
    room: 'IT-5',
    batch: '1C12',
    kind: 'lab',
  },

  // ——— Friday ———
  {
    id: 'fri-iks',
    day: 'friday',
    start: '09:05',
    end: '09:55',
    code: 'IKS',
    title: SUBJECTS.IKS,
    faculty: 'BP',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'fri-ds',
    day: 'friday',
    start: '10:00',
    end: '10:50',
    code: 'DS',
    title: SUBJECTS.DS,
    faculty: 'HKJ',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'fri-psnm',
    day: 'friday',
    start: '11:50',
    end: '12:40',
    code: 'PSNM',
    title: SUBJECTS.PSNM,
    faculty: 'KKP',
    room: '211',
    kind: 'lecture',
  },
  {
    id: 'fri-aica',
    day: 'friday',
    start: '13:25',
    end: '14:15',
    code: 'AICA',
    title: SUBJECTS.AICA,
    faculty: 'SRS',
    room: '211',
    kind: 'lecture',
  },
]

export function getTodayDayId(): DayId {
  const map: DayId[] = [
    'monday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  return map[new Date().getDay()]
}

export function getWeekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`
}

export function formatTime(t: string): string {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hr = h % 12 || 12
  return `${hr}:${String(m).padStart(2, '0')} ${ampm}`
}

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function countDayClasses(day: DayId, batchFilter: string): number {
  return TIMETABLE.filter((c) => {
    if (c.day !== day) return false
    if (batchFilter === 'all' || !c.batch) return true
    return c.batch === batchFilter
  }).length
}
