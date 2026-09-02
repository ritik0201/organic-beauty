import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, HOME_GALLERY } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function HomePage({ onAddToCart, cartItems, onQuickView, onOpenContact }) {
  return (
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
            <Link className="button button-dark" to="/fresh-products">
              Explore Fresh Products <span>↗</span>
            </Link>
            <button className="text-link" onClick={onOpenContact}>
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
              src="/organic_asparagus.jpg" 
              alt="Fresh Organic Green Asparagus Stalks" 
              className="hero-plant-img" 
            />
            <div className="plant-tag-badge">
              <span>🌱 100% Organic Fresh Asparagus · Pune Eco Farm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Harvest Stories */}
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

      {/* Seasonal Highlights Section */}
      <section className="home-produce-preview">
        <div className="section-heading">
          <div>
            <div className="section-label">SEASONAL HIGHLIGHTS</div>
            <h2>Fresh from today&apos;s <em>harvest.</em></h2>
          </div>
          <Link className="under-link" to="/fresh-products">
            View all {PRODUCTS.length} products <span>↗</span>
          </Link>
        </div>

        <div className="home-products-grid">
          {PRODUCTS.slice(0, 4).map((product) => {
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
      </section>

      {/* Mission Band */}
      <section className="intro-band" id="about">
        <div className="section-label">01 / WHY US</div>
        <div className="intro-content">
          <h2>From our fields<br />to your <em>table.</em></h2>
          <p>We believe the best food has a story you can trace. We connect you with thoughtful growers, shorten the journey, and keep more of your rupee with the farmer.</p>
          <Link className="under-link" to="/our-mission">
            Read Our Full Mission <span>↗</span>
          </Link>
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
              <Link to="/farmer-support" className="feature-link">How it works <span>↗</span></Link>
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
            <Link className="button button-light" to="/farmer-support">
              Join our grower network <span>↗</span>
            </Link>
          </div>

          <div className="scheme-list">
            <div><span>01</span><strong>Fair market access</strong><p>Sell directly without the middlemen.</p></div>
            <div><span>02</span><strong>Growing support</strong><p>Practical tools for healthier soil.</p></div>
            <div><span>03</span><strong>Reliable community</strong><p>Grow alongside people who care.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
