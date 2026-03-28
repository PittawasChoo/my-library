import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/add">Add Books</Link>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '12px',
    borderBottom: '1px solid #ccc',
    flexWrap: 'wrap'
  }
}