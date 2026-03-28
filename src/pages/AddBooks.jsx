import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AddBooks() {
  const [name, setName] = useState('')
  const [publisher, setPublisher] = useState('')
  const [items, setItems] = useState([{ volume: '', price: '' }])

  function addRow() {
    setItems([...items, { volume: '', price: '' }])
  }

  function updateItem(index, field, value) {
    const updated = [...items]
    updated[index][field] = value
    setItems(updated)
  }

  async function handleSubmit() {
    const volumes = items.map((i) => i.volume)
    const prices = items.map((i) => i.price)

    // Check if book exists
    const { data: existing } = await supabase
      .from('books')
      .select('*')
      .eq('name', name)
      .single()

    if (existing) {
      // update
      await supabase
        .from('books')
        .update({
          volume: [...existing.volume, ...volumes],
          price: [...(existing.price || []), ...prices],
        })
        .eq('id', existing.id)
    } else {
      // insert
      await supabase.from('books').insert({
        name,
        publisher,
        volume: volumes,
        price: prices,
      })
    }

    alert('Saved!')
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        padding: 16,
      }}
    >
      <h1>Add Books</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input
        placeholder="Publisher"
        onChange={(e) => setPublisher(e.target.value)}
      />

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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
