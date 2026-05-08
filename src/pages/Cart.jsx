import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="container cart-container">
        <div className="cart-main">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your MyMart Cart is empty.</p>
              <Link to="/" className="btn btn-primary" style={{marginTop: '20px'}}>Continue Shopping</Link>
            </div>
          ) : (
            <div className="cart-items">
              <div className="cart-header text-muted">
                <span>Price</span>
              </div>
              {cart.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="cart-item"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="item-image-wrapper">
                    <img src={item.image} alt={item.title} className="item-image" />
                  </div>
                  <div className="item-details">
                    <Link to={`/product/${item.id}`} className="item-title">{item.title}</Link>
                    <p className="item-stock text-success">In Stock</p>
                    <div className="item-actions">
                      <select 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="quantity-select"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
                        ))}
                      </select>
                      <span className="separator">|</span>
                      <button className="delete-btn" onClick={() => removeFromCart(item.id)}>Delete</button>
                    </div>
                  </div>
                  <div className="item-price">
                    <strong>₹{item.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
                  </div>
                </motion.div>
              ))}
              <div className="cart-subtotal">
                Subtotal ({cartItemsCount} item{cartItemsCount !== 1 ? 's' : ''}): <strong>₹{subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sidebar">
            <div className="card checkout-card">
              <div className="free-shipping-msg">
                <span className="text-success">✔</span> Your order qualifies for FREE Shipping.
              </div>
              <div className="checkout-subtotal">
                Subtotal ({cartItemsCount} item{cartItemsCount !== 1 ? 's' : ''}): <strong>₹{subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
              </div>
              <button 
                className="btn btn-primary proceed-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
