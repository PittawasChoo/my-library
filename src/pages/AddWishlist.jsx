import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import { getPublishers } from '../api/publisher'

const styles = {
  form: {
    maxWidth: 600,
    margin: 'auto',
    padding: 16,
  },
}

export default function AddWishlist() {
  const [name, setName] = useState('')
  const [publisherId, setPublisherId] = useState('')
  const [items, setItems] = useState([{ volume: '', price: '' }])
  const [publishers, setPublishers] = useState([])

  useEffect(() => {
    fetchPublishers()
  }, [])

  async function fetchPublishers() {
    const data = await getPublishers()
    setPublishers(data)
  }

  function addRow() {
    setItems([...items, { volume: '', price: '' }])
  }

  function updateItem(index, field, value) {
    const updated = [...items]
    updated[index][field] = value
    setItems(updated)
  }

  async function handleSubmit() {
    await supabase.from('wishlist').insert({
      name,
      publisher_id: publisherId,
      volume: items.map((i) => i.volume),
      price: items.map((i) => i.price),
    })

    alert('Added to wishlist!')
  }

  return (
    <Layout>
      <h1>⭐ Add Wishlist</h1>

      <input
        placeholder="Book Name"
        onChange={(e) => setName(e.target.value)}
      />

      <select onChange={(e) => setPublisherId(e.target.value)}>
        <option value="">Select Publisher</option>
        {publishers.map((pub) => (
          <option key={pub.id} value={pub.id}>
            {pub.name}
          </option>
        ))}
      </select>

      {items.map((item, index) => (
        <div key={index}>
          <input
            placeholder="Volume"
            onChange={(e) => updateItem(index, 'volume', e.target.value)}
          />
          <input
            placeholder="Price"
            onChange={(e) => updateItem(index, 'price', e.target.value)}
          />
        </div>
      ))}

      <button onClick={addRow}>+ Add Volume</button>
      <button onClick={handleSubmit}>Save</button>
    </Layout>
  )
}
