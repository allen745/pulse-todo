# Pulse — ADIT AI&DS Sem-3 Day Planner

**Pulse** is a free, browser-based **college timetable + daily task planner** built for students of **A D Patel Institute of Technology (ADIT)**, **CVM University**, enrolled in **B.Tech. Artificial Intelligence and Data Science (AI&DS) — Semester 3**.

It turns the official **ODD Semester 2026–2027** class timetable into an interactive day-by-day checklist: tick every lecture, lab, and tutorial when you’re done, and add your own personal tasks (homework, revision, submissions) to **any day of the week**.

> Live app: **[https://pulse-todo-xi.vercel.app](https://pulse-todo-xi.vercel.app)**  
> Repository: **[https://github.com/allen745/pulse-todo](https://github.com/allen745/pulse-todo)**

---

## Why Pulse exists

Paper timetables and random note apps don’t mix well. Pulse was built so an AI&DS Sem-3 student can open one clean page and immediately see:

1. **Today’s systematic college schedule** (times, subject codes, faculty, rooms, lab batches)
2. **Checkbox tracking** for each class — mark attendance / completion as the day goes
3. **Custom daily tasks** layered on top of the timetable (assignments, study blocks, reminders)
4. **Week rhythm** from Monday through Saturday, with progress at a glance

It is **not** a generic todo list. It is a **timetable-first planner** designed around ADIT’s real Sem-3 AI&DS grid (Div 1 / Room 211, effective from **06/07/2026**).

---

## Who this app is for

- **Primary:** ADIT **B.Tech. AI&DS Semester 3** students (especially **Division 1**)
- **Also useful for:** classmates who want the same Sem-3 ODD 2026–27 timetable as an interactive checklist
- **Lab batches:** filter by **1A12 / 1B12 / 1C12** so concurrent lab slots only show *your* batch

If you’re from another semester or college, you can still use the **custom task** system as a day planner — but the preloaded timetable is specifically for this ADIT AI&DS Sem-3 sheet.

---

## What Pulse does (feature deep-dive)

### 1. Systematic college timetable (Mon–Sat)

The app embeds the official weekly grid:

| Day | What you’ll typically see |
|-----|---------------------------|
| **Monday** | Lectures such as PP, DS, DBMS, PSNM, AICA |
| **Tuesday** | Morning/afternoon **lab splits** (AICA / DBMS by batch) + lectures |
| **Wednesday** | Python labs by batch, DS block, DBMS, ES, PSNM, IKS |
| **Thursday** | DS / AICA lab blocks by batch, PSNM, Python lab (e.g. 1C12) |
| **Friday** | IKS, DS, PSNM, AICA |
| **Saturday** | Free runway for personal tasks / catch-up |

Each class card shows:

- **Time window** (start → end)
- **Subject code** + full subject name
- **Type:** lecture / lab / tutorial / personal task
- **Faculty** (where known)
- **Room** (e.g. 211, IT-3, IT-4, IT-5, IT-6)
- **Batch** for parallel lab slots (1A12 / 1B12 / 1C12)
- A **checkbox** to mark it done

A **Lunch break** marker appears between morning and afternoon blocks (**12:40 – 1:25 pm**), matching the official timetable.

### 2. Daily task system (your own work, any day)

On top of college classes you can **add personal tasks**:

- Assign them to **any weekday** (Mon–Sat)
- Optionally set **from / to** times
- Check them off like classes
- Delete custom tasks when finished for good

Examples: “Finish DBMS lab report”, “Revise trees for DS”, “Submit ES assignment”, “Solve 5 DSA problems”.

### 3. Day-by-day navigation

- Side **day rail** (desktop) / top day pills (mobile)
- Opens on **today** automatically (Sunday maps to Monday)
- Each day shows how many timetable slots you have
- Progress ring + “remaining / done” stats for the selected day
- **Reset checks** for that day if you need a clean slate

### 4. Lab batch filter

Many slots run in parallel for different batches. Use the **Batch** control:

- **All** — see every concurrent lab (useful for overview)
- **1A12 / 1B12 / 1C12** — only your batch’s labs + shared lectures

Your batch choice is remembered in the browser.

### 5. Local persistence (privacy-friendly)

Pulse stores data in **your browser’s `localStorage`**:

- Custom tasks you add
- Checkbox completions (keyed by **ISO week**, so a new week starts fresh)
- Selected lab batch

No account. No backend database. Your checklist stays on that device/browser.

> Tip: clearing site data will wipe saved tasks/completions.

---

## Subjects covered (Sem-3 AI&DS)

| Code | Subject | Typical role in Pulse |
|------|---------|------------------------|
| **PSNM** | Probability, Statistics & Numerical Methods | Lectures / tutorials |
| **PP** | Introduction to Python Programming | Lectures + labs (often labeled PY in labs) |
| **DS** | Data Structures | Lectures, tutorials, lab blocks |
| **DBMS** | Database Management Systems | Lectures + labs |
| **AICA** | Artificial Intelligence Concepts & Applications | Lectures + labs |
| **IKS** | Introduction to Indian Knowledge System | Lectures |
| **ES** | Entrepreneurship Skills | Lectures |

Credit structure in the official sheet follows **L–T–P–C** (Lecture–Tutorial–Practical–Credit). Pulse focuses on **when** and **where** you have to be, not credit math.

---

## How to use Pulse (visitor walkthrough)

1. Open the [live app](https://pulse-todo-xi.vercel.app).
2. Confirm your **Batch** (top right) if you have labs.
3. Pick a **day** from the rail.
4. Work down the **timeline** — tap the checkbox when a class or task is done.
5. Use **+ Add** to attach personal work to that day (or another day from the day dropdown).
6. Watch the **progress ring** fill as you clear the day.
7. Come back tomorrow — checkmarks are tracked **per week**.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Motion | Framer Motion |
| Styling | Custom CSS (timeline layout, no UI kit) |
| Hosting | [Vercel](https://pulse-todo-xi.vercel.app) (Hobby / free) |
| Source | GitHub — [allen745/pulse-todo](https://github.com/allen745/pulse-todo) |

Architecture is intentionally simple:

- `src/data/timetable.ts` — official Sem-3 schedule as structured data
- `src/hooks/useDayPlan.ts` — day state, completions, custom tasks, persistence
- `src/components/*` — day rail, timeline slots, add-task composer
- `src/App.tsx` — layout and day board

---

## Run locally

Requirements: **Node.js** 18+ (recommended) and npm.

```bash
git clone https://github.com/allen745/pulse-todo.git
cd pulse-todo
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with Oxlint |

---

## Project structure

```text
pulse-todo/
├── public/                 # Favicon & static assets
├── src/
│   ├── components/
│   │   ├── AddTaskForm.tsx # Add personal tasks to any day
│   │   ├── DayTabs.tsx     # Mon–Sat navigation rail
│   │   └── PlanItem.tsx    # Class / task row + checkbox
│   ├── data/
│   │   └── timetable.ts    # ADIT AI&DS Sem-3 schedule + helpers
│   ├── hooks/
│   │   └── useDayPlan.ts   # State, filters, localStorage
│   ├── App.tsx             # App shell & day board
│   ├── App.css             # Visual system
│   ├── types.ts            # Shared TypeScript types
│   └── main.tsx            # React entry
├── index.html
├── package.json
└── README.md
```

---

## College / timetable notes

- **Institute:** A D Patel Institute of Technology (ADIT), Charutar Vidya Mandal (CVM) University  
- **Programme:** B.Tech. (Artificial Intelligence and Data Science)  
- **Semester:** 3rd (ODD Semester, Academic Year **2026–2027**)  
- **Division / Room (base):** Div 1 · Room **211** (labs use IT rooms)  
- **Effective from:** **06/07/2026**  
- **Source:** Official printed/digital timetable sheet used to encode `TIMETABLE` in code  

Timetable encoding aims to match the sheet (including multi-batch lab blocks). If your division sheet differs slightly, open an issue or PR on this repo.

---

## Roadmap ideas (not promised)

Possible future upgrades if students want them:

- Export / print a day’s plan
- Sync across devices (optional account)
- Attendance % analytics across the semester
- Editable timetable for other divisions/semesters
- Reminder notifications before the next class

Contributions and ideas are welcome via GitHub Issues / PRs.

---

## Deploy

This project is already deployed on Vercel:

**https://pulse-todo-xi.vercel.app**

To deploy your own fork:

```bash
npm run build
npx vercel --prod
```

Or connect the GitHub repo to Vercel for automatic deploys on every push.

---

## Project links

- **Live Pulse app:** https://pulse-todo-xi.vercel.app  
- **This repository:** https://github.com/allen745/pulse-todo  

---

## License & disclaimer

- Built as a **student utility / portfolio project**.
- The embedded timetable is for **personal academic planning**. Official schedules remain the property of ADIT / CVM University — always verify against the latest notice from the department if something conflicts.
- No warranty; use at your own discretion.

---

## About the author

<p align="center">
  <a href="https://github.com/allen745">
    <img
      src="https://avatars.githubusercontent.com/u/226674447?v=4"
      alt="Allen Stivanson Christian — GitHub profile"
      width="140"
      height="140"
      style="border-radius:50%;"
    />
  </a>
</p>

<p align="center">
  <b>Allen Stivanson Christian</b><br/>
  <a href="https://github.com/allen745">@allen745</a>
</p>

Click the profile picture above to open the GitHub profile: **[https://github.com/allen745](https://github.com/allen745)**

| | |
|---|---|
| **Name** | Allen Stivanson Christian |
| **Role** | AI & ML Engineer · Full Stack Developer · Patent Holder |
| **Location** | Anand, Gujarat, India |
| **Focus** | Python + DSA daily · ML engineering · AI agents · web projects |
| **GitHub** | [github.com/allen745](https://github.com/allen745) |
| **Portfolio** | [portfolio-demo-tan-six.vercel.app](https://portfolio-demo-tan-six.vercel.app/) |
| **LinkedIn** | [linkedin.com/in/allen-christian-708545409](https://www.linkedin.com/in/allen-christian-708545409/) |

Allen builds practical AI and full-stack products while studying and practicing core CS skills every day. **Pulse** is a student-life tool from that work — a systematic ADIT AI&DS Sem-3 timetable plus a per-day task checklist in one place.

Other public work includes portfolio demos, games, and AI experiments on [GitHub @allen745](https://github.com/allen745).

### Connect

- **GitHub:** [https://github.com/allen745](https://github.com/allen745)  
- **Portfolio:** [https://portfolio-demo-tan-six.vercel.app/](https://portfolio-demo-tan-six.vercel.app/)  
- **LinkedIn:** [https://www.linkedin.com/in/allen-christian-708545409/](https://www.linkedin.com/in/allen-christian-708545409/)  
- **Pulse live:** [https://pulse-todo-xi.vercel.app](https://pulse-todo-xi.vercel.app)

---

<p align="center">
  <b>Pulse</b> — move through the week, class by class, task by task.<br/>
  Built for ADIT AI&amp;DS Sem-3
</p>
