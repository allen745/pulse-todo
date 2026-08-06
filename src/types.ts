export type DayId =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'

export type ItemKind = 'lecture' | 'lab' | 'tutorial' | 'task'

export interface ScheduleTemplate {
  id: string
  day: DayId
  start: string
  end: string
  code: string
  title: string
  faculty: string
  room?: string
  batch?: string
  kind: Exclude<ItemKind, 'task'>
}

export interface CustomTask {
  id: string
  day: DayId
  title: string
  start: string | null
  end: string | null
  createdAt: number
}

export interface DayItem {
  id: string
  day: DayId
  start: string | null
  end: string | null
  code?: string
  title: string
  faculty?: string
  room?: string
  batch?: string
  kind: ItemKind
  completed: boolean
  isCustom: boolean
}

export type Completions = Record<string, boolean>
