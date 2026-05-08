import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { motion } from 'framer-motion';
import './Home.css';

export default function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter(p => p.title.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery));
  }, [searchQuery]);

  return (
    <div className="home-container">
      {!searchQuery && (
        <div className="hero-section">
          <div className="hero-gradient"></div>
          <img 
            className="hero-image"
            src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg" 
            alt="Hero Banner" 
          />
        </div>
      )}
      
      <div className="container products-container">
        {searchQuery && (
          <div className="search-results-header">
            <h2>Results for "{searchQuery}"</h2>
            <p>{filteredProducts.length} results</p>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <h3>No results for {searchQuery}.</h3>
            <p>Try checking your spelling or use more general terms</p>
          </div>
        ) : (
          <motion.div 
            className="products-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
