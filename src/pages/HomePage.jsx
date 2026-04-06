import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { Star, Clock, UtensilsCrossed, Users, Calendar, Sparkles, Coffee, Flame, ChefHat, ArrowRight } from 'lucide-react'

import tandooriPlatter from '../assets/tandoori-platter.jpg'
import tandooriCloseup from '../assets/tandoori-closeup.jpg'
import chickenLollipop from '../assets/chicken-lollipop.jpg'
import foodSpecial from '../assets/food-special.png'
import cafeNightCrowd from '../assets/cafe-night-crowd.jpg'
import cafeExterior from '../assets/cafe-exterior.jpg'
import cafeInterior from '../assets/cafe-interior.jpg'

const popularItems = [
  { img: tandooriPlatter, name: { bn: 'তন্দুরি প্লাটার', en: 'Tandoori Platter' }, price: '₹180', rating: 4.8, badge: 'Bestseller' },
  { img: foodSpecial, name: { bn: 'শেফ স্পেশাল', en: 'Chef Special' }, price: '₹150', rating: 4.9, badge: 'Signature' },
  { img: chickenLollipop, name: { bn: 'চিকেন ললিপপ', en: 'Chicken Lollipop' }, price: '₹120', rating: 4.7, badge: 'Fan Favorite' },
  { img: tandooriCloseup, name: { bn: 'তন্দুরি চিকেন', en: 'Tandoori Chicken' }, price: '₹160', rating: 4.9, badge: 'Popular' },
]

const badgeColors = {
  'Bestseller': 'linear-gradient(135deg, #22c55e, #84cc16)',
  'Signature': 'linear-gradient(135deg, #a855f7, #ec4899)',
  'Fan Favorite': 'linear-gradient(135deg, #f59e0b, #ef4444)',
  'Popular': 'linear-gradient(135deg, #3b82f6, #6366f1)',
}

const stats = [
  { icon: UtensilsCrossed, val: '30+', label: { bn: 'মেনু আইটেম', en: 'Menu Items' } },
  { icon: Users, val: '5+', label: { bn: 'বছরের অভিজ্ঞতা', en: 'Years Experience' } },
  { icon: Star, val: '4.8', label: { bn: 'রেটিং', en: 'Rating' } },
  { icon: Calendar, val: '365', label: { bn: 'দিন খোলা', en: 'Days Open' } },
]

