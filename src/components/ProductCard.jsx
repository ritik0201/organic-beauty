import React from 'react';

export default function ProductCard({ product, onAddToCart, cartQuantity, onQuickView }) {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="product-card">
      <div className="product-image-wrap" onClick={() => onQuickView(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          loading="lazy" 
        />
        {product.tag && <span className="product-badge">{product.tag}</span>}
        {discountPercent > 0 && <span className="discount-badge">-{discountPercent}%</span>}
        <button 
          className="quick-view-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
        >
          Quick View ↗
        </button>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="farm-origin">📍 {product.farm}</span>
          <div className="product-rating">
            <span className="star">★</span>
            <strong>{product.rating}</strong>
            <small>({product.reviews})</small>
          </div>
        </div>

        <h3 className="product-title" onClick={() => onQuickView(product)}>
          {product.name}
        </h3>
        
        <p className="product-unit">Unit: {product.unit} · <span className="harvest-tag">{product.harvestDate}</span></p>

        <div className="product-footer">
          <div className="price-block">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>

          <div className="card-actions">
            {cartQuantity > 0 ? (
              <div className="qty-control">
                <button 
                  onClick={() => onAddToCart(product, -1)} 
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{cartQuantity}</span>
                <button 
                  onClick={() => onAddToCart(product, 1)} 
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button 
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product, 1)}
              >
                Add <span>+</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
