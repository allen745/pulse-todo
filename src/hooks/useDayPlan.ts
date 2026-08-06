import { useCallback, useEffect, useMemo, useState } from 'react'
import { getTodayDayId, getWeekKey, timeToMinutes, TIMETABLE } from '../data/timetable'
import type { Completions, CustomTask, DayId, DayItem } from '../types'

const TASKS_KEY = 'pulse-day-tasks-v1'
const DONE_KEY = 'pulse-day-done-v1'
const BATCH_KEY = 'pulse-batch-filter-v1'

function loadTasks(): CustomTask[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CustomTask[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function loadDone(): Completions {
  try {
    const raw = localStorage.getItem(DONE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Completions
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function loadBatch(): string {
  return localStorage.getItem(BATCH_KEY) ?? 'all'
}

function doneKey(week: string, id: string) {
  return `${week}:${id}`
}

export function useDayPlan() {
  const [day, setDay] = useState<DayId>(getTodayDayId)
  const [tasks, setTasks] = useState<CustomTask[]>(loadTasks)
  const [done, setDone] = useState<Completions>(loadDone)
  const [batchFilter, setBatchFilter] = useState<string>(loadBatch)
  const week = useMemo(() => getWeekKey(), [])

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem(DONE_KEY, JSON.stringify(done))
  }, [done])

  useEffect(() => {
    localStorage.setItem(BATCH_KEY, batchFilter)
  }, [batchFilter])

  const items = useMemo(() => {
    const classes: DayItem[] = TIMETABLE.filter((c) => c.day === day)
      .filter((c) => {
        if (batchFilter === 'all') return true
        if (!c.batch) return true
        return c.batch === batchFilter
      })
      .map((c) => ({
        id: c.id,
        day: c.day,
        start: c.start,
        end: c.end,
        code: c.code,
        title: c.title,
        faculty: c.faculty,
        room: c.room,
        batch: c.batch,
        kind: c.kind,
        completed: !!done[doneKey(week, c.id)],
        isCustom: false,
      }))

    const customs: DayItem[] = tasks
      .filter((t) => t.day === day)
      .map((t) => ({
        id: t.id,
        day: t.day,
        start: t.start,
        end: t.end,
        title: t.title,
        kind: 'task' as const,
        completed: !!done[doneKey(week, t.id)],
        isCustom: true,
      }))

    return [...classes, ...customs].sort((a, b) => {
      if (!a.start && !b.start) return 0
      if (!a.start) return 1
      if (!b.start) return -1
      return timeToMinutes(a.start) - timeToMinutes(b.start)
    })
  }, [day, tasks, done, week, batchFilter])

  const stats = useMemo(() => {
    const total = items.length
    const completed = items.filter((i) => i.completed).length
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, open: total - completed, progress }
  }, [items])

  const weekStats = useMemo(() => {
    const allIds = [
      ...TIMETABLE.map((c) => c.id),
      ...tasks.map((t) => t.id),
    ]
    const completed = allIds.filter((id) => done[doneKey(week, id)]).length
    return { completed, total: allIds.length }
  }, [tasks, done, week])

  const toggle = useCallback(
    (id: string) => {
      const key = doneKey(week, id)
      setDone((prev) => ({ ...prev, [key]: !prev[key] }))
    },
    [week],
  )

  const addTask = useCallback(
    (title: string, targetDay: DayId, start: string | null = null, end: string | null = null) => {
      const trimmed = title.trim()
      if (!trimmed) return
      setTasks((prev) => [
        {
          id: crypto.randomUUID(),
          day: targetDay,
          title: trimmed,
          start,
          end,
          createdAt: Date.now(),
        },
        ...prev,
      ])
    },
    [],
  )

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setDone((prev) => {
      const next = { ...prev }
      for (const key of Object.keys(next)) {
        if (key.endsWith(`:${id}`)) delete next[key]
      }
      return next
    })
  }, [])

  const resetDay = useCallback(() => {
    setDone((prev) => {
      const next = { ...prev }
      for (const item of items) {
        delete next[doneKey(week, item.id)]
      }
      return next
    })
  }, [items, week])

  return {
    day,
    setDay,
    items,
    stats,
    weekStats,
    week,
    batchFilter,
    setBatchFilter,
    toggle,
    addTask,
    deleteTask,
    resetDay,
  }
}