export default function HomePage({ language }) {
  const galleryRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: galleryRef, offset: ['start end', 'end start'] })
  const galleryX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  return (
    <div>
      <Hero language={language} />

      {/* Live floating icons — desktop only */}
      <div className="relative">
        <motion.div className="absolute -top-16 left-8 z-20 opacity-30 hidden lg:block"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <Coffee size={32} style={{ color: 'var(--accent)' }} />
        </motion.div>
        <motion.div className="absolute -top-10 right-12 z-20 opacity-20 hidden lg:block"
          animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}>
          <Flame size={28} style={{ color: '#ef4444' }} />
        </motion.div>
      </div>

      {/* Popular Items with Soundwave Icon */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
            {/* Soundwave animation like reference video */}
            <div className="flex justify-center mb-3">
              <div className="soundwave"><span /><span /><span /><span /><span /></div>
            </div>
            <span className="section-badge">{language === 'bn' ? 'আমাদের মেনু থেকে' : 'From Our Menu'}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-bengali mt-2" style={{ color: 'var(--text-primary)' }}>
              {language === 'bn' ? 'আমাদের জনপ্রিয় খাবার' : 'Our Popular Items'}
            </h2>
            <p className="text-sm font-bengali mt-2" style={{ color: 'var(--text-secondary)' }}>
              {language === 'bn' ? 'আমাদের অতিথিদের প্রিয় খাবারসমূহ' : 'Our guests\' favorite dishes'}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {popularItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group relative">
                <div className="h-36 sm:h-48 overflow-hidden relative">
                  <img src={item.img} alt={item.name[language]} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {/* Gradient badge like reference */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-white"
                    style={{ background: badgeColors[item.badge] }}>
                    {item.badge}
                  </div>
                  <motion.div className="absolute top-2 right-2 sm:top-3 sm:right-3" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    <Sparkles size={14} className="text-yellow-400" />
                  </motion.div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bengali font-bold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>{item.name[language]}</h3>
                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <span className="font-bold text-sm sm:text-base" style={{ color: 'var(--accent)' }}>{item.price}</span>
                    <div className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>{item.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-12 sm:py-16" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}>
                <stat.icon size={24} className="mx-auto mb-2 group-hover:scale-110 transition-transform" style={{ color: 'var(--accent)' }} />
              </motion.div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.val}</div>
              <div className="text-xs sm:text-sm font-bengali mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.label[language]}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FLOATING MENU BUTTON ===== */}
      <section className="py-10 sm:py-14 relative">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Link to="/menu" className="menu-float-btn inline-flex items-center gap-2 sm:gap-3 font-bengali text-sm sm:text-base relative z-10">
              <ChefHat size={20} />
              {language === 'bn' ? '🍽️ সম্পূর্ণ মেনু দেখুন' : '🍽️ View Full Menu'}
              <ArrowRight size={16} className="animate-bounce" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Cafe Gallery with parallax */}
      <section className="py-16 sm:py-20 overflow-hidden" ref={galleryRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
            <span className="section-badge">📸 {language === 'bn' ? 'আড্ডার আসর' : 'Cafe Gallery'}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-bengali mt-2" style={{ color: 'var(--text-primary)' }}>
              {language === 'bn' ? 'আমাদের ক্যাফে' : 'Our Cafe'}
            </h2>
          </motion.div>
          <motion.div style={{ x: galleryX }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[cafeNightCrowd, cafeExterior, cafeInterior].map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="rounded-xl sm:rounded-2xl overflow-hidden group h-44 sm:h-64 relative">
                <img src={img} alt="Cafe" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {i === 0 && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full" style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
            <span className="section-badge">{language === 'bn' ? 'কেন আমরা' : 'Why Us'}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-bengali mt-2" style={{ color: 'var(--text-primary)' }}>
              {language === 'bn' ? 'কেন চা এ চুমুক?' : 'Why Cha E Chumuk?'}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { emoji: '🌿', title: { bn: 'তাজা উপকরণ', en: 'Fresh Ingredients' }, desc: { bn: 'প্রতিদিন সতেজ এবং মানসম্পন্ন উপকরণ ব্যবহার করা হয়', en: 'Fresh and quality ingredients used daily' } },
              { emoji: '💰', title: { bn: 'সাশ্রয়ী মূল্য', en: 'Affordable Price' }, desc: { bn: 'সেরা মানের খাবার সাশ্রয়ী মূল্যে', en: 'Best quality food at affordable prices' } },
              { emoji: '✨', title: { bn: 'চমৎকার পরিবেশ', en: 'Great Ambiance' }, desc: { bn: 'বন্ধুদের সাথে আড্ডা দেওয়ার আদর্শ স্থান', en: 'Perfect spot to hang out with friends' } },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="glass-card p-5 sm:p-6 text-center">
                <motion.div className="text-3xl sm:text-4xl mb-3 sm:mb-4" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}>
                  {item.emoji}
                </motion.div>
                <h3 className="font-bold font-bengali text-base sm:text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{item.title[language]}</h3>
                <p className="text-xs sm:text-sm font-bengali" style={{ color: 'var(--text-secondary)' }}>{item.desc[language]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(168,85,247,0.02))' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center px-4 relative z-10">
          <motion.span className="text-4xl sm:text-5xl block mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            ☕
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-bengali mb-4" style={{ color: 'var(--text-primary)' }}>
            {language === 'bn' ? 'আজই আসুন!' : 'Visit Us Today!'}
          </h2>
          <p className="font-bengali text-sm sm:text-base mb-6 sm:mb-8" style={{ color: 'var(--text-secondary)' }}>
            {language === 'bn' ? 'খানাকুল, হুগলিতে আমাদের ক্যাফেতে বন্ধুদের নিয়ে আড্ডা দিন' : 'Come hang out with friends at our cafe in Khanakul, Hooghly'}
          </p>
          <a href="https://wa.me/917947432180" target="_blank" rel="noopener noreferrer"
            className="btn-primary font-bengali">
            {language === 'bn' ? '🟢 হোয়াটসঅ্যাপে যোগাযোগ' : '🟢 WhatsApp Us'}
          </a>
        </motion.div>
      </section>
    </div>
  )
}
