import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Download, ExternalLink } from 'lucide-react'

import tandooriPlatter from '../assets/tandoori-platter.jpg'
import tandooriCloseup from '../assets/tandoori-closeup.jpg'
import chickenLollipop from '../assets/chicken-lollipop.jpg'
import foodBucket from '../assets/food-bucket.png'
import foodPlatter from '../assets/food-platter.png'
import foodSpecial from '../assets/food-special.png'
import foodSnack from '../assets/food-snack.png'
import cafeLets from '../assets/cafe-lets-meet.jpg'
import cafeNightCrowd from '../assets/cafe-night-crowd.jpg'
import cafeExterior from '../assets/cafe-exterior.jpg'
import cafeAmbiance from '../assets/cafe-ambiance.png'
import cafeSeating from '../assets/cafe-seating.png'
import cafeDecor from '../assets/cafe-decor.png'
import cafeInterior from '../assets/cafe-interior.jpg'
import logo from '../assets/logo.png'

const allPhotos = [
  { src: tandooriPlatter, cat: 'food', caption: { bn: 'তন্দুরি স্পেশাল', en: 'Tandoori Special' } },
  { src: cafeNightCrowd, cat: 'atmosphere', caption: { bn: 'আড্ডার আসর', en: 'Evening Hangout' } },
  { src: foodSpecial, cat: 'food', caption: { bn: 'শেফ স্পেশাল', en: 'Chef Special' } },
  { src: cafeLets, cat: 'atmosphere', caption: { bn: "Let's Meet Here", en: "Let's Meet Here" } },
  { src: chickenLollipop, cat: 'food', caption: { bn: 'চিকেন ললিপপ', en: 'Chicken Lollipop' } },
  { src: logo, cat: 'menu', caption: { bn: 'চা এ চুমুক', en: 'Cha E Chumuk' } },
  { src: tandooriCloseup, cat: 'food', caption: { bn: 'তন্দুরি চিকেন', en: 'Tandoori Chicken' } },
  { src: cafeExterior, cat: 'atmosphere', caption: { bn: 'আমাদের দোকান', en: 'Our Shop' } },
  { src: foodBucket, cat: 'food', caption: { bn: 'কড়াই স্পেশাল', en: 'Kadai Special' } },
  { src: cafeAmbiance, cat: 'atmosphere', caption: { bn: 'আরামদায়ক পরিবেশ', en: 'Cozy Ambiance' } },
  { src: foodPlatter, cat: 'food', caption: { bn: 'স্পেশাল প্লাটার', en: 'Special Platter' } },
  { src: cafeDecor, cat: 'atmosphere', caption: { bn: 'সুন্দর সাজসজ্জা', en: 'Beautiful Decor' } },
  { src: foodSnack, cat: 'food', caption: { bn: 'ক্রিস্পি স্ন্যাকস', en: 'Crispy Snacks' } },
  { src: cafeSeating, cat: 'atmosphere', caption: { bn: 'বসার ব্যবস্থা', en: 'Seating Area' } },
  { src: cafeInterior, cat: 'atmosphere', caption: { bn: 'ভেতরের পরিবেশ', en: 'Interior View' } },
]

const categories = [
  { key: 'all', label: { bn: 'সব', en: 'All' } },
  { key: 'food', label: { bn: 'খাবার', en: 'Food' } },
  { key: 'atmosphere', label: { bn: 'পরিবেশ', en: 'Atmosphere' } },
  { key: 'menu', label: { bn: 'মেনু', en: 'Menu' } },
]

const heightClasses = ['h-56', 'h-72', 'h-56', 'h-80', 'h-56', 'h-64', 'h-72', 'h-56', 'h-64', 'h-56', 'h-72', 'h-56', 'h-64', 'h-72', 'h-56']

