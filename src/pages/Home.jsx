import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import BookCard from '../components/BookCard'
import { getBooks } from '../api/book'
import { getPublishers } from '../api/publisher'
import { formatBooks } from '../utils/formatBooks'

export default function Home() {
  const [books, setBooks] = useState([])

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
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Layout>
  )
}
