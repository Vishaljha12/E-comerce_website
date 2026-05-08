import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Seller from './pages/seller';
import CustomerCare from './pages/CustomerCare';
import GiftCards from './pages/GiftCards';
function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/customer-care" element={<CustomerCare />} />
            <Route path="/gift-cards" element={<GiftCards />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
