import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';

import './index.css';
import HomePage from './pages/HomePage';
import FreshProductsPage from './pages/FreshProductsPage';
import OurMissionPage from './pages/OurMissionPage';
import FarmerSupportPage from './pages/FarmerSupportPage';

import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import ToastNotification from './components/ToastNotification';

// Auto Scroll To Top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('organic_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartSummary, setCartSummary] = useState({ subtotal: 0, discountAmount: 0, deliveryFee: 0, total: 0 });
  const [completedOrder, setCompletedOrder] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('organic_cart', JSON.stringify(cartItems));
    } catch {
      // localStorage fallback
    }
  }, [cartItems]);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleAddToCart = (product, deltaQty = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newQty = prev[existingIndex].quantity + deltaQty;
        if (newQty <= 0) {
          showToast('Removed from Basket', `${product.name} removed`, 'info');
          return prev.filter((item) => item.product.id !== product.id);
        }
        showToast('Basket Updated', `${product.name} (Qty: ${newQty})`, 'success');
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else if (deltaQty > 0) {
        showToast('Added to Basket', `${deltaQty}x ${product.name}`, 'success');
        return [...prev, { product, quantity: deltaQty }];
      }
      return prev;
    });
  };

  const handleUpdateQty = (productId, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item Removed', 'Item removed from your basket', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Basket Cleared', 'All items removed', 'info');
  };

  const handleProceedToCheckout = (summary) => {
    setCartSummary(summary);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = (orderData) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setCompletedOrder(orderData);
    showToast('Order Placed Successfully!', `Order #${orderData.orderId} confirmed`, 'success');
  };

  // Total cart item count
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <ScrollToTop />
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Mobile Nav Backdrop */}
      {menuOpen && <div className="nav-backdrop" onClick={closeMenu} />}

      {/* Navigation */}
      <nav className="nav">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">✦</span> Aura<span>Botanica</span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/fresh-products" 
            className={({ isActive }) => `nav-tab highlight-tab ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Organic Store <span className="badge-new">Beauty</span>
          </NavLink>

          <NavLink 
            to="/our-mission" 
            className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Clean Mission
          </NavLink>

          <NavLink 
            to="/farmer-support" 
            className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Skin Consultation
          </NavLink>

          <button className="nav-contact" onClick={() => { setContactOpen(true); closeMenu(); }}>
            Beauty Advisor <span>↗</span>
          </button>
        </div>

        <div className="nav-right-actions">
          <button 
            className="cart-trigger-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Beauty Basket"
          >
            <span className="cart-icon">🛍️</span>
            <span className="cart-label">Basket</span>
            {totalCartCount > 0 && <span className="cart-badge-count">{totalCartCount}</span>}
          </button>

          <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '×' : '☰'}
          </button>
        </div>
      </nav>

      {/* Page Routing */}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              onAddToCart={handleAddToCart} 
              cartItems={cartItems} 
              onQuickView={setQuickViewProduct} 
              onOpenContact={() => setContactOpen(true)} 
            />
          } 
        />
        <Route 
          path="/fresh-products" 
          element={
            <FreshProductsPage 
              onAddToCart={handleAddToCart} 
              cartItems={cartItems} 
              onQuickView={setQuickViewProduct} 
            />
          } 
        />
        <Route path="/our-mission" element={<OurMissionPage />} />
        <Route path="/farmer-support" element={<FarmerSupportPage />} />
      </Routes>

      {/* Footer */}
      <footer>
        <Link className="brand" to="/" onClick={() => window.scrollTo(0, 0)}>
          <span className="brand-mark">✦</span> Aura<span>Botanica</span>
        </Link>
        <p>Pure Botanical Science · 100% Organic Makeup & Clean Skincare</p>
        <div>
          <Link to="/">Home</Link>
          <Link to="/fresh-products">Organic Store</Link>
          <Link to="/our-mission">Clean Mission</Link>
          <Link to="/farmer-support">Skin Consultation</Link>
          <button onClick={() => setContactOpen(true)}>Beauty Advisor</button>
        </div>
        <small>© 2026 Aura Botanica · Organic Makeup & Botanical Skincare</small>
      </footer>

      {/* Contact Form Modal */}
      {contactOpen && (
        <div className="modal-backdrop" onClick={() => setContactOpen(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" aria-label="Close contact form" onClick={() => setContactOpen(false)}>×</button>
            {submitted ? (
              <div className="success">
                <span>✦</span>
                <h2>Message received.</h2>
                <p>We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <>
                <p className="eyebrow">LET&apos;S GROW TOGETHER</p>
                <h2>Say hello.</h2>
                <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                  <label>Name<input required placeholder="Your name" /></label>
                  <label>Email<input required type="email" placeholder="you@example.com" /></label>
                  <label>Message<textarea required placeholder="Tell us what you&apos;re growing..."></textarea></label>
                  <button className="button button-dark" type="submit">Send message <span>↗</span></button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          cartQuantity={cartItems.find((item) => item.product.id === quickViewProduct.id)?.quantity || 0}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal Simulation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        cartSummary={cartSummary}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Order Success Confirmation */}
      {completedOrder && (
        <OrderSuccessModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}