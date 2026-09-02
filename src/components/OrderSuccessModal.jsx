import React from 'react';

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-badge-icon">✦</div>
        
        <h2>Order Confirmed!</h2>
        <p className="success-subtitle">
          Thank you, <strong>{order.customer.fullName}</strong>. Your harvest request has been sent directly to our partner organic growers.
        </p>

        <div className="order-details-card">
          <div className="order-meta-header">
            <div>
              <small>ORDER NUMBER</small>
              <strong>{order.orderId}</strong>
            </div>
            <div>
              <small>ESTIMATED DELIVERY</small>
              <strong className="delivery-highlight">{order.customer.deliverySlot}</strong>
            </div>
          </div>

          <div className="order-address-box">
            <span>📍 Delivery Location:</span>
            <p>{order.customer.address}, {order.customer.city} - {order.customer.pincode}</p>
            <p><small>Contact: {order.customer.phone}</small></p>
          </div>

          <div className="order-items-breakdown">
            <h4>Harvest Summary ({order.items.length} items)</h4>
            {order.items.map(({ product, quantity }) => (
              <div key={product.id} className="order-item-row">
                <div className="item-row-left">
                  <span className="dot">•</span>
                  <span>{product.name}</span>
                  <small>× {quantity}</small>
                </div>
                <span>₹{product.price * quantity}</span>
              </div>
            ))}

            <div className="order-total-row">
              <span>Paid via {order.customer.paymentMethod.toUpperCase()}</span>
              <strong>Total Paid: ₹{order.summary.total}</strong>
            </div>
          </div>
        </div>

        <div className="farmer-note">
          <span className="sprout-icon">🌱</span>
          <p>
            By choosing organic, you just prevented <strong>1.2 kg</strong> of chemical pesticide runoff and directly supported local sustainable agriculture.
          </p>
        </div>

        <button className="button button-dark full-width-btn" onClick={onClose}>
          Back to Store <span>↗</span>
        </button>
      </div>
    </div>
  );
}
