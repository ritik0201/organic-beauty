import { useState, useEffect } from 'react';

import './index.css';
import { PRODUCTS, CATEGORIES, HOME_GALLERY } from './data/products';
import ProductCard from './components/ProductCard';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import ToastNotification from './components/ToastNotification';

function App() {
  const [activeTab, setActiveTab] = useState('home');
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

  // Filters & Store State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

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

  // Filtered & Sorted Products
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Navigation */}
      <nav className="nav">
        <a className="brand" href="#home" onClick={() => { setActiveTab('home'); closeMenu(); }}>
          <span className="brand-mark">✦</span> Organic<span>Farming</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <button 
            className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => { setActiveTab('home'); closeMenu(); }}
          >
            Home
          </button>
          
          <button 
            className={`nav-tab highlight-tab ${activeTab === 'store' ? 'active' : ''}`}
            onClick={() => { setActiveTab('store'); closeMenu(); }}
          >
            Fresh Products <span className="badge-new">Store</span>
          </button>

          <a href="#about" onClick={() => { setActiveTab('home'); closeMenu(); }}>Our mission</a>
          <a href="#schemes" onClick={() => { setActiveTab('home'); closeMenu(); }}>Farmer support</a>

          <button className="nav-contact" onClick={() => { setContactOpen(true); closeMenu(); }}>
            Talk to us <span>↗</span>
          </button>
        </div>

        <div className="nav-right-actions">
          <button 
            className="cart-trigger-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Shopping Basket"
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-label">Basket</span>
            {totalCartCount > 0 && <span className="cart-badge-count">{totalCartCount}</span>}
          </button>

          <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '×' : '☰'}
          </button>
        </div>
      </nav>

      {/* Main Content View Switch */}
      {activeTab === 'home' ? (
        <main>
          {/* Hero Section */}
          <section className="hero" id="home">
            <div className="hero-copy">
              <p className="eyebrow">Grown with care · delivered with trust</p>
              <h1>Good food begins<br /><em>with good soil.</em></h1>
              <p className="hero-text">
                A simpler, direct way to buy fresh organic produce directly from independent local farmers.
              </p>
              <div className="hero-actions">
                <button 
                  className="button button-dark" 
                  onClick={() => setActiveTab('store')}
                >
                  Explore Fresh Products <span>↗</span>
                </button>
                <button className="text-link" onClick={() => setContactOpen(true)}>
                  I&apos;m a farmer <span>→</span>
                </button>
              </div>

              <div className="hero-proof">
                <div className="avatar-stack">
                  <span>R</span><span>A</span><span>S</span><span>+</span>
                </div>
                <p><strong>2,400+</strong><br />local eco-growers already with us</p>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-plant-container">
                <img 
                  src="/organic_tomatoes_cutout.jpg" 
                  alt="Fresh Organic Vine Tomatoes" 
                  className="hero-plant-img" 
                />
                <div className="plant-tag-badge">
                  <span>🌱 100% Organic Heirloom Tomatoes · Satara Farm</span>
                </div>
              </div>
            </div>
          </section>

          {/* High-Quality Imagery Showcase Section */}
          <section className="gallery-showcase">
            <div className="section-label">VISUAL HARVEST STORIES</div>
            <h2>Pure, vibrant organic produce <br /><em>straight from native soil.</em></h2>

            <div className="gallery-grid">
              {HOME_GALLERY.map((item, idx) => (
                <div key={idx} className="gallery-card">
                  <img src={item.image} alt={item.title} className="gallery-card-img" />
                  <div className="gallery-overlay">
                    <span className="gallery-tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Preview Harvest Section */}
          <section className="home-produce-preview">
            <div className="section-heading">
              <div>
                <div className="section-label">SEASONAL HIGHLIGHTS</div>
                <h2>Fresh from today&apos;s <em>harvest.</em></h2>
              </div>
              <button className="under-link" onClick={() => setActiveTab('store')}>
                View all {PRODUCTS.length} products <span>↗</span>
              </button>
            </div>

            <div className="home-products-grid">
              {PRODUCTS.slice(0, 4).map((product) => {
                const inCart = cartItems.find((item) => item.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    cartQuantity={inCart ? inCart.quantity : 0}
                    onQuickView={setQuickViewProduct}
                  />
                );
              })}
            </div>
          </section>

          {/* Mission Band */}
          <section className="intro-band" id="about">
            <div className="section-label">01 / WHY US</div>
            <div className="intro-content">
              <h2>From our fields<br />to your <em>table.</em></h2>
              <p>We believe the best food has a story you can trace. We connect you with thoughtful growers, shorten the journey, and keep more of your rupee with the farmer.</p>
              <button className="under-link" onClick={() => setActiveTab('store')}>
                Shop Fresh Harvest <span>↗</span>
              </button>
            </div>
          </section>

          {/* Features Grid */}
          <section className="features" id="produce">
            <div className="section-heading">
              <div>
                <div className="section-label">02 / THE GOOD STUFF</div>
                <h2>Grown for <em>good.</em></h2>
              </div>
              <p>Small choices in the field make a big difference on your plate.</p>
            </div>
            
            <div className="feature-grid">
              <article className="feature-card feature-image">
                <div className="feature-photo feature-photo-01"></div>
                <div className="feature-overlay">
                  <span>01</span>
                  <h3>Peak freshness</h3>
                  <p>Harvested when it tastes best, never when it&apos;s convenient.</p>
                </div>
              </article>

              <article className="feature-card feature-image">
                <div className="feature-photo feature-photo-02"></div>
                <div className="feature-overlay">
                  <span>02</span>
                  <h3>Fair by nature</h3>
                  <p>Transparent prices mean growers earn more and you know exactly where your money goes.</p>
                  <a href="#schemes" className="feature-link">How it works <span>↗</span></a>
                </div>
              </article>

              <article className="feature-card feature-image">
                <div className="feature-photo feature-photo-03"></div>
                <div className="feature-overlay quote-overlay">
                  <span>03</span>
                  <div className="quote-mark">“</div>
                  <p className="quote">The vegetables taste like the ones my grandmother grew.</p>
                  <p className="quote-author">— Meera, Pune</p>
                </div>
              </article>
            </div>
          </section>

          {/* Schemes section */}
          <section className="schemes" id="schemes">
            <div className="section-label">03 / FOR GROWERS</div>
            <div className="scheme-layout">
              <div>
                <h2>Rooted in a<br /><em>better future.</em></h2>
                <p>Resources, fair pricing, and a community that helps independent farmers thrive.</p>
                <button className="button button-light" onClick={() => setContactOpen(true)}>
                  Join our grower network <span>↗</span>
                </button>
              </div>

              <div className="scheme-list">
                <div><span>01</span><strong>Fair market access</strong><p>Sell directly without the middlemen.</p></div>
                <div><span>02</span><strong>Growing support</strong><p>Practical tools for healthier soil.</p></div>
                <div><span>03</span><strong>Reliable community</strong><p>Grow alongside people who care.</p></div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* Fresh Products Page Store */
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
                      onAddToCart={handleAddToCart}
                      cartQuantity={inCart ? inCart.quantity : 0}
                      onQuickView={setQuickViewProduct}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </main>
      )}

      {/* Footer */}
      <footer>
        <a className="brand" href="#home" onClick={() => setActiveTab('home')}>
          <span className="brand-mark">✦</span> Organic<span>Farming</span>
        </a>
        <p>Better food. Better soil. Better together.</p>
        <div>
          <button onClick={() => setActiveTab('home')}>Home</button>
          <button onClick={() => setActiveTab('store')}>Fresh Store</button>
          <button onClick={() => setContactOpen(true)}>Contact</button>
        </div>
        <small>© 2026 Organic Farming · Fresh Produce Direct</small>
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

export default App;