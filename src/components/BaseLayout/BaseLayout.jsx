import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import './BaseLayout.scss'

export default function BaseLayout({ darkMode, setDarkMode }) {
  return (
    <div className={`base-layout ${darkMode ? 'dark' : ''}`}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="page-wrapper">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Built with React + Vite ⚡</p>
      </footer>
    </div>
  )
}
