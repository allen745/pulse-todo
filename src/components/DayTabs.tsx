import { countDayClasses, DAYS } from '../data/timetable'
import type { DayId } from '../types'

interface DayTabsProps {
  day: DayId
  onChange: (day: DayId) => void
  today: DayId
  batchFilter: string
}

export function DayTabs({ day, onChange, today, batchFilter }: DayTabsProps) {
  return (
    <nav className="day-rail" aria-label="Week days">
      {DAYS.map((d) => {
        const count = countDayClasses(d.id, batchFilter)
        return (
          <button
            key={d.id}
            type="button"
            className={`rail-day${day === d.id ? ' is-active' : ''}${d.id === today ? ' is-today' : ''}`}
            onClick={() => onChange(d.id)}
            aria-current={day === d.id ? 'true' : undefined}
          >
            <span className="rail-short">{d.short}</span>
            <span className="rail-full">{d.label}</span>
            <span className="rail-count">{count === 0 ? 'Free' : `${count}`}</span>
          </button>
        )
      })}
    </nav>
  )
}