const JUSTDIAL_LINK = 'https://www.justdial.com/Hooghly/Cha-A-Chumuk-Near-Radhanagar-More-Khanakul/9999PXX33-XX33-230906120414-H8K9_BZDET/gallery?type=all&template=2&ncatid=&mncatname=&bd=&isOpenAbd=&abd_btn=&term=&area=&search=Cha-A-Chumuk-Near-Radhanagar-More-Khanakul&abd_heading=&vrsn=3.0&sname=&scat='

export default function PhotosPage({ language }) {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'all' ? allPhotos : allPhotos.filter(p => p.cat === filter)
  const counts = { all: allPhotos.length, food: allPhotos.filter(p => p.cat === 'food').length, atmosphere: allPhotos.filter(p => p.cat === 'atmosphere').length, menu: allPhotos.filter(p => p.cat === 'menu').length }

  const handleDownload = async (src, name) => {
    try {
      const res = await fetch(src)
      const blob = await res.blob()
      const jpgBlob = new Blob([blob], { type: 'image/jpeg' })
      const url = URL.createObjectURL(jpgBlob)
      const a = document.createElement('a')
      a.href = url; a.download = `cha-e-chumuk-${name}.jpg`
      document.body.appendChild(a); a.click()
      document.body.removeChild(a); URL.revokeObjectURL(url)
    } catch (err) { console.error(err); alert('Download failed') }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - no background image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="section-badge">{language === 'bn' ? 'ফটো গ্যালারি' : 'Photo Gallery'}</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-bengali mt-2" style={{ color: 'var(--text-primary)' }}>
            {language === 'bn' ? 'আমাদের মুহূর্তগুলো' : 'Our Moments'}
          </h1>
          <p className="font-bengali text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            {language === 'bn' ? 'আমাদের ক্যাফের সেরা মুহূর্ত, খাবার ও পরিবেশের ঝলক দেখুন।' : 'See the best moments, food & atmosphere of our cafe.'}
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-bengali font-medium transition-all duration-300`}
              style={filter === cat.key
                ? { background: 'var(--accent)', color: 'var(--bg-primary)', boxShadow: `0 4px 15px var(--accent-shadow)` }
                : { background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-secondary)' }
              }>
              {cat.label[language]} <span className="ml-1 opacity-60">{counts[cat.key]}</span>
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((photo, i) => (
              <motion.div key={photo.src + filter}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid mb-4 rounded-2xl overflow-hidden relative group cursor-pointer"
                onClick={() => setLightbox(photo)}>
                <img src={photo.src} alt={photo.caption[language]} loading="lazy"
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${heightClasses[i % heightClasses.length]}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-bengali text-sm font-medium mb-3">{photo.caption[language]}</p>
                  <button onClick={(e) => { e.stopPropagation(); handleDownload(photo.src, photo.caption.en.replace(/\s+/g, '-').toLowerCase()) }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs hover:bg-purple-600 transition-all w-fit">
                    <Download size={12} /> {language === 'bn' ? 'ডাউনলোড' : 'Download'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* More Images Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mt-12">
          <a href={JUSTDIAL_LINK} target="_blank" rel="noopener noreferrer"
            className="wave-btn inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold font-bengali rounded-full text-sm transition-all hover:scale-105">
            <ExternalLink size={16} /> {language === 'bn' ? 'আরও ছবি দেখুন' : 'More Images'}
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-50 p-2 bg-white/10 rounded-full backdrop-blur-sm">
              <X size={24} />
            </button>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} className="max-w-4xl w-full">
              <img src={lightbox.src} alt={lightbox.caption[language]} className="w-full max-h-[80vh] object-contain rounded-2xl" />
              <div className="flex items-center justify-between mt-4 px-2">
                <p className="text-white font-bengali">{lightbox.caption[language]}</p>
                <button onClick={() => handleDownload(lightbox.src, lightbox.caption.en.replace(/\s+/g, '-').toLowerCase())}
                  className="btn-primary !py-2 !px-5 !text-xs"><Download size={14} /> {language === 'bn' ? 'ডাউনলোড .jpg' : 'Download .jpg'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
