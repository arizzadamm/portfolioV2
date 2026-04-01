import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Timeline, Work, School, EmojiEvents, Security } from '@mui/icons-material'
import { colors } from '../../info/Info'
import './TimelinePage.scss'

// ══════════════════════════════════════════════════════════════════════════════
// ✏️  EDIT PERJALANAN KAMU DI SINI
//     type: 'work' | 'education' | 'cert' | 'achievement'
// ══════════════════════════════════════════════════════════════════════════════
const timelineEvents = [
  {
    id: 1,
    type: 'education',
    date: '2019',
    title: 'Started University',
    subtitle: 'Universitas / Jurusan kamu',   // ← ganti
    description: 'Mulai kuliah dan tertarik dengan dunia teknologi, khususnya keamanan sistem.',
    tags: ['Networking', 'Linux', 'Programming'],
  },
  {
    id: 2,
    type: 'achievement',
    date: '2020',
    title: 'First CTF Competition',
    subtitle: 'Kompetisi pertama',
    description: 'Ikut CTF pertama kali dan mulai serius belajar cybersecurity secara mandiri.',
    tags: ['CTF', 'Web Exploitation', 'Cryptography'],
  },
  {
    id: 3,
    type: 'cert',
    date: '2022-03',
    title: 'eJPT Certified',
    subtitle: 'INE Security',
    description: 'Meraih sertifikasi penetration testing pertama — hands-on lab selama 3 hari.',
    tags: ['Penetration Testing', 'eJPT'],
  },
  {
    id: 4,
    type: 'cert',
    date: '2022-09',
    title: 'CompTIA Security+',
    subtitle: 'CompTIA',
    description: 'Lulus ujian Security+ sebagai fondasi formal di bidang keamanan informasi.',
    tags: ['Security+', 'CompTIA'],
  },
  {
    id: 5,
    type: 'work',
    date: '2023-01',
    title: 'Security Analyst Intern',
    subtitle: 'Nama Perusahaan',              // ← ganti
    description: 'Internship di tim keamanan — monitoring SIEM, incident response, dan vulnerability assessment.',
    tags: ['SOC', 'SIEM', 'Incident Response'],
  },
  {
    id: 6,
    type: 'cert',
    date: '2023-06',
    title: 'CEH Certified',
    subtitle: 'EC-Council',
    description: 'Certified Ethical Hacker — menguasai teknik ethical hacking dan metodologi penetration testing.',
    tags: ['CEH', 'Ethical Hacking'],
  },
  {
    id: 7,
    type: 'work',
    date: '2024',
    title: 'Cybersecurity Engineer',
    subtitle: 'Nama Perusahaan Sekarang',     // ← ganti
    description: 'Full-time di posisi ini — bertanggung jawab atas security assessment, red team exercise, dan policy development.',
    tags: ['Red Team', 'Pentest', 'Security Policy'],
  },
]
// ══════════════════════════════════════════════════════════════════════════════

const TYPE_CONFIG = {
  work:        { icon: <Work />,           color: colors[1],  label: 'Work'        },
  education:   { icon: <School />,         color: '#60a5fa',  label: 'Education'   },
  cert:        { icon: <Security />,       color: colors[0],  label: 'Cert'        },
  achievement: { icon: <EmojiEvents />,    color: '#f59e0b',  label: 'Achievement' },
}

const FILTERS = ['All', 'work', 'education', 'cert', 'achievement']

function TimelineEvent({ event, index, isLast }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = TYPE_CONFIG[event.type]

  return (
    <motion.div
      className={`timeline-event ${expanded ? 'expanded' : ''}`}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: 'easeOut' }}
    >
      {/* Line connector */}
      {!isLast && <div className="timeline-line" style={{ background: `linear-gradient(to bottom, ${cfg.color}88, transparent)` }} />}

      {/* Dot */}
      <div className="timeline-dot" style={{ background: cfg.color, boxShadow: `0 0 0 4px ${cfg.color}33` }}>
        {cfg.icon}
      </div>

      {/* Card */}
      <div className="timeline-card" onClick={() => setExpanded(!expanded)}>
        <div className="tc-header">
          <div className="tc-meta">
            <span className="tc-date">{event.date}</span>
            <span className="tc-type-badge" style={{ color: cfg.color, background: `${cfg.color}18`, borderColor: `${cfg.color}44` }}>
              {cfg.label}
            </span>
          </div>
          <span className="tc-expand-hint">{expanded ? '▲' : '▼'}</span>
        </div>

        <h3 className="tc-title">{event.title}</h3>
        <p className="tc-subtitle">{event.subtitle}</p>

        {expanded && (
          <motion.div
            className="tc-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.25 }}
          >
            <p className="tc-desc">{event.description}</p>
            <div className="tc-tags">
              {event.tags.map(tag => (
                <span key={tag} className="tc-tag" style={{ borderColor: `${cfg.color}55`, color: cfg.color }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function TimelinePage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? timelineEvents
    : timelineEvents.filter(e => e.type === activeFilter)

  return (
    <div className="timeline-page">
      <motion.div
        className="timeline-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>
          <Timeline style={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '0.4rem', color: colors[0] }} />
          My{' '}
          <span style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Journey
          </span>
        </h1>
        <p className="timeline-subtitle">
          Perjalanan dari nol hingga cybersecurity engineer — setiap langkah membentuk cara saya berpikir tentang keamanan.
        </p>
      </motion.div>

      {/* Legend + Filter */}
      <motion.div
        className="timeline-controls"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {FILTERS.map(f => {
          const cfg = f !== 'All' ? TYPE_CONFIG[f] : null
          return (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
              style={activeFilter === f ? {
                background: cfg ? `${cfg.color}22` : `linear-gradient(135deg, ${colors[0]}22, ${colors[1]}22)`,
                borderColor: cfg ? cfg.color : colors[0],
                color: cfg ? cfg.color : colors[0]
              } : {}}
            >
              {cfg && <span className="filter-dot" style={{ background: cfg.color }} />}
              {f === 'All' ? 'All' : TYPE_CONFIG[f].label}
            </button>
          )
        })}
      </motion.div>

      {/* Timeline */}
      <div className="timeline-list">
        {filtered.map((event, i) => (
          <TimelineEvent
            key={event.id}
            event={event}
            index={i}
            isLast={i === filtered.length - 1}
          />
        ))}
      </div>

      <motion.p
        className="timeline-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        ✏️ Edit perjalanan kamu di <code>src/components/TimelinePage/TimelinePage.jsx</code> — cari bagian <code>timelineEvents = [...]</code>.
        Klik setiap card untuk expand detail.
      </motion.p>
    </div>
  )
}
