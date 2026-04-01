import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Verified, CalendarToday, OpenInNew, WorkspacePremium } from '@mui/icons-material'
import { colors } from '../../info/Info'
import './CertificationsPage.scss'

// ══════════════════════════════════════════════════════════════════════════════
// ✏️  EDIT DATA SERTIFIKASI KAMU DI SINI
// ══════════════════════════════════════════════════════════════════════════════
export const certifications = [
  {
    id: 1,
    name: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    category: 'Offensive Security',
    issued: '2023-06',
    expires: '2026-06',       // null = does not expire
    credlyUrl: 'https://www.credly.com/badges/your-badge-id',
    verifyUrl: null,
    color: '#e63946',
    icon: '🧑‍💻',
    description: 'Covers hacking techniques, tools, and methodologies used by ethical hackers.',
  },
  {
    id: 2,
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    category: 'Fundamentals',
    issued: '2022-09',
    expires: '2025-09',
    credlyUrl: 'https://www.credly.com/badges/your-badge-id',
    verifyUrl: null,
    color: '#e76f51',
    icon: '🛡️',
    description: 'Validates baseline security skills and knowledge required for IT security roles.',
  },
  {
    id: 3,
    name: 'eLearnSecurity Junior Penetration Tester (eJPT)',
    issuer: 'INE Security',
    category: 'Offensive Security',
    issued: '2022-03',
    expires: null,
    credlyUrl: null,
    verifyUrl: 'https://ine.com/verify',
    color: '#2a9d8f',
    icon: '🔍',
    description: 'Entry-level practical certification covering penetration testing fundamentals.',
  },
  {
    id: 4,
    name: 'Google Cybersecurity Certificate',
    issuer: 'Google / Coursera',
    category: 'Fundamentals',
    issued: '2023-01',
    expires: null,
    credlyUrl: 'https://www.credly.com/badges/your-badge-id',
    verifyUrl: null,
    color: '#4285f4',
    icon: '🔐',
    description: 'Hands-on training in cybersecurity fundamentals, tools, and incident response.',
  },
]
// ══════════════════════════════════════════════════════════════════════════════

const CATEGORIES = ['All', ...Array.from(new Set(certifications.map(c => c.category)))]

function getStatus(expires) {
  if (!expires) return { label: 'No Expiry', color: '#64748b', urgent: false }
  const exp = new Date(expires)
  const now = new Date()
  const monthsLeft = (exp - now) / (1000 * 60 * 60 * 24 * 30)
  if (monthsLeft < 0) return { label: 'Expired', color: '#ef4444', urgent: true }
  if (monthsLeft < 3) return { label: `Expires soon`, color: '#f59e0b', urgent: true }
  return { label: `Exp. ${expires}`, color: '#22c55e', urgent: false }
}

function CertCard({ cert, index }) {
  const status = getStatus(cert.expires)

  return (
    <motion.div
      className="cert-card"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      style={{ '--cert-color': cert.color }}
    >
      <div className="cert-card-top">
        <div className="cert-icon" style={{ background: `${cert.color}22`, border: `1.5px solid ${cert.color}44` }}>
          <span>{cert.icon}</span>
        </div>
        <div className="cert-status-badge" style={{ color: status.color, borderColor: `${status.color}55`, background: `${status.color}11` }}>
          {status.urgent && <span className="status-dot" style={{ background: status.color }} />}
          {status.label}
        </div>
      </div>

      <div className="cert-body">
        <h3 className="cert-name">{cert.name}</h3>
        <p className="cert-issuer">
          <Verified fontSize="small" style={{ color: cert.color }} />
          {cert.issuer}
        </p>
        <p className="cert-desc">{cert.description}</p>
      </div>

      <div className="cert-footer">
        <div className="cert-dates">
          <CalendarToday fontSize="small" />
          <span>Issued {cert.issued}</span>
        </div>
        <div className="cert-links">
          {cert.credlyUrl && (
            <a href={cert.credlyUrl} target="_blank" rel="noopener noreferrer" className="cert-link" style={{ color: cert.color }}>
              Credly <OpenInNew fontSize="small" />
            </a>
          )}
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="cert-link" style={{ color: cert.color }}>
              Verify <OpenInNew fontSize="small" />
            </a>
          )}
        </div>
      </div>

      <div className="cert-accent-bar" style={{ background: cert.color }} />
    </motion.div>
  )
}

export default function CertificationsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? certifications
    : certifications.filter(c => c.category === activeCategory)

  const total = certifications.length
  const active = certifications.filter(c => !c.expires || new Date(c.expires) > new Date()).length

  return (
    <div className="certifications-page">
      <motion.div
        className="cert-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>
          <WorkspacePremium style={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '0.4rem', color: colors[0] }} />
          Certifications &{' '}
          <span style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Credentials
          </span>
        </h1>
        <p className="cert-subtitle">
          Verified credentials that back my skills in cybersecurity and information security.
        </p>

        {/* Stats */}
        <div className="cert-stats">
          {[
            { label: 'Total', value: total, color: colors[0] },
            { label: 'Active', value: active, color: '#22c55e' },
            { label: 'Domains', value: CATEGORIES.length - 1, color: colors[1] },
          ].map(s => (
            <div key={s.label} className="stat-pill">
              <span className="stat-value" style={{ color: s.color }}>{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category filter */}
      <motion.div
        className="cert-filters"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            style={activeCategory === cat ? {
              background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
              color: '#000',
              borderColor: 'transparent'
            } : {}}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="cert-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.p
        className="cert-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        ✏️ Edit daftar sertifikasi di <code>src/components/CertificationsPage/CertificationsPage.jsx</code> — cari bagian <code>certifications = [...]</code> di bagian atas file.
      </motion.p>
    </div>
  )
}
