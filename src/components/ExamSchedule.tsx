import { motion } from 'framer-motion'
import { daysUntil, EXAMS, groupExamsByDate, nextExam } from '../data/exams'

function CountdownPill({ dateIso }: { dateIso: string }) {
  const diff = daysUntil(dateIso)
  let label = `${diff} days left`
  let tone = 'is-future'

  if (diff < 0) {
    label = 'Done'
    tone = 'is-past'
  } else if (diff === 0) {
    label = 'Today'
    tone = 'is-today'
  } else if (diff === 1) {
    label = 'Tomorrow'
    tone = 'is-soon'
  } else if (diff <= 3) {
    label = `${diff} days left`
    tone = 'is-soon'
  }

  return <span className={`exam-countdown ${tone}`}>{label}</span>
}

export function ExamSchedule() {
  const groups = groupExamsByDate(EXAMS)
  const upcoming = nextExam()

  return (
    <div className="exam-board">
      <div className="exam-board-head">
        <div>
          <p className="eyebrow">Internal exam timetable</p>
          <h1 className="day-title">AI & Data Science</h1>
          <p className="day-stats">
            {EXAMS.length} papers · 24–27 Aug 2026 · sorted date-wise
          </p>
        </div>
      </div>

      <div className="exam-timeline">
        {groups.map((group, gi) => {
          const diff = daysUntil(group.date)
          const isNextDay = upcoming?.date === group.date
          return (
            <motion.div
              key={group.date}
              className={`exam-day-group${diff === 0 ? ' is-today' : ''}${isNextDay ? ' is-next' : ''}${diff < 0 ? ' is-past' : ''}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: gi * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="exam-day-head">
                <div className="exam-day-label">
                  <span className="exam-day-weekday">{group.weekday}</span>
                  <span className="exam-day-date">{group.displayDate}</span>
                </div>
                <CountdownPill dateIso={group.date} />
              </div>

              <div className="exam-cards">
                {group.items.map((exam) => (
                  <div
                    className={`exam-card${upcoming?.code === exam.code ? ' is-next-paper' : ''}`}
                    key={exam.code}
                  >
                    <div className="exam-card-sr">{exam.srNo}</div>
                    <div className="exam-card-body">
                      <p className="exam-card-title">{exam.subject}</p>
                      <p className="exam-card-meta">
                        <span className="exam-code">{exam.code}</span>
                        <span className="exam-dot">·</span>
                        <span>{exam.time}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
