import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function FreshProductsPage({ onAddToCart, cartItems, onQuickView }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.farm.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended
  });

  return (
    <main className="store-page">
      <header className="store-hero">
        <div className="store-hero-content">
          <span className="eyebrow">ORGANIC FARM MARKETPLACE</span>
          <h1>Harvest Direct <em>Fresh Products</em></h1>
          <p>Hand-picked daily by certified organic growers. Delivered straight to your doorstep.</p>

          {/* Search & Controls */}
          <div className="store-controls-wrap">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search organic tomatoes, avocados, raw honey, farm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            <div className="sort-selector">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Featured Harvest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Product Grid Section */}
      <section className="store-catalog-section">
        <div className="catalog-header">
          <p className="results-count">
            Showing <strong>{filteredProducts.length}</strong> fresh organic product(s)
          </p>

          {selectedCategory !== 'all' && (
            <button className="reset-filter-btn" onClick={() => setSelectedCategory('all')}>
              Reset Category ×
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results-box">
            <span className="no-results-icon">🥬</span>
            <h3>No produce found matching your search</h3>
            <p>Try searching for different keywords or explore other categories.</p>
            <button 
              className="button button-dark"
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            >
              View All Products <span>↗</span>
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const inCart = cartItems.find((item) => item.product.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  cartQuantity={inCart ? inCart.quantity : 0}
                  onQuickView={onQuickView}
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
