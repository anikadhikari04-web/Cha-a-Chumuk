import { Star } from 'lucide-react'

export default function StarRating({ rating, onRate, size = 20, interactive = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => interactive && onRate?.(star)} disabled={!interactive}
          className={`transition-transform duration-200 ${interactive ? 'cursor-pointer hover:scale-125' : 'cursor-default'}`}>
          <Star size={size}
            className={`transition-colors duration-200 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-300 dark:fill-gray-600 dark:text-gray-600'}`} />
        </button>
      ))}
    </div>
  )
}
