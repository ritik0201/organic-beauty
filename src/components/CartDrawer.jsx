import React, { useState } from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 49;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'GLOW10' || cleanCode === 'ORGANIC10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Beauty Discount Applied!');
    } else if (cleanCode === 'AURA15' && subtotal >= 999) {
      setDiscountPercent(15);
      setPromoSuccess('15% Botanical Deal Applied!');
    } else {
      setPromoError('Invalid promo code. Try "GLOW10"');
    }
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div>
            <h3>Your Beauty Basket</h3>
            <span className="cart-count-subtitle">{cartItems.length} product(s) selected</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <span className="empty-icon">🛍️</span>
            <h4>Your basket is empty</h4>
            <p>Explore our pure organic skincare and botanical velvet makeup collection.</p>
            <button className="button button-dark" onClick={onClose}>
              Browse Beauty Products <span>↗</span>
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item">
                  <img src={product.image} alt={product.name} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4>{product.name}</h4>
                    <span className="cart-item-farm">📍 {product.farm}</span>
                    <span className="cart-item-unit">₹{product.price} / {product.unit}</span>
                    
                    <div className="cart-item-actions">
                      <div className="qty-control mini">
                        <button onClick={() => onUpdateQty(product.id, -1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => onUpdateQty(product.id, 1)}>+</button>
                      </div>

                      <button 
                        className="remove-item-btn" 
                        onClick={() => onRemoveItem(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price">
                    ₹{product.price * quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-promo-section">
              <form onSubmit={handleApplyPromo} className="promo-form">
                <input 
                  type="text" 
                  placeholder="Promo code (e.g. ORGANIC10)" 
                  value={promoCode} 
                  onChange={(e) => setPromoCode(e.target.value)} 
                />
                <button type="submit">Apply</button>
              </form>
              {promoError && <p className="promo-message error">{promoError}</p>}
              {promoSuccess && <p className="promo-message success">{promoSuccess}</p>}
            </div>

            <div className="cart-summary-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="summary-row discount">
                  <span>Promo Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Direct Delivery</span>
                <span>{deliveryFee === 0 ? <strong className="free-tag">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              {subtotal < 500 && (
                <p className="free-shipping-note">
                  Add ₹{500 - subtotal} more for <strong>FREE direct farm delivery</strong>!
                </p>
              )}

              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>

              <div className="cart-footer-buttons">
                <button 
                  className="button button-dark checkout-btn" 
                  onClick={() => {
                    onProceedToCheckout({ subtotal, discountAmount, deliveryFee, total, discountPercent });
                  }}
                >
                  Proceed to Checkout · ₹{total} <span>↗</span>
                </button>
                <button className="clear-cart-text-btn" onClick={onClearCart}>
                  Clear basket
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
