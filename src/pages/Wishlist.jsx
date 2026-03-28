import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import BookCard from '../components/BookCard'
import { getWishlist } from '../api/wishlist'
import { getPublishers } from '../api/publisher'
import { formatBooks } from '../utils/formatBooks'

export default function Wishlist() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [books, publishers] = await Promise.all([
      getWishlist(),
      getPublishers(),
    ])

    setBooks(formatBooks(books, publishers))
  }

  return (
    <Layout>
      <h1>⭐ Wishlist</h1>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Layout>
  )
}
