import { useEffect, useState, type FormEvent } from 'react'
import { DAYS } from '../data/timetable'
import type { DayId } from '../types'

interface AddTaskFormProps {
  defaultDay: DayId
  onAdd: (title: string, day: DayId, start: string | null, end: string | null) => void
}

export function AddTaskForm({ defaultDay, onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [day, setDay] = useState<DayId>(defaultDay)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setDay(defaultDay)
  }, [defaultDay])

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title, day, start || null, end || null)
    setTitle('')
    setStart('')
    setEnd('')
    setOpen(false)
  }

  return (
    <form className={`composer${open || title ? ' is-open' : ''}`} onSubmit={submit}>
      <div className="composer-row">
        <button
          type="button"
          className="composer-plus"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle task options"
        >
          +
        </button>
        <input
          className="composer-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Add something for this day…"
          aria-label="New task"
          autoComplete="off"
        />
        <button type="submit" className="composer-go" disabled={!title.trim()}>
          Add
        </button>
      </div>

      {(open || title) && (
        <div className="composer-opts">
          <label>
            Day
            <select value={day} onChange={(e) => setDay(e.target.value as DayId)}>
              {DAYS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            From
            <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
          </label>
          <label>
            To
            <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
          </label>
        </div>
      )}
    </form>
  )
}
