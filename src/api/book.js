import { supabase } from '../lib/supabase'

export async function getBooks() {
  const { data } = await supabase.from('books').select('*')
  return data
}
