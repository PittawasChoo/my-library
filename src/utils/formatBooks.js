export function formatBooks(books, publishers) {
  return books.map((book) => ({
    ...book,
    publisher:
      publishers.find((p) => p.id === book.publisher_id)?.name || 'Unknown',
  }))
}
