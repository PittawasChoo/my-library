import { supabase } from '../lib/supabase'

export async function getPublishers() {
  const { data } = await supabase.from('publishers').select('*')
  return data
}
