import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    '⚠️ Supabase credentials missing!\n' +
    'Create a .env file in project root:\n' +
    'VITE_SUPABASE_URL=your_url\n' +
    'VITE_SUPABASE_ANON_KEY=your_key'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Get or create a unique device ID stored in localStorage
export function getDeviceId() {
  let id = localStorage.getItem('cec-device-id')
  if (!id) {
    id = 'dev_' + Math.random().toString(36).substr(2, 12) + '_' + Date.now()
    localStorage.setItem('cec-device-id', id)
  }
  return id
}

export async function fetchReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error('Error fetching reviews:', error); throw error }
  return data
}

export async function submitReview({ name, message, rating }) {
  const device_id = getDeviceId()
  const { data, error } = await supabase
    .from('reviews')
    .insert([{ name, message, rating, device_id }])
    .select()
  if (error) { console.error('Error submitting review:', error); throw error }
  return data
}

export async function deleteReview(reviewId) {
  const device_id = getDeviceId()
  // Only delete if the review belongs to this device
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
    .eq('device_id', device_id)
  if (error) { console.error('Error deleting review:', error); throw error }
}

export async function fetchAverageRating() {
  const { data, error } = await supabase.from('reviews').select('rating')
  if (error) { console.error('Error fetching ratings:', error); throw error }
  if (!data || data.length === 0) return 0
  const total = data.reduce((sum, r) => sum + r.rating, 0)
  return parseFloat((total / data.length).toFixed(1))
}
