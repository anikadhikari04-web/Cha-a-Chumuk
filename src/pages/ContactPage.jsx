import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react'
import cafeNightCrowd from '../assets/cafe-night-crowd.jpg'
import cafeExterior from '../assets/cafe-exterior.jpg'
import cafeAmbiance from '../assets/cafe-ambiance.png'

export default function ContactPage({ language }) {
  const contactCards = [
    {
      icon: <Phone size={22} />, color: '#22c55e',
      title: language === 'bn' ? 'কল করুন' : 'Call Us',
      value: '+91 79474 32180',
      action: { label: language === 'bn' ? 'এখন কল করুন' : 'Call Now', href: 'tel:+917947432180' },
    },
    {
      icon: <MessageCircle size={22} />, color: '#22c55e',
      title: language === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp Chat',
      value: language === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি কথা বলুন' : 'Chat directly on WhatsApp',
      action: { label: '🟢 WhatsApp Chat', href: 'https://wa.me/917947432180' },
    },
    {
      icon: <MapPin size={22} />, color: '#ef4444',
      title: language === 'bn' ? 'অবস্থান' : 'Location',
      value: language === 'bn' ? 'খানাকুল, হুগলি, পশ্চিমবঙ্গ, ভারত' : 'Khanakul, Hooghly, West Bengal, India',
      action: { label: '📍 Google Maps', href: 'https://www.google.com/maps?q=22.728278,87.868833' },
    },
    {
      icon: <Clock size={22} />, color: '#3b82f6',
      title: language === 'bn' ? 'খোলার সময়' : 'Opening Hours',
      value: language === 'bn' ? 'প্রতিদিন: সকাল ৮টা – রাত ১১টা' : 'Daily: 8:00 AM – 11:00 PM',
      status: language === 'bn' ? '🟢 এখন খোলা' : '🟢 Open Now',
    },
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - no background image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="section-badge">{language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-bengali mt-2" style={{ color: 'var(--text-primary)' }}>
            {language === 'bn' ? 'আমাদের খুঁজুন' : 'Find Us'}
          </h1>
          <p className="font-bengali text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            {language === 'bn' ? 'খানাকুল, হুগলিতে আমাদের দেখতে আসুন' : 'Visit us in Khanakul, Hooghly'}
          </p>
        </motion.div>

        {/* Contact + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            {contactCards.map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${card.color}15`, border: `1px solid ${card.color}30`, color: card.color }}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold font-bengali" style={{ color: 'var(--text-primary)' }}>{card.title}</h3>
                    <p className="text-sm font-bengali mt-0.5" style={{ color: 'var(--text-secondary)' }}>{card.value}</p>
                    {card.action && (
                      <a href={card.action.href} target={card.action.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-full text-xs font-medium transition-all hover:opacity-80"
                        style={{ background: `${card.color}15`, color: card.color, border: `1px solid ${card.color}30` }}>
                        {card.action.label}
                      </a>
                    )}
                    {card.status && <p className="mt-2 text-xs text-green-400">{card.status}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="glass-card overflow-hidden h-[420px] sm:h-[480px] sticky top-24">
            <div className="p-3 flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
              <MapPin size={14} style={{ color: 'var(--section-badge-text)' }} />
              <span className="font-bengali">{language === 'bn' ? 'খানাকুল, হুগলি' : 'Khanakul, Hooghly'}</span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672!2d87.868833!3d22.728278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzQxLjgiTiA4N8KwNTInMDcuOCJF!5e1!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Cha E Chumuk Location" className="w-full h-[calc(100%-44px)]" />
            <a href="https://www.google.com/maps?q=22.728278,87.868833" target="_blank" rel="noopener noreferrer"
              className="absolute top-14 left-5 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-gray-900 text-xs font-medium rounded-full hover:bg-purple-100 transition-colors shadow-lg">
              Open in Maps <ExternalLink size={11} />
            </a>
          </motion.div>
        </div>

        {/* Atmosphere Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center font-bengali mb-8" style={{ color: 'var(--text-primary)' }}>
            {language === 'bn' ? 'আমাদের পরিবেশ' : 'Our Atmosphere'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[cafeNightCrowd, cafeExterior, cafeAmbiance].map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="rounded-2xl overflow-hidden group h-48 sm:h-56">
                <img src={img} alt="Cafe" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
