import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useStore(state => state.addToCart);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="container" style={{padding: '40px'}}>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <motion.div 
      className="container product-detail-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-gallery">
        <div className="main-image-wrapper">
          <img src={product.image} alt={product.title} className="main-image" />
        </div>
      </div>
      
      <div className="product-info-main">
        <h1 className="product-title-large">{product.title}</h1>
        
        <div className="product-rating-large">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                fill={i < Math.floor(product.rating) ? "#FFA41C" : "none"} 
                color={i < Math.floor(product.rating) ? "#FFA41C" : "#ccc"} 
              />
            ))}
          </div>
          <span className="reviews-count">{product.reviews.toLocaleString()} ratings</span>
        </div>
        
        <div className="product-price-large">
          <span className="currency">₹</span>
          <span className="whole">{Math.floor(product.price).toLocaleString('en-IN')}</span>
          <span className="fraction">{(product.price % 1).toFixed(2).substring(2)}</span>
        </div>

        <div className="product-description">
          <h3>About this item</h3>
          <p>{product.description}</p>
        </div>

        <div className="product-features">
          <div className="feature">
            <Truck size={32} color="#007185" />
            <span>Free Delivery</span>
          </div>
          <div className="feature">
            <RotateCcw size={32} color="#007185" />
            <span>30 Day Returns</span>
          </div>
          <div className="feature">
            <ShieldCheck size={32} color="#007185" />
            <span>1 Year Warranty</span>
          </div>
        </div>
      </div>

      <div className="product-action-sidebar">
        <div className="card action-card">
          <div className="price-display">
            <h2>₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
          </div>
          <div className="delivery-info">
            <p className="text-success">In Stock.</p>
            <p>FREE delivery <strong>Tomorrow</strong></p>
          </div>
          
          <button onClick={handleAddToCart} className="btn btn-primary btn-add-cart">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="btn btn-outline btn-buy-now">
            Buy Now
          </button>
          
          <div className="secure-transaction">
            <ShieldCheck size={16} />
            <span>Secure transaction</span>
          </div>
          
          <div className="ships-from">
            <div className="ship-row">
              <span className="ship-label">Ships from</span>
              <span className="ship-val">MyMart</span>
            </div>
            <div className="ship-row">
              <span className="ship-label">Sold by</span>
              <span className="ship-val">MyMart</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
