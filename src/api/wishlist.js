import { supabase } from '../lib/supabase'

export async function getWishlist() {
  const { data } = await supabase.from('wishlist').select('*')
  return data
}
