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
    title: 'Bachelor of Computer Engineering',
    subtitle: 'Telkom University',   // ← ganti
    description: 'Studi formal di bidang teknik komputer dengan fokus pada Hardware, sistem operasi, dan keamanan informasi.',
    tags: ['Networking', 'Linux', 'Programming'],
  },
  {
    id: 2,
    type: 'work',
    date: '2020',
    title: 'Fullstack Developer @ Maximize Technology',
    subtitle: 'First job',              
    description: 'As a junior .NET developer at PT Maximize Technology, I contributed to the development of a web procurement application for PT Salim Ivomas Pratama Tbk using .NET Core. This involved building an API for the frontend team to consume in developing the I-Catalog mobile application, as well as designing a user-friendly web interface for the client-side applicatio',
    tags: ['CTF', 'Web Exploitation', 'Cryptography'],
  },
  {
    id: 3,
    type: 'work',
    date: '2021',
    title: 'Application Operation & Dotnet Support Developer @ Astra Graphia Information Technology',
    subtitle: 'Second job',
    description: 'in my role as a Non-SAP Application Operation & Dotnet Support Engineer, Im maintaining and supporting the Application Operation Human Resource, Warehouse Management Service, and Procurement Management Service for PT Isuzu Astra Motor Indonesia. I collaborated with the development team to analyze bugs, gather user requirements, and effectively communicate and solve issues for users.',
    tags: ['Operations', '.net Support', 'User Communication'],
  },
  {
    id: 4,
    type: 'work',
    date: '2025-06',
    title: 'IT Security Officer @ Ministry of national development planning (Bappenas)',
    subtitle: 'Current job',
    description: 'As an IT Security Officer at Bappenas, I am responsible for ensuring the security and integrity of the ministry’s information systems. My role involves conducting regular security assessments, implementing security policies and procedures, and collaborating with cross-functional teams to identify and mitigate potential security risks. I also play a key role in incident response and disaster recovery planning to safeguard sensitive data and maintain business continuity.',
    tags: ['Cyber Security', 'CompTIA'],
  }
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
        
      </motion.p>
    </div>
  )
}
