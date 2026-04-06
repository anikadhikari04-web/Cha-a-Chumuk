import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import StarRating from './StarRating'
import { submitReview } from '../lib/supabase'

export default function ReviewForm({ language, onReviewSubmitted }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!name.trim()) { setError(language === 'bn' ? 'আপনার নাম লিখুন' : 'Please enter your name'); return }
    if (rating === 0) { setError(language === 'bn' ? 'রেটিং দিন' : 'Please select a rating'); return }
    if (!message.trim()) { setError(language === 'bn' ? 'আপনার মতামত লিখুন' : 'Please write your review'); return }

    setLoading(true)
    try {
      await submitReview({ name: name.trim(), message: message.trim(), rating })
      setSuccess(true)
      setName(''); setMessage(''); setRating(0)
      onReviewSubmitted?.()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(language === 'bn' ? 'সমস্যা হয়েছে, আবার চেষ্টা করুন' : 'Something went wrong, please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 dark:bg-slate-800/70">
      <h3 className="text-xl font-bold font-bengali text-gray-800 dark:text-white mb-6">
        {language === 'bn' ? 'আপনার মতামত দিন' : 'Write a Review'}
      </h3>

      <div className="mb-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={50}
          placeholder={language === 'bn' ? 'নাম লিখুন...' : 'Your name...'}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 font-bengali focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 font-bengali mb-2">
          {language === 'bn' ? 'রেটিং দিন:' : 'Your Rating:'}
        </p>
        <StarRating rating={rating} onRate={setRating} size={28} interactive={true} />
      </div>

      <div className="mb-4">
        <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 500))} rows={4}
          placeholder={language === 'bn' ? 'আপনার মতামত লিখুন...' : 'Write your review...'}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 font-bengali focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none" />
        <p className="text-xs text-gray-400 mt-1 text-right">{message.length}/500</p>
      </div>

      {error && <p className="text-red-500 text-sm font-bengali mb-3">{error}</p>}
      {success && <p className="text-green-500 text-sm font-bengali mb-3">
        {language === 'bn' ? '✅ আপনার মতামত সফলভাবে জমা হয়েছে!' : '✅ Review submitted successfully!'}
      </p>}

      <button type="submit" disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2 font-bengali disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? (language === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...') : (language === 'bn' ? 'জমা দিন' : 'Submit')}
        <Send size={16} />
      </button>
    </motion.form>
  )
}
