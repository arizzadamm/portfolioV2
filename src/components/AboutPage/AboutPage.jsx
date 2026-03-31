import React from 'react'
import { motion } from 'framer-motion'
import info, { colors } from '../../info/Info'
import './AboutPage.scss'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <motion.h1
        className="page-title"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        About <span style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Me</span>
      </motion.h1>

      <div className="about-grid">
        {/* Bio section */}
        <motion.div
          className="about-bio"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h2>Who am I?</h2>
          <p>
            Hi! I'm <strong>{info.firstName} {info.lastName}</strong>, {info.position}.
            {/* ← Tambah deskripsi dirimu di sini */}
            I'm passionate about building clean, user-friendly applications and love turning ideas into reality through code.
          </p>
          <p>
            {/* ← Ceritakan latar belakang, pengalaman, atau hal menarik tentang kamu */}
            Feel free to update this section in <code>AboutPage.jsx</code> with your own story!
          </p>
        </motion.div>

        {/* Hobbies */}
        <motion.div
          className="about-hobbies"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h2>What I enjoy</h2>
          <ul className="hobbies-list">
            {info.hobbies.map((hobby, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.05, x: 6 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="hobby-emoji">{hobby.emoji}</span>
                <span>{hobby.label}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Skills */}
        <motion.div
          className="about-skills"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h2>Tech I work with</h2>
          {/* ← Sesuaikan skill kamu di sini */}
          <div className="skills-grid">
            {[
              'JavaScript', 'TypeScript', 'React', 'Node.js',
              'Python', 'HTML/CSS', 'Git', 'SQL',
              'REST APIs', 'Docker', 'Figma', 'Next.js'
            ].map((skill, i) => (
              <motion.span
                key={i}
                className="skill-badge"
                style={{ borderColor: i % 2 === 0 ? colors[0] : colors[1] }}
                whileHover={{ scale: 1.08 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
