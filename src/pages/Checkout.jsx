import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <motion.div 
        className="checkout-success"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle size={64} color="#067D62" />
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with MyMart.</p>
        <p>Redirecting to home...</p>
      </motion.div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{padding: '40px', textAlign: 'center'}}>
        <h2>Your cart is empty.</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{marginTop: '20px'}}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-container">
        <div className="checkout-main">
          <h2>Checkout</h2>
          
          <div className="checkout-section">
            <h3>1. Shipping address</h3>
            <div className="checkout-section-content">
              <p>John Doe</p>
              <p>123 Main St, Apt 4B</p>
              <p>New York, NY 10001</p>
              <a href="#" className="link">Change</a>
            </div>
          </div>

          <div className="checkout-section">
            <h3>2. Payment method</h3>
            <div className="checkout-section-content">
              <p>Visa ending in 1234</p>
              <p>Billing address: Same as shipping</p>
              <a href="#" className="link">Change</a>
            </div>
          </div>

          <div className="checkout-section">
            <h3>3. Review items and shipping</h3>
            <div className="checkout-section-content">
              {cart.map(item => (
                <div key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.title} />
                  <div className="checkout-item-info">
                    <h4>{item.title}</h4>
                    <p className="price">${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="checkout-sidebar">
          <div className="card summary-card">
            <button 
              className="btn btn-primary place-order-btn"
              onClick={handlePlaceOrder}
            >
              Place your order
            </button>
            <p className="terms-text">By placing your order, you agree to MyMart's privacy notice and conditions of use.</p>
            
            <div className="summary-details">
              <h4>Order Summary</h4>
              <div className="summary-row">
                <span>Items:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping & handling:</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row">
                <span>Total before tax:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated tax to be collected:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Order total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
