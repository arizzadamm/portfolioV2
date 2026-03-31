import React from 'react'
import { motion } from 'framer-motion'
import { GitHub, LinkedIn, Twitter, Instagram, Email } from '@mui/icons-material'
import info, { colors } from '../../info/Info'
import './ContactPage.scss'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
}

const iconMap = {
  github: <GitHub />,
  linkedin: <LinkedIn />,
  twitter: <Twitter />,
  instagram: <Instagram />,
  email: <Email />,
}

export default function ContactPage() {
  const socialEntries = Object.entries(info.socials)

  return (
    <div className="contact-page">
      <motion.h1
        className="page-title"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        Get in <span style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Touch</span>
      </motion.h1>

      <motion.p
        className="contact-intro"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        I'm always open to new opportunities, collaborations, or just a friendly chat.
        Feel free to reach out through any of the channels below!
      </motion.p>

      <motion.div
        className="socials-grid"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        {socialEntries.map(([platform, url], i) => (
          <motion.a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            style={{
              borderColor: i % 2 === 0 ? `${colors[0]}55` : `${colors[1]}55`
            }}
          >
            <span className="social-icon">{iconMap[platform] ?? <Email />}</span>
            <span className="social-label">{platform}</span>
          </motion.a>
        ))}
      </motion.div>

      <motion.p
        className="contact-note"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        {/* ← Update social links di src/info/Info.js */}
        Add or remove social links in <code>Info.js</code> under the <code>socials</code> key.
      </motion.p>
    </div>
  )
}
