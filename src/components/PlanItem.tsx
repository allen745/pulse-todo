import { motion } from 'framer-motion'
import { FACULTY, formatTime } from '../data/timetable'
import type { DayItem } from '../types'

interface PlanItemProps {
  item: DayItem
  onToggle: (id: string) => void
  onDelete?: (id: string) => void
}

export function PlanItem({ item, onToggle, onDelete }: PlanItemProps) {
  const facultyName = item.faculty ? FACULTY[item.faculty] ?? item.faculty : null
  const startLabel = item.start ? formatTime(item.start) : '—'
  const endLabel = item.end ? formatTime(item.end) : ''

  return (
    <motion.article
      layout
      className={`slot kind-${item.kind}${item.completed ? ' is-done' : ''}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
    >
      <div className="slot-time" aria-hidden>
        <span className="slot-start">{startLabel}</span>
        {endLabel && <span className="slot-end">{endLabel}</span>}
      </div>

      <button
        type="button"
        className="check"
        onClick={() => onToggle(item.id)}
        aria-label={item.completed ? 'Mark incomplete' : 'Mark complete'}
        aria-pressed={item.completed}
      >
        <span className="check-ring" />
        <svg className="check-mark" viewBox="0 0 16 16" aria-hidden>
          <path
            d="M3.5 8.2 6.4 11l6.1-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="slot-body">
        <div className="slot-head">
          {item.code ? <span className="slot-code">{item.code}</span> : null}
          <span className={`kind-pill kind-${item.kind}`}>
            {item.kind === 'task' ? 'Task' : item.kind}
          </span>
          {item.batch && <span className="batch-pill">{item.batch}</span>}
        </div>
        <h3 className="slot-title">{item.title}</h3>
        <p className="slot-meta">
          {[facultyName, item.room ? `Room ${item.room}` : null].filter(Boolean).join(' · ')}
        </p>
      </div>

      {item.isCustom && onDelete && (
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(item.id)}
          aria-label="Delete task"
        >
          Remove
        </button>
      )}
    </motion.article>
  )
}
