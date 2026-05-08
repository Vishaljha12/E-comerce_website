import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const addToCart = useStore(state => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>
      
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                fill={i < Math.floor(product.rating) ? "#FFA41C" : "none"} 
                color={i < Math.floor(product.rating) ? "#FFA41C" : "#ccc"} 
              />
            ))}
          </div>
          <span className="reviews-count">{product.reviews.toLocaleString()}</span>
        </div>
        
        <div className="product-price">
          <span className="currency">₹</span>
          <span className="whole">{Math.floor(product.price).toLocaleString('en-IN')}</span>
          <span className="fraction">{(product.price % 1).toFixed(2).substring(2)}</span>
        </div>
        
        <button onClick={handleAddToCart} className="btn btn-primary add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
