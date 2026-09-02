import React, { useState } from 'react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  cartSummary,
  onCompleteOrder
}) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    address: 'Flat 402, Green Meadows Apartment, MG Road',
    city: 'Pune',
    pincode: '411001',
    deliverySlot: 'Tomorrow Morning (7:00 AM - 9:30 AM)',
    paymentMethod: 'upi',
    upiId: 'rahul@okaxis'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = 'AURA-' + Math.floor(100000 + Math.random() * 900000);
      onCompleteOrder({
        orderId: generatedOrderId,
        customer: formData,
        items: cartItems,
        summary: cartSummary,
        placedAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close checkout">×</button>

        <div className="checkout-header">
          <p className="eyebrow">CLEAN BEAUTY CHECKOUT</p>
          <h2>{step === 1 ? 'Shipping Address' : 'Payment & Delivery'}</h2>

          <div className="checkout-stepper">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1. Shipping Details</div>
            <div className="step-line"></div>
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2. Payment & Confirmation</div>
          </div>
        </div>

        <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmitOrder}>
          {step === 1 ? (
            <div className="form-step">
              <div className="form-row dual">
                <label>
                  Full Name
                  <input
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter recipient name"
                  />
                </label>
                <label>
                  Mobile Phone Number
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                  />
                </label>
              </div>

              <label>
                Delivery Street Address
                <input
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House/Flat No, Apartment, Street name"
                />
              </label>

              <div className="form-row triple">
                <label>
                  City
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Pincode
                  <input
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Morning Harvest Slot
                  <select
                    name="deliverySlot"
                    value={formData.deliverySlot}
                    onChange={handleChange}
                  >
                    <option value="Tomorrow Morning (7:00 AM - 9:30 AM)">Tomorrow Morning (7-9:30 AM)</option>
                    <option value="Tomorrow Evening (5:00 PM - 7:30 PM)">Tomorrow Evening (5-7:30 PM)</option>
                    <option value="Day After Morning (7:00 AM - 9:30 AM)">Day After Morning (7-9:30 AM)</option>
                  </select>
                </label>
              </div>

              <div className="checkout-actions">
                <button type="submit" className="button button-dark full-width-btn">
                  Continue to Payment <span>→</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="checkout-step-2-grid">
              <div className="payment-options-grid">
                <h4>Select Payment Mode</h4>

                <label className={`payment-card ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                  />
                  <div className="payment-label">
                    <strong>UPI / GPay / PhonePe / Paytm</strong>
                    <small>Instant zero-fee transfer</small>
                  </div>
                  <span className="pay-icon">📱</span>
                </label>

                {formData.paymentMethod === 'upi' && (
                  <div className="upi-input-box">
                    <input
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="Enter UPI ID (e.g. user@okicici)"
                      required
                    />
                  </div>
                )}

                <label className={`payment-card ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <div className="payment-label">
                    <strong>Cash on Delivery (COD)</strong>
                    <small>Pay cash or QR scan at your doorstep</small>
                  </div>
                  <span className="pay-icon">💵</span>
                </label>

                <label className={`payment-card ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <div className="payment-label">
                    <strong>Credit / Debit Card</strong>
                    <small>Visa, Mastercard, RuPay</small>
                  </div>
                  <span className="pay-icon">💳</span>
                </label>
              </div>

              <div className="checkout-summary-column">
                <div className="checkout-summary-mini">
                  <div className="mini-summary-header">
                    <span>Order Items ({cartItems.length})</span>
                    <strong>Total: ₹{cartSummary.total}</strong>
                  </div>
                  <div className="mini-items-scroll">
                    {cartItems.map(({ product, quantity }) => (
                      <div key={product.id} className="mini-item-pill">
                        <span>{product.name} × {quantity}</span>
                        <span>₹{product.price * quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="checkout-actions dual">
                  <button type="button" className="button button-light" onClick={() => setStep(1)}>
                    ← Back to Address
                  </button>
                  <button
                    type="submit"
                    className="button button-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Securing Order...' : `Confirm & Pay ₹${cartSummary.total} ↗`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
