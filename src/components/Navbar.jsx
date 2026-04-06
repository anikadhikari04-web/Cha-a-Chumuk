import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe, Sun, Moon, Monitor } from 'lucide-react'
import logo from '../assets/logo.png'

const navItems = {
  bn: [ { to: '/', label: 'হোম' }, { to: '/menu', label: 'মেনু' }, { to: '/photos', label: 'ফটো' }, { to: '/reviews', label: 'রিভিউ' }, { to: '/contact', label: 'যোগাযোগ' } ],
  en: [ { to: '/', label: 'Home' }, { to: '/menu', label: 'Menu' }, { to: '/photos', label: 'Photos' }, { to: '/reviews', label: 'Reviews' }, { to: '/contact', label: 'Contact' } ],
}

const themeOptions = [
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'system', icon: Monitor, label: 'System' },
]

export default function Navbar({ language, setLanguage, themeMode, setThemeMode }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showTheme, setShowTheme] = useState(false)
  const themeRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    const handler = (e) => { if (themeRef.current && !themeRef.current.contains(e.target)) setShowTheme(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const items = navItems[language]
  const currentThemeIcon = themeOptions.find(t => t.value === themeMode)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{
      background: scrolled ? 'var(--nav-scrolled)' : 'var(--nav-bg)',
      backdropFilter: 'blur(16px)',
      boxShadow: scrolled
        ? '0 4px 20px rgba(0,0,0,0.2), 0 1px 30px var(--nav-glow)'
        : '0 0 20px var(--nav-glow)',
      borderBottom: '1px solid var(--nav-glow-border)',
      padding: scrolled ? '0.35rem 0' : '0.6rem 0',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="Logo" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-purple-500/50 group-hover:border-purple-400 transition-colors" />
          <div>
            <span className="font-bold text-lg leading-tight block font-bengali" style={{ color: 'var(--accent)' }}>চা এ চুমুক</span>
            <span className="text-[10px] block font-bengali" style={{ color: 'var(--text-muted)' }}>ফিউশন রেস্তোরাঁ</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <Link key={item.to} to={item.to}
              className={`px-4 py-2 rounded-full text-sm font-medium font-bengali transition-all duration-300 ${
                location.pathname === item.to
                  ? 'text-white shadow-lg'
                  : 'hover:opacity-80'
              }`}
              style={location.pathname === item.to
                ? { background: 'var(--accent)', color: 'var(--bg-primary)', boxShadow: `0 4px 15px var(--accent-shadow)` }
                : { color: 'var(--text-secondary)' }
              }>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Language + Theme + Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Language button - glowing purple (hidden on mobile, shown on desktop) */}
          <button onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="lang-btn hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all">
            <Globe size={14} />
            {language === 'bn' ? 'English' : 'বাংলা'}
          </button>

          {/* Theme switcher */}
          <div className="relative" ref={themeRef}>
            <button onClick={() => setShowTheme(!showTheme)}
              className="p-2 rounded-full transition-all hover:opacity-80"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-secondary)' }}>
              {currentThemeIcon && <currentThemeIcon.icon size={16} />}
            </button>
            {showTheme && (
              <div className="absolute right-0 top-12 glass-card p-2 min-w-[140px] space-y-1 z-50">
                {themeOptions.map((opt) => (
                  <button key={opt.value} onClick={() => { setThemeMode(opt.value); setShowTheme(false) }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      themeMode === opt.value ? 'text-purple-400' : ''
                    }`}
                    style={{
                      background: themeMode === opt.value ? 'rgba(168,85,247,0.1)' : 'transparent',
                      color: themeMode === opt.value ? '#a855f7' : 'var(--text-secondary)',
                    }}>
                    <opt.icon size={14} /> {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 transition-colors" style={{ color: 'var(--text-secondary)' }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 space-y-1" style={{ background: 'var(--nav-scrolled)', borderTop: '1px solid var(--border-subtle)' }}>
          {items.map((item) => (
            <Link key={item.to} to={item.to}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bengali transition-all`}
              style={location.pathname === item.to
                ? { background: 'rgba(168,85,247,0.1)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.2)' }
                : { color: 'var(--text-secondary)' }
              }>
              {item.label}
            </Link>
          ))}
          {/* Language toggle inside mobile menu */}
          <div className="pt-2 mt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <button onClick={() => { setLanguage(language === 'bn' ? 'en' : 'bn'); setOpen(false) }}
              className="lang-btn flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
              <Globe size={16} />
              {language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
