import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Send, Star, MessageSquare, Clock, Hash, Trash2 } from 'lucide-react'
import { fetchReviews, submitReview, deleteReview, fetchAverageRating, getDeviceId } from '../lib/supabase'

function StarRating({ rating, setRating, interactive = false, size = 28 }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" disabled={!interactive}
          onClick={() => interactive && setRating(star)}
          className={`transition-all duration-200 ${interactive ? 'cursor-pointer hover:scale-125' : ''}`}>
          <Star size={size} className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} style={{ transition: 'all 0.2s' }} />
        </button>
      ))}
    </div>
  )
}

function FloatingBubbles() {
  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    size: Math.random() * 50 + 15,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 10 + 14,
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

export default function ReviewsPage({ language }) {
  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const deviceId = getDeviceId()

  const loadReviews = useCallback(async () => {
    try {
      const [data, avg] = await Promise.all([fetchReviews(), fetchAverageRating()])
      setReviews(data || [])
      setAvgRating(avg || 0)
    } catch (err) { console.error(err) } finally { setLoading(false) }
  }, [])

  useEffect(() => { loadReviews() }, [loadReviews])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim() || !rating) return
    setSubmitting(true)
    try {
      await submitReview({ name: name.trim(), message: message.trim(), rating })
      setName(''); setMessage(''); setRating(0); setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      await loadReviews()
    } catch (err) { console.error(err) } finally { setSubmitting(false) }
  }

  const handleDelete = async (review) => {
    const confirmMsg = language === 'bn' ? 'আপনি কি এই রিভিউ মুছতে চান?' : 'Delete this review?'
    if (!confirm(confirmMsg)) return
    setDeleting(review.id)
    try {
      await deleteReview(review.id)
      await loadReviews()
    } catch (err) { console.error(err) } finally { setDeleting(null) }
  }

  // Check if a review belongs to this device
  const isOwnReview = (review) => review.device_id === deviceId

  return (
    <div className="pt-24 pb-16 relative">
      <FloatingBubbles />

      {/* Header */}
      <div className="relative py-10 sm:py-16 overflow-hidden">
        <div className="absolute top-8 left-12 w-24 h-24 rounded-full opacity-20 hidden sm:block" style={{ background: 'var(--orb1)', filter: 'blur(30px)', animation: 'floatUpDown 6s ease-in-out infinite' }} />
        <div className="absolute top-12 right-20 w-32 h-32 rounded-full opacity-15 hidden sm:block" style={{ background: 'var(--orb2)', filter: 'blur(40px)', animation: 'floatUpDown 7s ease-in-out infinite 1s' }} />

        <div className="text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-badge">{language === 'bn' ? 'গ্রাহক মতামত' : 'CUSTOMER REVIEWS'}</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-bengali mt-2" style={{ color: 'var(--text-primary)' }}>
              {language === 'bn' ? 'আপনার মতামত দিন' : 'Share Your Experience'}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-3">
              <StarRating rating={Math.round(avgRating)} size={24} />
            </div>
            <p className="font-bengali text-xs sm:text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              {reviews.length === 0
                ? (language === 'bn' ? 'এখনো কোনো রিভিউ নেই। প্রথম হন!' : 'No reviews yet. Be the first!')
                : (language === 'bn' ? `${reviews.length} টি মতামত` : `${reviews.length} reviews`)}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-secondary)' }}>
            <Clock size={14} style={{ color: 'var(--section-badge-text)' }} />
            {language === 'bn' ? 'প্রতি ১০ মিনিটে সর্বোচ্চ ২টি রিভিউ' : 'Max 2 reviews per 10 min'}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)', color: 'var(--text-secondary)' }}>
            <Hash size={14} style={{ color: 'var(--section-badge-text)' }} />
            {language === 'bn' ? 'শুধু নিজের রিভিউ মুছতে পারবেন' : 'You can only delete your own reviews'}
          </div>
        </div>

        {/* Review Form */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card p-6 sm:p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare size={20} style={{ color: 'var(--section-badge-text)' }} />
            <h2 className="font-bold font-bengali text-lg" style={{ color: 'var(--text-primary)' }}>
              {language === 'bn' ? 'রিভিউ লিখুন' : 'Write a Review'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-bengali block mb-2" style={{ color: 'var(--text-secondary)' }}>{language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={50}
                placeholder={language === 'bn' ? 'নাম লিখুন...' : 'Enter your name...'}
                className="w-full px-4 py-3 rounded-xl font-bengali text-sm theme-input" />
            </div>

            <div>
              <label className="text-sm font-bengali block mb-2" style={{ color: 'var(--text-secondary)' }}>{language === 'bn' ? 'রেটিং দিন *' : 'Your Rating *'}</label>
              <StarRating rating={rating} setRating={setRating} interactive size={32} />
            </div>

            <div>
              <label className="text-sm font-bengali block mb-2" style={{ color: 'var(--text-secondary)' }}>{language === 'bn' ? 'আপনার মতামত *' : 'Your Review *'}</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 500))} required rows={4}
                placeholder={language === 'bn' ? 'আপনার অভিজ্ঞতা শেয়ার করুন...' : 'Share your experience...'}
                className="w-full px-4 py-3 rounded-xl font-bengali text-sm theme-input resize-none" />
              <p className="text-right text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{message.length}/500</p>
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={submitting || !name.trim() || !message.trim() || !rating}
                className="btn-primary !rounded-xl disabled:opacity-40 disabled:cursor-not-allowed font-bengali">
                <Send size={16} />
                {submitting ? (language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...') : (language === 'bn' ? 'পাঠান' : 'Send')}
              </button>
            </div>
          </form>

          {success && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center font-bengali">
              ✅ {language === 'bn' ? 'আপনার মতামত সফলভাবে পাঠানো হয়েছে!' : 'Review submitted successfully!'}
            </motion.div>
          )}
        </motion.div>

        {/* Reviews List */}
        {loading ? (
          <div className="text-center py-16"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : reviews.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <MessageSquare size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
            <p className="font-bengali" style={{ color: 'var(--text-secondary)' }}>
              {language === 'bn' ? 'এখনো কোনো মতামত নেই। প্রথম হন!' : 'No reviews yet. Be the first to share!'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', color: '#a855f7' }}>
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-sm font-bengali truncate" style={{ color: 'var(--text-primary)' }}>{review.name}</h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {new Date(review.created_at).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        {/* Only show delete button if this device submitted this review */}
                        {isOwnReview(review) && (
                          <button onClick={() => handleDelete(review)}
                            disabled={deleting === review.id}
                            className="p-1.5 rounded-full hover:bg-red-500/10 text-red-400 transition-all group"
                            title={language === 'bn' ? 'মুছুন' : 'Delete'}>
                            {deleting === review.id ? (
                              <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={14} />
                    <p className="text-sm font-bengali mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{review.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
