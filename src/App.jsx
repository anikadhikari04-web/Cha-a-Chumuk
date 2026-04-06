import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import PhotosPage from './pages/PhotosPage'
import ReviewsPage from './pages/ReviewsPage'
import ContactPage from './pages/ContactPage'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function App() {
  const [language, setLanguage] = useState('bn')
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('theme-mode') || 'system')

  useEffect(() => {
    const apply = (mode) => {
      const resolved = mode === 'system' ? getSystemTheme() : mode
      document.documentElement.setAttribute('data-theme', resolved)
    }
    apply(themeMode)
    localStorage.setItem('theme-mode', themeMode)

    if (themeMode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: light)')
      const handler = () => apply('system')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [themeMode])

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="floating-orb blob-purple w-96 h-96 top-20 -left-48 animate-float" />
        <div className="floating-orb blob-gold w-80 h-80 top-1/2 -right-40 animate-float-slow" />
        <div className="floating-orb blob-purple w-64 h-64 bottom-20 left-1/3 animate-float" />
      </div>
      <div className="relative z-10">
        <ScrollToTop />
        <Navbar language={language} setLanguage={setLanguage} themeMode={themeMode} setThemeMode={setThemeMode} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage language={language} />} />
            <Route path="/menu" element={<MenuPage language={language} />} />
            <Route path="/photos" element={<PhotosPage language={language} />} />
            <Route path="/reviews" element={<ReviewsPage language={language} />} />
            <Route path="/contact" element={<ContactPage language={language} />} />
          </Routes>
        </main>
        <Footer language={language} />
      </div>
    </div>
  )
}
