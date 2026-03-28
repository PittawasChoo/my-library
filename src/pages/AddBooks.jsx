import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import { getPublishers } from '../api/publisher'

export default function AddBooks() {
  const [name, setName] = useState('')
  const [publisherId, setPublisherId] = useState('')
  const [items, setItems] = useState([{ volume: '', price: '' }])
  const [publishers, setPublishers] = useState([])
  const [loading, setLoading] = useState(false)

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

  function removeRow(index) {
    setItems(items.filter((_, i) => i !== index))
  }

  function updateItem(index, field, value) {
    const updated = [...items]
    updated[index][field] = value
    setItems(updated)
  }

  async function handleSubmit() {
    if (!name || !publisherId) {
      alert('Please fill all required fields')
      return
    }

    setLoading(true)

    const volumes = items.map((i) => i.volume).filter(Boolean)
    const prices = items.map((i) => i.price).filter(Boolean)

    const { data: existing } = await supabase
      .from('books')
      .select('*')
      .eq('name', name)
      .single()

    if (existing) {
      await supabase
        .from('books')
        .update({
          volume: [...existing.volume, ...volumes],
          price: [...(existing.price || []), ...prices],
        })
        .eq('id', existing.id)
    } else {
      await supabase.from('books').insert({
        name,
        publisher_id: publisherId,
        volume: volumes,
        price: prices,
      })
    }

    setLoading(false)
    alert('Saved!')
  }

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>➕ Add Books</h1>

        {/* Book Info */}
        <div style={styles.card}>
          <label style={styles.label}>Book Name</label>
          <input
            style={styles.input}
            placeholder="e.g. One Piece"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label style={styles.label}>Publisher</label>
          <select
            style={styles.input}
            value={publisherId}
            onChange={(e) => setPublisherId(e.target.value)}
          >
            <option value="">Select publisher</option>
            {publishers.map((pub) => (
              <option key={pub.id} value={pub.id}>
                {pub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Volume Section */}
        <div style={styles.sectionHeader}>
          <span>Volumes</span>
          <button style={styles.addBtn} onClick={addRow}>
            + Add
          </button>
        </div>

        {items.map((item, index) => (
          <div key={index} style={styles.rowCard}>
            <input
              style={styles.smallInput}
              placeholder="Vol"
              value={item.volume}
              onChange={(e) => updateItem(index, 'volume', e.target.value)}
            />
            <input
              style={styles.smallInput}
              placeholder="Price"
              value={item.price}
              onChange={(e) => updateItem(index, 'price', e.target.value)}
            />
            {items.length > 1 && (
              <button style={styles.removeBtn} onClick={() => removeRow(index)}>
                ✕
              </button>
            )}
          </div>
        ))}

        {/* Spacer for sticky button */}
        <div style={{ height: 80 }} />
      </div>

      {/* Sticky Submit */}
      <div style={styles.footer}>
        <button
          style={styles.submitBtn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : '💾 Save'}
        </button>
      </div>
    </Layout>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  title: {
    marginBottom: 4,
  },

  card: {
    background: '#fff',
    padding: 16,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  label: {
    fontSize: 12,
    color: '#666',
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: '1px solid #ddd',
    fontSize: 14,
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  addBtn: {
    border: 'none',
    background: '#111',
    color: '#fff',
    padding: '6px 10px',
    borderRadius: 8,
    cursor: 'pointer',
  },

  rowCard: {
    display: 'flex',
    gap: 8,
    background: '#fff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },

  smallInput: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: '1px solid #ddd',
  },

  removeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#999',
    fontSize: 16,
    cursor: 'pointer',
  },

  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    borderTop: '1px solid #eee',
    padding: 12,
  },

  submitBtn: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    border: 'none',
    background: '#111',
    color: '#fff',
    fontSize: 16,
    cursor: 'pointer',
  },
}
