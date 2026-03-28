import { useEffect, useState } from 'react'
import { formatBooks } from '../utils/formatBooks'
import { getBooks } from '../api/book'
import { getPublishers } from '../api/publisher'
import { useFuzzySearch } from '../hooks/useFuzzySearch'
import BookCard from '../components/BookCard'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const [books, setBooks] = useState([])
  const { query, setQuery, results } = useFuzzySearch(books)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [books, publishers] = await Promise.all([getBooks(), getPublishers()])

    setBooks(formatBooks(books, publishers))
  }

  return (
    <Layout>
      <h1>📚 My Books</h1>
      <SearchBar value={query} onChange={setQuery} />

      {results.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Layout>
  )
}
