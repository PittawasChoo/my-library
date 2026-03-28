export default function SearchBar({ value, onChange }) {
  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="🔍 Search books..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

const styles = {
  container: {
    marginBottom: 12,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    border: '1px solid #ddd',
    fontSize: 14,
  },
}
