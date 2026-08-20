import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AddTaskForm } from './components/AddTaskForm'
import { DayTabs } from './components/DayTabs'
import { ExamSchedule } from './components/ExamSchedule'
import { PlanItem } from './components/PlanItem'
import { nextExam, shouldDefaultToExams } from './data/exams'
import { DAYS, getTodayDayId, timeToMinutes } from './data/timetable'
import { useDayPlan } from './hooks/useDayPlan'
import './App.css'

const BATCHES = ['all', '1A12', '1B12', '1C12'] as const
const MODE_KEY = 'pulse-view-mode-v1'

type AppMode = 'planner' | 'exams'

function readMode(): AppMode {
  if (typeof window === 'undefined') return 'planner'
  const hash = window.location.hash.replace(/^#/, '')
  if (hash === 'exams' || hash === 'planner') return hash
  try {
    const saved = localStorage.getItem(MODE_KEY)
    if (saved === 'exams' || saved === 'planner') return saved
  } catch {
    // ignore storage errors
  }
  return shouldDefaultToExams() ? 'exams' : 'planner'
}

function ProgressRing({ value, size = 54 }: { value: number; size?: number }) {
  const stroke = 5
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <svg className="ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
      <circle
        className="ring-fill"
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
      />
      <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" className="ring-text">
        {value}%
      </text>
    </svg>
  )
}

export default function App() {
  const [mode, setMode] = useState<AppMode>(readMode)
  const today = getTodayDayId()
  const upcoming = nextExam()

  useEffect(() => {
    try {
      localStorage.setItem(MODE_KEY, mode)
    } catch {
      // ignore storage errors
    }
    const hash = mode === 'exams' ? '#exams' : '#planner'
    if (window.location.hash !== hash) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`)
    }
  }, [mode])
  const {
    day,
    setDay,
    items,
    stats,
    batchFilter,
    setBatchFilter,
    toggle,
    addTask,
    deleteTask,
    resetDay,
  } = useDayPlan()

  const dayLabel = DAYS.find((d) => d.id === day)?.label ?? day
  const showLunch = items.some((i) => i.start && timeToMinutes(i.start) < 12 * 60 + 40)
    && items.some((i) => i.start && timeToMinutes(i.start) >= 13 * 60 + 25)

  const lunchIndex = items.findIndex(
    (i) => i.start && timeToMinutes(i.start) >= 13 * 60 + 25,
  )

  return (
    <div className="app">
      <div className="bg" aria-hidden>
        <div className="bg-band" />
        <div className="bg-noise" />
      </div>

      <div className="frame">
        <header className="topbar">
          <div className="brand-block">
            <p className="brand">Pulse</p>
            <p className="brand-sub">ADIT · AI&amp;DS Sem-3 · Div 1</p>
          </div>
          <div className="top-meta">
            {upcoming && mode === 'planner' && (
              <button
                type="button"
                className="next-exam-chip"
                onClick={() => setMode('exams')}
              >
                Next paper · {upcoming.displayDate} · {upcoming.time.split(/\s+TO\s+/i)[0]}
              </button>
            )}
            {mode === 'planner' && (
              <label className="batch">
                Batch
                <select
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                  aria-label="Lab batch filter"
                >
                  {BATCHES.map((b) => (
                    <option key={b} value={b}>
                      {b === 'all' ? 'All' : b}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {mode === 'planner' && <ProgressRing value={stats.progress} />}
          </div>
        </header>

        <div className="mode-tabs" role="tablist" aria-label="View">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'planner'}
            className={`mode-tab${mode === 'planner' ? ' is-active' : ''}`}
            onClick={() => setMode('planner')}
          >
            Planner
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'exams'}
            className={`mode-tab${mode === 'exams' ? ' is-active' : ''}`}
            onClick={() => setMode('exams')}
          >
            Exams
          </button>
        </div>

        {mode === 'planner' ? (
          <div className="layout">
            <DayTabs day={day} onChange={setDay} today={today} batchFilter={batchFilter} />

            <motion.section
              className="board"
              key={day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="board-head">
                <div>
                  <p className="eyebrow">{day === today ? 'Today' : 'Schedule'}</p>
                  <h1 className="day-title">{dayLabel}</h1>
                  <p className="day-stats">
                    {stats.total === 0
                      ? 'No classes — add your own tasks'
                      : `${stats.open} remaining · ${stats.completed} done`}
                  </p>
                </div>
                {stats.completed > 0 && (
                  <button type="button" className="ghost-btn" onClick={resetDay}>
                    Reset checks
                  </button>
                )}
              </div>

              <AddTaskForm defaultDay={day} onAdd={addTask} />

              {items.length === 0 ? (
                <div className="empty">
                  <p className="empty-title">Open runway</p>
                  <p className="empty-copy">Saturday is free. Drop homework or revision here.</p>
                </div>
              ) : (
                <div className="timeline">
                  <AnimatePresence initial={false} mode="popLayout">
                    {items.map((item, index) => (
                      <div key={item.id} className="timeline-block">
                        {showLunch && index === lunchIndex && (
                          <div className="lunch">
                            <span>Lunch break</span>
                            <span>12:40 – 1:25 pm</span>
                          </div>
                        )}
                        <PlanItem
                          item={item}
                          onToggle={toggle}
                          onDelete={item.isCustom ? deleteTask : undefined}
                        />
                      </div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.section>
          </div>
        ) : (
          <ExamSchedule />
        )}

        <footer className="footer">
          {mode === 'exams' ? (
            <>
              <span>Internal exams · 24–27 Aug 2026</span>
              <span>AI&amp;DS Sem-3 datesheet</span>
            </>
          ) : (
            <>
              <span>Effective 06/07/2026 · Room 211</span>
              <span>Tick a class when you’re done</span>
            </>
          )}
        </footer>
      </div>
    </div>
  )
}
