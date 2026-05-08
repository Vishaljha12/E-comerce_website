import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import './Navbar.css';

export default function Navbar() {
  const { cart, user, searchQuery, setSearchQuery, setUser } = useStore();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchQuery}`);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="nav-top">
        <Link to="/" className="nav-logo">
          <span className="logo-text">My<span className="logo-highlight">Mart</span></span>
        </Link>

        <Link to="/address" className="nav-location" style={{ color: 'inherit', textDecoration: 'none' }}>
          <MapPin size={18} />
          <div className="location-text">
            <span className="loc-small">Deliver to</span>
            <span className="loc-bold">Select your address</span>
          </div>
        </Link>

        <form className="nav-search" onSubmit={handleSearch}>
          <select className="search-select">
            <option>All</option>
            <option>Electronics</option>
            <option>Computers</option>
          </select>
          <input 
            type="text" 
            placeholder="Search MyMart" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <Search size={20} color="#111" />
          </button>
        </form>

        <div className="nav-actions">
          {user ? (
            <div className="nav-action-item dropdown">
              <span className="action-small">Hello, {user.name}</span>
              <span className="action-bold">Account & Lists</span>
              <div className="dropdown-content">
                <button onClick={handleLogout} className="btn btn-outline" style={{width: '100%'}}>Sign Out</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-action-item">
              <span className="action-small">Hello, sign in</span>
              <span className="action-bold">Account & Lists</span>
            </Link>
          )}

          <Link to="/orders" className="nav-action-item">
            <span className="action-small">Returns</span>
            <span className="action-bold">& Orders</span>
          </Link>

          <Link to="/cart" className="nav-cart">
            <div className="cart-icon-wrapper">
              <ShoppingCart size={32} />
              <span className="cart-count">{cartItemsCount}</span>
            </div>
            <span className="cart-text">Cart</span>
          </Link>
        </div>
      </div>
      
      <div className="nav-bottom">
        <div className="menu-btn">
          <Menu size={20} /> All
        </div>
        <div className="nav-links">
          <Link to="/">Today's Deals</Link>
          <Link to="/customer-care">Customer Service</Link>
          <Link to="/">Registry</Link>
          <Link to="/gift-cards">Gift Cards</Link>
          <Link to="/seller">Sell</Link>
        </div>
      </div>
    </header>
  );
}
