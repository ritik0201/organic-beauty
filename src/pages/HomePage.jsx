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
          <p className="eyebrow">100% PURE BOTANICALS · CRUELTY-FREE & VEGAN</p>
          <h1>Radiant skin begins<br />with <em>pure botanicals.</em></h1>
          <p className="hero-text">
            Clean, organic skincare and velvet mineral makeup crafted from cold-pressed seed elixirs, damask rose, and wild herbal extracts.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/fresh-products">
              Explore Organic Beauty <span>↗</span>
            </Link>
            <button className="text-link" onClick={onOpenContact}>
              Skin Advisor <span>→</span>
            </button>
          </div>

          <div className="hero-proof">
            <div className="avatar-stack">
              <span>A</span><span>B</span><span>S</span><span>✦</span>
            </div>
            <p><strong>50,000+</strong><br />glowing skins loved across India</p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-plant-container">
            <img 
              src="/aura_skincare_elixir.jpg" 
              alt="Luna Botanicals Organic Facial Elixir" 
              className="hero-plant-img" 
            />
            <div className="plant-tag-badge">
              <span>✦ Luna Botanicals Organic Rosehip Facial Elixir</span>
            </div>
          </div>
        </div>
      </section>

      {/* Botanical Extraction Stories */}
      <section className="gallery-showcase">
        <div className="section-label">BOTANICAL EXTRACTION & CRAFT</div>
        <h2>Pure, potent ingredients <br /><em>straight from nature.</em></h2>

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

      {/* Bestsellers Section */}
      <section className="home-produce-preview">
        <div className="section-heading">
          <div>
            <div className="section-label">CURATED BEAUTY FAVOURITES</div>
            <h2>Bestselling Organic <em>Skincare & Makeup.</em></h2>
          </div>
          <Link className="under-link" to="/fresh-products">
            View all {PRODUCTS.length} beauty products <span>↗</span>
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

      {/* Clean Beauty Philosophy Band */}
      <section className="intro-band" id="about">
        <div className="section-label">01 / OUR PHILOSOPHY</div>
        <div className="intro-content">
          <h2>Zero parabens.<br />100% <em>clean science.</em></h2>
          <p>We believe skincare should feed your skin, not compromise it. Every serum, tint, and mist is formulated without synthetic silicones, mineral oils, or artificial fragrances.</p>
          <Link className="under-link" to="/our-mission">
            Read Our Clean Standard <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features" id="produce">
        <div className="section-heading">
          <div>
            <div className="section-label">02 / WHY AURA BOTANICA</div>
            <h2>Formulated for <em>real glow.</em></h2>
          </div>
          <p>Potent botanical actives delivering visible results without irritation.</p>
        </div>
        
        <div className="feature-grid">
          <article className="feature-card feature-image">
            <div className="feature-photo feature-photo-01"></div>
            <div className="feature-overlay">
              <span>01</span>
              <h3>Peak Nutrient Potency</h3>
              <p>Cold-pressed within hours of harvest to preserve active Vitamin C & essential fatty acids.</p>
            </div>
          </article>

          <article className="feature-card feature-image">
            <div className="feature-photo feature-photo-02"></div>
            <div className="feature-overlay">
              <span>02</span>
              <h3>Ethical Sourcing</h3>
              <p>Fair compensation for wild floral harvesters in Kashmir & Himalayan reserves.</p>
              <Link to="/farmer-support" className="feature-link">Consult Advisor <span>↗</span></Link>
            </div>
          </article>

          <article className="feature-card feature-image">
            <div className="feature-photo feature-photo-03"></div>
            <div className="feature-overlay quote-overlay">
              <span>03</span>
              <div className="quote-mark">“</div>
              <p className="quote">My skin hasn&apos;t felt this clear, plump, and dewy in years.</p>
              <p className="quote-author">— Ananya, Mumbai</p>
            </div>
          </article>
        </div>
      </section>

      {/* Skin Consultation Section */}
      <section className="schemes" id="schemes">
        <div className="section-label">03 / PERSONAL BEAUTY ADVISOR</div>
        <div className="scheme-layout">
          <div>
            <h2>Find your custom<br /><em>beauty ritual.</em></h2>
            <p>Unsure which serum or shade matches your skin type? Connect with our botanical skincare specialists for a personalized routine.</p>
            <Link className="button button-light" to="/farmer-support">
              Book Free Skin Consultation <span>↗</span>
            </Link>
          </div>

          <div className="scheme-list">
            <div><span>01</span><strong>Personalized Routine</strong><p>Tailored regimen for acne, dryness, or aging.</p></div>
            <div><span>02</span><strong>Shade Matching</strong><p>Find your exact organic velvet cheek & lip tint match.</p></div>
            <div><span>03</span><strong>100% Satisfaction</strong><p>Dermatologically tested and hypoallergenic.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
