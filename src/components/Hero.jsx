import { motion } from 'framer-motion'
import { ArrowRight, Star, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero-interior.jpg'

const marqueeItems = [
  { emoji: '📍', text: 'Khanakul, Hooghly' }, { emoji: '🍵', text: 'Fresh Tea Brewed Daily' },
  { emoji: '🍲', text: 'Special Biryani' }, { emoji: '🥟', text: 'Handmade Momos' },
  { emoji: '🌯', text: 'Signature Rolls' }, { emoji: '🍜', text: 'Chawmin' }, { emoji: '🍗', text: 'Tandoori Specials' },
]

export default function Hero({ language }) {
  return (
    <section className="relative">
      <div className="relative h-[70vh] sm:h-[85vh] lg:h-[90vh] overflow-hidden">
        {/* Hero image with blur glass overlay */}
        <img src={heroImg} alt="Cha E Chumuk" className="w-full h-full object-cover" style={{ filter: 'blur(2.5px)', transform: 'scale(1.05)' }} />
        {/* Frosted glass + gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.25) 50%, var(--bg-primary))',
          backdropFilter: 'blur(1px)',
        }} />

        {/* Animated wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-10" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full" style={{ height: '80px' }}>
            <path fill="var(--bg-primary)" fillOpacity="0.6" d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,120 L0,120 Z">
              <animate attributeName="d" dur="6s" repeatCount="indefinite"
                values="M0,40 C360,100 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,120 L0,120 Z;
                        M0,60 C240,10 600,100 960,30 C1200,0 1360,80 1440,40 L1440,120 L0,120 Z;
                        M0,40 C360,100 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,120 L0,120 Z" />
            </path>
            <path fill="var(--bg-primary)" fillOpacity="0.4" d="M0,80 C480,20 720,100 1200,40 C1360,20 1400,60 1440,70 L1440,120 L0,120 Z">
              <animate attributeName="d" dur="8s" repeatCount="indefinite"
                values="M0,80 C480,20 720,100 1200,40 C1360,20 1400,60 1440,70 L1440,120 L0,120 Z;
                        M0,50 C320,110 800,10 1100,80 C1280,100 1380,30 1440,60 L1440,120 L0,120 Z;
                        M0,80 C480,20 720,100 1200,40 C1360,20 1400,60 1440,70 L1440,120 L0,120 Z" />
            </path>
            <path fill="var(--bg-primary)" d="M0,100 C360,60 720,110 1080,80 C1260,70 1380,100 1440,90 L1440,120 L0,120 Z">
              <animate attributeName="d" dur="5s" repeatCount="indefinite"
                values="M0,100 C360,60 720,110 1080,80 C1260,70 1380,100 1440,90 L1440,120 L0,120 Z;
                        M0,90 C240,110 600,60 960,100 C1200,110 1360,70 1440,85 L1440,120 L0,120 Z;
                        M0,100 C360,60 720,110 1080,80 C1260,70 1380,100 1440,90 L1440,120 L0,120 Z" />
            </path>
          </svg>
        </div>

        {/* Floating Badges — hidden on small phones */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
          className="absolute top-20 left-4 sm:left-12 z-20 hidden sm:block" style={{ animation: 'floatUpDown 5s ease-in-out infinite' }}>
          <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2"><span className="text-lg sm:text-2xl">🥟</span>
            <span className="text-white text-xs sm:text-sm font-bengali font-medium">{language === 'bn' ? 'মমোস' : 'Momos'}</span></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}
          className="absolute bottom-36 left-4 sm:left-12 z-20 hidden sm:block" style={{ animation: 'floatUpDown 6s ease-in-out infinite 0.5s' }}>
          <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2"><span className="text-lg sm:text-2xl">🍲</span>
            <span className="text-white text-xs sm:text-sm font-bengali font-medium">{language === 'bn' ? 'স্পেশাল বিরিয়ানি' : 'Special Biryani'}</span></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
          className="absolute top-20 right-4 sm:right-12 z-20 hidden sm:block" style={{ animation: 'floatUpDown 5s ease-in-out infinite 1s' }}>
          <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2"><span className="text-lg sm:text-2xl">🍵</span>
            <span className="text-white text-xs sm:text-sm font-bengali font-medium">{language === 'bn' ? 'তাজা চা' : 'Fresh Brewed'}</span></div>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-bengali mb-3 sm:mb-4">
            <MapPin size={12} /> {language === 'bn' ? 'খানাকুল, হুগলি' : 'Khanakul, Hooghly'}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 italic" style={{ fontFamily: "'Georgia', serif" }}>
            {language === 'bn' ? <>চা এ চুমুক, <span className="text-gradient not-italic">আড্ডা জমুক</span></> : 'Cha a Chumuk'}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-xl mb-6 sm:mb-8 font-bengali leading-relaxed">
            {language === 'bn' ? 'খানাকুল, হুগলির সেরা ফিউশন ক্যাফে — যেখানে প্রতিটি চুমুকে শুরু হয় গল্প'
              : 'Your favorite fusion café in Khanakul, Hooghly — where every sip starts a story.'}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Link to="/menu" className="btn-primary text-sm sm:text-base">{language === 'bn' ? 'মেনু দেখুন' : 'View Menu'} <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline !border-white/30 !text-white hover:!border-purple-400 hover:!text-purple-400 text-sm sm:text-base">
              {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Now'}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex gap-6 sm:gap-8 lg:gap-12 mt-8 sm:mt-12 text-center">
            {[
              { val: '500+', label: language === 'bn' ? 'দৈনিক অতিথি' : 'Daily Guests' },
              { val: '30+', label: language === 'bn' ? 'মেনু আইটেম' : 'Menu Items' },
              { val: <span className="flex items-center gap-1">5<Star size={16} className="text-yellow-400 fill-yellow-400" /></span>, label: language === 'bn' ? 'রেটিং' : 'Rating' },
            ].map((s, i) => (
              <div key={i}><div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{s.val}</div>
                <div className="text-gray-400 text-[10px] sm:text-xs lg:text-sm font-bengali mt-1">{s.label}</div></div>
            ))}
          </motion.div>
        </div>

        {/* Live steam — desktop only */}
        <div className="absolute bottom-24 right-1/4 z-5 opacity-30 hidden sm:block">
          {[0, 1, 2].map(i => (
            <div key={i} className="absolute w-1 h-8 bg-gradient-to-t from-transparent to-white/20 rounded-full"
              style={{ left: `${i * 12}px`, animation: `steam 2s ease-out infinite ${i * 0.5}s` }} />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-container py-2.5 sm:py-3">
        <div className="marquee-content">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-4 sm:mx-6 font-bold text-xs sm:text-sm font-bengali" style={{ color: 'var(--marquee-text)' }}>
              <span>{item.emoji}</span> {item.text} <span className="opacity-40">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
