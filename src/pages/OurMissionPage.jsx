import React from 'react';
import { Link } from 'react-router-dom';

export default function OurMissionPage() {
  return (
    <main className="mission-page">
      <header className="page-hero mission-hero">
        <div className="page-hero-content">
          <span className="eyebrow">OUR CLEAN BEAUTY STANDARD</span>
          <h1>Pure Botanical Science & <em>Conscious Beauty</em></h1>
          <p>
            We formulate bio-active skincare and mineral cosmetics that nourish your skin barrier while honoring earth and wildlife.
          </p>
        </div>
      </header>

      {/* Mission Metrics Band */}
      <section className="mission-stats-band">
        <div className="stat-card">
          <strong>50,000+</strong>
          <span>Happy Glowing Skins</span>
        </div>
        <div className="stat-card">
          <strong>100%</strong>
          <span>Vegan & Cruelty-Free</span>
        </div>
        <div className="stat-card">
          <strong>0%</strong>
          <span>Parabens, Sulfates & Silicones</span>
        </div>
        <div className="stat-card">
          <strong>100%</strong>
          <span>Recyclable Glass Packaging</span>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="pillars-section">
        <div className="section-heading centered">
          <span className="section-label">HOW WE FORMULATE</span>
          <h2>The 4 Pillars of <em>Clean Beauty</em></h2>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <span className="pillar-num">01</span>
            <h3>100% Organic Bio-Actives</h3>
            <p>Every bottle is infused with cold-pressed seed elixirs, steam-distilled hydrosols, and natural Vitamin C to maximize skin bio-availability.</p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">02</span>
            <h3>Zero Synthetic Toxins</h3>
            <p>Formulated strictly without parabens, phthalates, mineral oils, synthetic dyes, or artificial fragrances that irritate delicate skin.</p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">03</span>
            <h3>Leaping Bunny Cruelty-Free</h3>
            <p>We never test on animals. Every product is 100% PETA certified vegan, cruelty-free, and ethically hand-blended.</p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">04</span>
            <h3>Sustainable Violet Glass</h3>
            <p>Housed in eco-friendly UV-filtering glass bottles to preserve botanical potency without plastic leaching.</p>
          </div>
        </div>
      </section>

      {/* Skin Health Callout */}
      <section className="soil-story-section">
        <div className="soil-story-content">
          <span className="eyebrow">REGENERATIVE BEAUTY</span>
          <h2>Feed your skin barrier with <em>pure plant lipids.</em></h2>
          <p>
            Harsh synthetic cleansers strip essential ceramides. Our lipid-rich botanical formulations restore your natural glow and skin moisture barrier.
          </p>
          <div className="soil-actions">
            <Link to="/fresh-products" className="button button-dark">
              Shop Organic Collection <span>↗</span>
            </Link>
            <Link to="/farmer-support" className="under-link">
              Consult Skin Specialist <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
