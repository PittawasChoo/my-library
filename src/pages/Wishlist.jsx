import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    const { data } = await supabase.from('wishlist').select('*')
    setBooks(data)
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        padding: 16,
      }}
    >
      <h1>My Books</h1>
      {books.map((book) => (
        <div key={book.id}>
          <h3>{book.name}</h3>
          <p>Volumes: {book.volume?.join(', ')}</p>
        </div>
      ))}
    </div>
  )
}
