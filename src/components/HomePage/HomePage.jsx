import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import info, { colors } from '../../info/Info'
import './HomePage.scss'

// Try to import self portrait, fallback gracefully
let selfImg
try {
  selfImg = new URL('../../img/self.png', import.meta.url).href
} catch {
  selfImg = null
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
}

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        {/* Text section */}
        <div className="home-text">
          <motion.p
            className="greeting"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            className="name"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {info.firstName} {info.lastName}.
          </motion.h1>

          <motion.h2
            className="role"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            I'm <span style={{ color: colors[1] }}>{info.position}</span>.
          </motion.h2>

          <motion.ul
            className="mini-bio"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            {info.miniBio.map((item, i) => (
              <li key={i}>
                <span>{item.emoji}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="home-cta"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Link to="/portfolio" className="btn-primary">
              View Portfolio
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Portrait */}
        {selfImg && (
          <motion.div
            className="portrait-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div
              className="portrait-ring"
              style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
            >
              <img src={selfImg} alt={`${info.firstName} ${info.lastName}`} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
