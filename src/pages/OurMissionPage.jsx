import React from 'react';
import { Link } from 'react-router-dom';

export default function OurMissionPage() {
  return (
    <main className="mission-page">
      <header className="page-hero mission-hero">
        <div className="page-hero-content">
          <span className="eyebrow">OUR PHILOSOPHY & VALUES</span>
          <h1>Rooted in Pure Soil & <em>Honest Food</em></h1>
          <p>
            We are building a direct bridge between independent eco-farmers and conscious households, restoring soil health and fair market dignity.
          </p>
        </div>
      </header>

      {/* Mission Metrics Band */}
      <section className="mission-stats-band">
        <div className="stat-card">
          <strong>2,400+</strong>
          <span>Partner Organic Growers</span>
        </div>
        <div className="stat-card">
          <strong>100%</strong>
          <span>Zero Synthetic Chemicals</span>
        </div>
        <div className="stat-card">
          <strong>₹18.5M+</strong>
          <span>Direct Farmer Earnings</span>
        </div>
        <div className="stat-card">
          <strong>45,000+</strong>
          <span>Happy Farm Families</span>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="pillars-section">
        <div className="section-heading centered">
          <span className="section-label">HOW WE WORK</span>
          <h2>The 4 Pillars of <em>Organic Farming</em></h2>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <span className="pillar-num">01</span>
            <h3>Zero Synthetic Pesticides</h3>
            <p>Every harvest is cultivated using natural compost, neem bio-fertilizers, and crop rotation to preserve soil microbes and native ecosystems.</p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">02</span>
            <h3>Direct Farm-to-Table Logistics</h3>
            <p>By eliminating middleman auction hubs, produce travels from field to kitchen in under 24 hours at peak flavor and nutritional density.</p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">03</span>
            <h3>Fair Share Pricing</h3>
            <p>Over 75% of every rupee spent goes directly to the grower&apos;s bank account, guaranteeing living wages for rural farming communities.</p>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">04</span>
            <h3>Soil-to-Plate Traceability</h3>
            <p>Know exactly which orchard, valley, or farm grew your food. Full transparency with verified grower profiles and soil certificates.</p>
          </div>
        </div>
      </section>

      {/* Soil Story Callout */}
      <section className="soil-story-section">
        <div className="soil-story-content">
          <span className="eyebrow">REGENERATIVE AGRICULTURE</span>
          <h2>Healthy soil makes <em>healthy humans.</em></h2>
          <p>
            Industrial monoculture strips natural minerals from topsoil. Our growers practice regenerative composting and rainwater harvesting to leave the land richer for future generations.
          </p>
          <div className="soil-actions">
            <Link to="/fresh-products" className="button button-dark">
              Shop Chemical-Free Harvest <span>↗</span>
            </Link>
            <Link to="/farmer-support" className="under-link">
              Explore Grower Support <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
