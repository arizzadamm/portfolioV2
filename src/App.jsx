import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './components/BaseLayout/BaseLayout'
import HomePage from './components/HomePage/HomePage'
import AboutPage from './components/AboutPage/AboutPage'
import PortfolioPage from './components/PortfolioPage/PortfolioPage'
import ContactPage from './components/ContactPage/ContactPage'
import CryptoToolsPage from './components/CryptoToolsPage/CryptoToolsPage'
import CertificationsPage from './components/CertificationsPage/CertificationsPage'
import TimelinePage from './components/TimelinePage/TimelinePage'
import BlogPage from './components/BlogPage/BlogPage'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return JSON.parse(saved)
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="tools" element={<CryptoToolsPage />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
