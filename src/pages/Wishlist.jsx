import { useEffect, useState } from 'react'
import { formatBooks } from '../utils/formatBooks'
import { getPublishers } from '../api/publisher'
import { getWishlist } from '../api/wishlist'
import { useFuzzySearch } from '../hooks/useFuzzySearch'
import BookCard from '../components/BookCard'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'

export default function Wishlist() {
  const [books, setBooks] = useState([])
  const { query, setQuery, results } = useFuzzySearch(books)

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
      <SearchBar value={query} onChange={setQuery} />

      {results.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Layout>
  )
}
