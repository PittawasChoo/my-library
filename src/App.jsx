import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import AddBooks from './pages/AddBooks'
import Navbar from './components/Navbar'
import AddWishlist from './pages/AddWishlist'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/add" element={<AddBooks />} />
        <Route path="/add-wishlist" element={<AddWishlist />} />
      </Routes>
    </>
  )
}
