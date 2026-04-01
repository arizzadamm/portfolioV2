import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Article, OpenInNew, CalendarToday, AccessTime } from '@mui/icons-material'
import { colors } from '../../info/Info'
import './BlogPage.scss'

// ══════════════════════════════════════════════════════════════════════════════
// ✏️  EDIT ARTIKEL / WRITEUP KAMU DI SINI
//
//  url: bisa link ke Medium, dev.to, GitHub Gist, atau halaman eksternal
//  readingTime: estimasi menit baca
//  featured: true = tampil lebih besar di atas
// ══════════════════════════════════════════════════════════════════════════════
const articles = [
  {
    id: 1,
    title: 'How I Approached My First CTF: A Beginner\'s Mindset',
    excerpt: 'Cerita tentang pengalaman pertama ikut CTF — apa yang salah, apa yang benar, dan pelajaran berharga yang tidak akan terlupakan.',
    date: '2024-01-15',
    tags: ['CTF', 'Beginner', 'Learning'],
    url: 'https://medium.com/@yourusername/your-article',  // ← ganti
    readingTime: 5,
    featured: true,
  }
]
// ══════════════════════════════════════════════════════════════════════════════

const ALL_TAGS = ['All', ...Array.from(new Set(articles.flatMap(a => a.tags)))]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

function ArticleCard({ article, index, featured }) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`article-card ${featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ y: -5 }}
    >
      {featured && (
        <div className="featured-badge" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
          ⭐ Featured
        </div>
      )}

      <div className="article-tags">
        {article.tags.map(tag => (
          <span key={tag} className="article-tag">{tag}</span>
        ))}
      </div>

      <h3 className="article-title">{article.title}</h3>
      <p className="article-excerpt">{article.excerpt}</p>

      <div className="article-footer">
        <span className="article-meta">
          <CalendarToday fontSize="small" />
          {formatDate(article.date)}
        </span>
        <span className="article-meta">
          <AccessTime fontSize="small" />
          {article.readingTime} min read
        </span>
        <span className="article-read-link" style={{ color: colors[0] }}>
          Read <OpenInNew fontSize="small" />
        </span>
      </div>
    </motion.a>
  )
}

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const filtered = activeTag === 'All'
    ? articles
    : articles.filter(a => a.tags.includes(activeTag))

  const featured = filtered.filter(a => a.featured)
  const rest = filtered.filter(a => !a.featured)
  const visibleRest = showAll ? rest : rest.slice(0, 3)

  return (
    <div className="blog-page">
      <motion.div
        className="blog-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>
          <Article style={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '0.4rem', color: colors[0] }} />
          Blog &{' '}
          <span style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Writeups
          </span>
        </h1>
        <p className="blog-subtitle">
          Artikel, writeup CTF, dan catatan teknis tentang cybersecurity yang saya tulis untuk komunitas.
        </p>
      </motion.div>

      {/* Tag filter */}
      <motion.div
        className="blog-tags"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
            onClick={() => { setActiveTag(tag); setShowAll(false) }}
            style={activeTag === tag ? {
              background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
              color: '#000',
              borderColor: 'transparent'
            } : {}}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Featured */}
          {featured.length > 0 && (
            <div className="featured-grid">
              {featured.map((a, i) => <ArticleCard key={a.id} article={a} index={i} featured />)}
            </div>
          )}

          {/* Rest */}
          {rest.length > 0 && (
            <>
              <div className="articles-grid">
                {visibleRest.map((a, i) => <ArticleCard key={a.id} article={a} index={i} featured={false} />)}
              </div>
              {rest.length > 3 && !showAll && (
                <motion.div className="show-more-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button
                    className="show-more-btn"
                    onClick={() => setShowAll(true)}
                    style={{ borderColor: colors[0], color: colors[0] }}
                  >
                    Show {rest.length - 3} more articles
                  </button>
                </motion.div>
              )}
            </>
          )}

          {filtered.length === 0 && (
            <div className="empty-state">
              <p>Belum ada artikel dengan tag ini.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.p
        className="blog-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        
      </motion.p>
    </div>
  )
}
