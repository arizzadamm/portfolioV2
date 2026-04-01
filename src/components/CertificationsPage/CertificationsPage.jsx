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
    name: 'Spark',
    issuer: 'IBM',
    category: 'Big Data',
    issued: '2019-10',
    expires: null,       // null = does not expire
    credlyUrl: 'https://www.credly.com/badges/2a697f2d-5d5c-4250-9922-ad1809df64f7/linked_in_profile',
    verifyUrl: null,
    color: '#e63946',
    icon: '🧑‍💻',
    description: 'This badge earner has a basic understanding of Spark. The earner can describe Spark, articulate its benefits, and describe how it is used. The individual can also use Resilient Distributed Datasets (RDD) and DataFrames to perform in-memory computing and create applications on top of the Spark built-in libraries',
  },
  {
    id: 2,
    name: 'Big Data Foundations - Level 2',
    issuer: 'IBM',
    category: 'Big Data',
    issued: '2019-10',  
    expires: null,
    credlyUrl: 'https://www.credly.com/badges/e0a1fbf9-0916-4b18-af66-353d0f47a54f/linked_in_profile',
    verifyUrl: null,
    color: '#e76f51',
    icon: '🛡️',
    description: 'This badge earner understands the big data ecosystem and hadoop commands and operations to work with big data. The earner also has foundational knowledge around Spark and its operations including RDDs, DataFrames, and the various libraries associated with the Spark Core (MLlib, Spark SQL, Spark Streaming, GraphX).',
  },
  {
    id: 3,
    name: 'Hadoop Foundations - Level 1',
    issuer: 'IBM',
    category: 'Big Data',
    issued: '2019-10',
    expires: null,
    credlyUrl: 'https://www.credly.com/badges/110ae6c4-8199-433f-99e4-826f789ee456/linked_in_profile',
    verifyUrl: null,
    color: '#2a9d8f',
    icon: '🔍',
    description: 'This badge earner has a basic understanding of Hadoop. The earner can describe what Big Data is and the need for Hadoop to be able to process that data in a timely manner. The individual can describe the Hadoop architecture and how to work with the Hadoop Distributed File System (HDFS) using IBM BigInsights. The earner can also use Hadoop MapReduce to process data and create applications on top of the Hadoop ecosystem.',
  },
  {
    id: 4,
    name: 'Career Essentials in Software Development by Microsoft and LinkedIn',
    issuer: 'Microsoft',
    category: 'software development',
    issued: '2022-01',
    expires: null,
    credlyUrl:null,
    verifyUrl: 'https://www.linkedin.com/learning/certificates/b07a0f6a7e734b742559efa6635c8a5f74f3c4ef37b32859888c67c6ae4d6af9?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B9yLOrKurSOuvA33UwxPLww%3D%3D',
    color: '#4285f4',
    icon: '🔐',
    description: 'This certificate earner has completed the Career Essentials in Software Development learning path, which includes courses on software development fundamentals, programming languages, and best practices. The earner has demonstrated knowledge and skills in software development concepts and is prepared to pursue a career in the field.',
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

     
    </div>
  )
}
