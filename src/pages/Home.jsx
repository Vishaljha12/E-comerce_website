import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';

const CAROUSEL_IMAGES = [
  "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
];

export default function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (searchQuery) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [searchQuery]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter(p => p.title.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery));
  }, [searchQuery]);

  const productsByCategory = useMemo(() => {
    if (searchQuery) return {};
    const grouped = {};
    products.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });
    return grouped;
  }, [searchQuery]);

  return (
    <div className="home-container">
      {!searchQuery && (
        <div className="hero-section">
          <div className="hero-gradient"></div>
          <div className="carousel">
            <AnimatePresence initial={false}>
              <motion.img 
                key={currentSlide}
                src={CAROUSEL_IMAGES[currentSlide]}
                alt={`Hero Banner ${currentSlide + 1}`}
                className="hero-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <button className="carousel-btn prev" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="carousel-btn next" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        </div>
      )}
      
      <div className="container products-container" style={{ marginTop: searchQuery ? '40px' : '-250px', position: 'relative', zIndex: 10 }}>
        {searchQuery ? (
          <>
            <div className="search-results-header" style={{ marginBottom: '20px' }}>
              <h2>Results for "{searchQuery}"</h2>
              <p>{filteredProducts.length} results</p>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="no-results">
                <h3>No results for {searchQuery}.</h3>
                <p>Try checking your spelling or use more general terms</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="categories-sections">
            {Object.keys(productsByCategory).map((category, index) => (
              <div key={category} className="category-section" style={{ marginBottom: '50px' }}>
                <h2 style={{ 
                  marginBottom: '20px', 
                  background: 'white', 
                  padding: '15px 25px', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
                  fontSize: '1.4rem', 
                  fontWeight: '700', 
                  color: '#0f172a',
                  borderLeft: '5px solid #f59e0b',
                  display: 'inline-block'
                }}>
                  {index === 0 ? `Trending in ${category}` : `Top Picks in ${category}`}
                </h2>
                <motion.div 
                  className="products-grid"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                >
                  {productsByCategory[category].map(product => (
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
