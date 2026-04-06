import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import StarRating from './StarRating'

export default function ReviewCard({ review, index }) {
  const date = new Date(review.created_at).toLocaleDateString('bn-BD', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card p-5 dark:bg-slate-800/70 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          <User size={18} className="text-primary-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-800 dark:text-white font-bengali truncate">{review.name}</h4>
            <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">{date}</span>
          </div>
          <StarRating rating={review.rating} size={14} />
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm font-bengali leading-relaxed">{review.message}</p>
        </div>
      </div>
    </motion.div>
  )
}
