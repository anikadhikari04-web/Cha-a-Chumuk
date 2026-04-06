import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { categories, menuItems } from '../data/menuData'

// Floating bubbles component (desktop only)
function FloatingBubbles() {
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 12,
  }))
  return (
    <div className="floating-bubbles hidden lg:block">
      {bubbles.map((b, i) => (
        <div key={i} className="bubble" style={{
          width: b.size, height: b.size, left: `${b.left}%`,
          animationDelay: `${b.delay}s`, animationDuration: `${b.duration}s`,
        }} />
      ))}
    </div>
  )
}

export default function MenuPage({ language }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = !search ||
      item.name.bn.toLowerCase().includes(search.toLowerCase()) ||
      item.name.en.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="pt-24 pb-16 relative">
      <FloatingBubbles />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Soundwave */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-10">
          <div className="flex justify-center mb-3">
            <div className="soundwave"><span /><span /><span /><span /><span /></div>
          </div>
          <span className="section-badge">{language === 'bn' ? 'মেনু কার্ড' : 'Menu Card'}</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 font-bengali" style={{ color: 'var(--text-primary)' }}>
            {language === 'bn' ? 'বিশেষ মেনু কার্ড' : 'Special Menu Card'}
          </h1>
          <p className="mt-2 font-bengali text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
            {language === 'bn' ? 'এক নজরে আমাদের পুরো মেনু' : 'Our complete menu at a glance'}
          </p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card p-3 mb-6 sm:mb-8 flex items-center gap-3">
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'bn' ? 'খাবার খুঁজুন...' : 'Search food...'}
            className="flex-1 bg-transparent focus:outline-none font-bengali text-sm" style={{ color: 'var(--text-primary)' }} />
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bengali transition-all duration-300"
              style={activeCategory === cat.id
                ? { background: 'var(--accent)', color: 'var(--bg-primary)', fontWeight: 700, boxShadow: `0 4px 15px var(--accent-shadow)` }
                : { background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-secondary)' }
              }>
              {cat.emoji} {cat.name[language]}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16"><p className="font-bengali text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
            {language === 'bn' ? 'কোনো আইটেম পাওয়া যায়নি' : 'No items found'}</p></div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {Object.entries(grouped).map(([catId, items]) => {
              const catInfo = categories.find(c => c.id === catId)
              return (
                <motion.div key={catId} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h2 className="text-base sm:text-lg font-bold font-bengali flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                      <span>{catInfo?.emoji || '🍽️'}</span> {catInfo?.name[language] || catId}
                    </h2>
                    <span className="text-xs font-bengali" style={{ color: 'var(--accent)' }}>{items.length} {language === 'bn' ? 'টি' : 'items'}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                        className="glass-card !rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between group">
                        <span className="font-bengali text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>{item.name[language]}</span>
                        <span className="font-bold text-xs sm:text-sm" style={{ color: 'var(--accent)' }}>₹{item.price}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
