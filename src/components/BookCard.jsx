import { formatVolumes } from '../utils/formatVolumes'

export default function BookCard({ book }) {
  return (
    <div style={styles.card}>
      <h3>{book.name}</h3>
      <p style={styles.publisher}>{book.publisher}</p>

      <p style={styles.volumes}>📚 Vol: {formatVolumes(book.volume)}</p>
    </div>
  )
}

// export default function BookCard({ book }) {
//   return (
//     <div style={styles.card}>
//       <h3 style={{ marginBottom: 4 }}>{book.name}</h3>
//       <p style={styles.publisher}>{book.publisher}</p>

//       <div style={styles.volumes}>
//         {book.volume?.map((v, i) => (
//           <span key={i} style={styles.tag}>
//             Vol {v} {book.price?.[i] && `- ฿${book.price[i]}`}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }

const styles = {
  card: {
    background: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  publisher: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  volumes: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    background: '#eee',
    padding: '4px 8px',
    borderRadius: 6,
    fontSize: 12,
  },
}
