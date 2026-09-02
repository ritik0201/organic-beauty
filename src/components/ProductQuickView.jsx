import React, { useState } from 'react';

export default function ProductQuickView({ product, onClose, onAddToCart, cartQuantity }) {
  const [qty, setQty] = useState(cartQuantity || 1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty - (cartQuantity || 0));
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close product view">×</button>
        
        <div className="quickview-grid">
          <div className="quickview-image-container">
            <img src={product.image} alt={product.name} className="quickview-img" />
            <span className="organic-stamp">100% ORGANIC</span>
          </div>

          <div className="quickview-details">
            <span className="eyebrow">{product.category.toUpperCase()} · {product.farm}</span>
            <h2>{product.name}</h2>
            
            <div className="quickview-rating">
              <span className="star">★</span>
              <strong>{product.rating}</strong> ({product.reviews} verified farm reviews)
            </div>

            <p className="quickview-desc">{product.description}</p>

            <div className="nutrition-box">
              <h4>Nutritional Highlights</h4>
              <div className="nutrition-tags">
                {Object.entries(product.nutrition || {}).map(([key, val]) => (
                  <div key={key} className="nutrition-chip">
                    <span>{key}</span>
                    <strong>{val}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="quickview-price-row">
              <div>
                <span className="quickview-price">₹{product.price}</span>
                {product.originalPrice && <span className="quickview-orig-price">₹{product.originalPrice}</span>}
                <small className="unit-label">per {product.unit}</small>
              </div>

              <div className="quickview-qty-selector">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>

            <button className="button button-dark full-width-btn" onClick={handleAdd}>
              Add {qty} to Basket · ₹{product.price * qty} <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
