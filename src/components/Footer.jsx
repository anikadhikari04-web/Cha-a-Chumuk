import { Link } from 'react-router-dom'
import { Phone, MapPin, MessageCircle } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Footer({ language }) {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
              <div>
                <span className="font-bold text-lg font-bengali block" style={{ color: 'var(--accent)' }}>Cha A Chumuk</span>
                <span className="text-xs font-bengali" style={{ color: 'var(--text-muted)' }}>
                  {language === 'bn' ? 'চা এ চুমুক, আড্ডা জমুক' : 'Cha E Chumuk, Adda Jomuk'}
                </span>
              </div>
            </Link>
            <p className="text-sm font-bengali" style={{ color: 'var(--text-secondary)' }}>
              Cha A Chumuk — Fusion Tea Shop & Restaurant
            </p>
            <p className="text-sm mt-1 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <MapPin size={12} /> Khanakul, Hooghly, West Bengal, <span className="text-green-400">India</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 font-bengali" style={{ color: 'var(--text-primary)' }}>
              {language === 'bn' ? 'দ্রুত লিঙ্ক' : 'Quick Links'}
            </h4>
            <div className="space-y-2">
              {[
                { to: '/', label: language === 'bn' ? 'হোম' : 'Home' },
                { to: '/menu', label: language === 'bn' ? 'মেনু' : 'Menu' },
                { to: '/contact', label: language === 'bn' ? 'যোগাযোগ' : 'Contact' },
              ].map((item) => (
                <Link key={item.to} to={item.to} className="block text-sm font-bengali transition-colors hover:opacity-80"
                  style={{ color: 'var(--text-secondary)' }}>{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 font-bengali" style={{ color: 'var(--text-primary)' }}>
              {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </h4>
            <div className="space-y-3">
              <a href="tel:+917947432180" className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: 'var(--text-secondary)' }}>
                <Phone size={14} style={{ color: 'var(--accent)' }} /> +91 79474 32180
              </a>
              <a href="https://wa.me/917947432180" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: 'var(--text-secondary)' }}>
                <MessageCircle size={14} className="text-green-400" /> WhatsApp Chat
              </a>
            </div>
            <div className="flex gap-3 mt-4">
              {['facebook', 'instagram'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-secondary)' }}>
                  {s === 'facebook' ? 'f' : '📷'}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2026 Cha A Chumuk. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Khanakul, Hooghly, West Bengal 🇮🇳</p>
        </div>
        <p className="text-center text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          Made with ❤️ by <a href="#" className="font-bold" style={{ color: 'var(--accent)' }}>GlisticWorks</a> (Anik Adhikary)
        </p>
      </div>
    </footer>
  )
}
