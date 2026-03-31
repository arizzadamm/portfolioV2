import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DarkMode, LightMode, Menu, Close } from '@mui/icons-material'
import info, { colors } from '../../info/Info'
import './NavBar.scss'

export default function NavBar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'home', end: true },
    { to: '/about', label: 'about' },
    { to: '/portfolio', label: 'portfolio' },
    { to: '/contact', label: 'contact' },
  ]

  return (
    <nav className="navbar">
      <motion.div
        className="nav-brand"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {info.initials}
        </span>
      </motion.div>

      {/* Desktop nav */}
      <motion.ul
        className="nav-links"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {navLinks.map((link, i) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) => isActive ? 'active' : ''}
              style={({ isActive }) => isActive ? {
                borderBottom: `2px solid ${colors[0]}`
              } : {}}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </motion.ul>

      <motion.button
        className="dark-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {darkMode ? <LightMode /> : <DarkMode />}
      </motion.button>

      {/* Mobile hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        {menuOpen ? <Close /> : <Menu />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {link.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </nav>
  )
}
