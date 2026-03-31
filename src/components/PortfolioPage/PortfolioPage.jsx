import React from 'react'
import { motion } from 'framer-motion'
import { GitHub, OpenInNew } from '@mui/icons-material'
import info, { colors } from '../../info/Info'
import './PortfolioPage.scss'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
}

export default function PortfolioPage() {
  return (
    <div className="portfolio-page">
      <motion.h1
        className="page-title"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        My <span style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Portfolio</span>
      </motion.h1>

      <motion.p
        className="portfolio-subtitle"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        A selection of projects I've built and shipped.
      </motion.p>

      <div className="portfolio-grid">
        {info.portfolio.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  // Dynamically import mock images
  let imgSrc = null
  try {
    imgSrc = new URL(`../../img/${project.image}.png`, import.meta.url).href
  } catch {
    imgSrc = null
  }

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
    >
      <div className="project-image">
        {imgSrc ? (
          <img src={imgSrc} alt={project.title} />
        ) : (
          <div className="project-image-placeholder" style={{
            background: `linear-gradient(135deg, ${colors[0]}22, ${colors[1]}22)`
          }}>
            <span>📁</span>
            <p>Add image: src/img/{project.image}.png</p>
          </div>
        )}
      </div>

      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        {/* ← Tambah deskripsi project di Info.js kalau mau */}

        <div className="project-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="link-btn link-live">
              <OpenInNew fontSize="small" />
              Live Demo
            </a>
          )}
          {project.source && (
            <a href={project.source} target="_blank" rel="noopener noreferrer" className="link-btn link-source">
              <GitHub fontSize="small" />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
