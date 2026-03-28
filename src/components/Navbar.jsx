import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav style={styles.nav}>
      <NavItem to="/" active={pathname === '/'}>
        Home
      </NavItem>
      <NavItem to="/wishlist" active={pathname === '/wishlist'}>
        Wishlist
      </NavItem>
      <NavItem to="/add" active={pathname === '/add'}>
        Add
      </NavItem>
      <NavItem to="/add-wishlist" active={pathname === '/add-wishlist'}>
        +Wishlist
      </NavItem>
    </nav>
  )
}

function NavItem({ to, children, active }) {
  return (
    <Link
      to={to}
      style={{
        ...styles.link,
        background: active ? '#111' : 'transparent',
        color: active ? '#fff' : '#333',
      }}
    >
      {children}
    </Link>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: 12,
    background: '#fff',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
  },
  link: {
    padding: '8px 12px',
    borderRadius: 8,
    textDecoration: 'none',
    fontSize: 14,
  },
}
