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
            Hi, I’m Ariza — a backend-focused software developer who enjoys building reliable and efficient systems.

          I primarily work with the .NET ecosystem, where I spend most of my time developing APIs, handling data with relational databases, and making sure everything runs smoothly behind the scenes. I like clean architecture, practical solutions, and writing code that’s easy to maintain in the long run.

          Recently, I’ve also been diving deeper into IT security. For me, building an application isn’t just about making it work—it also needs to be secure and resilient. That’s why I’m interested in areas like system monitoring, threat detection, and overall application security.

          <p> Outside of day-to-day development, I enjoy exploring new technologies, improving my problem-solving skills, and working on side projects that challenge me to think differently.

        At the end of the day, I just like building things that are useful, stable, and make life a little easier.
          </p></p>
            {/* ← Ceritakan latar belakang, pengalaman, atau hal menarik tentang kamu */}
      
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
            {['.NET', 'SQL Server', 'Razor', 'C#',
              'JavaScript', 'TypeScript', 'React', 'Node.js',
              'Python', 'HTML/CSS', 'Git', 'SQL',
              'REST APIs', 'Docker'
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
