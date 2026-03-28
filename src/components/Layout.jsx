import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div style={styles.container}>
      <Navbar />
      <main style={styles.main}>{children}</main>
    </div>
  )
}

const styles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    background: '#f6f7fb',
    minHeight: '100vh',
  },
  main: {
    maxWidth: 700,
    margin: 'auto',
    padding: 16,
  },
}
