import React, { useState } from 'react';

export default function FarmerSupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    skinConcern: 'glow-dryness',
    routine: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="farmer-page">
      <header className="page-hero farmer-hero">
        <div className="page-hero-content">
          <span className="eyebrow">PERSONAL BEAUTY ADVISOR & CONSULTATION</span>
          <h1>Botanical Skin Consultation & <em>Custom Rituals</em></h1>
          <p>
            Unsure which serum or mineral shade best suits your skin? Speak directly with our certified organic skincare specialists.
          </p>
        </div>
      </header>

      {/* Skincare Advisor Programs */}
      <section className="farmer-programs-section">
        <div className="section-heading centered">
          <span className="section-label">HOW OUR ADVISORS HELP YOU</span>
          <h2>Tailored for <em>Your Unique Skin</em></h2>
        </div>

        <div className="programs-grid">
          <div className="program-card">
            <span className="program-icon">🌸</span>
            <h3>Skin Type Analysis</h3>
            <p>Identify whether your skin barrier requires hyaluronic mists, rich lipid elixirs, or clay detox treatments.</p>
          </div>

          <div className="program-card">
            <span className="program-icon">✨</span>
            <h3>Custom Regimen Formulation</h3>
            <p>Get a step-by-step AM/PM skincare routine designed specifically for your skin goals and climate.</p>
          </div>

          <div className="program-card">
            <span className="program-icon">💄</span>
            <h3>Organic Shade Matching</h3>
            <p>Find your perfect match in our non-toxic velvet lip & cheek tints and mineral sun bronzers.</p>
          </div>

          <div className="program-card">
            <span className="program-icon">🍃</span>
            <h3>Sensitive Skin Guarantee</h3>
            <p>All products are hypoallergenic, dermatologically tested, and safe for sensitive or reactive skin types.</p>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="farmer-form-section">
        <div className="farmer-form-container">
          <div className="form-info-col">
            <span className="eyebrow">BOOK A COMPLIMENTARY SESSION</span>
            <h2>Talk to a <em>Skin Specialist</em></h2>
            <p>
              Fill out your details below and our botanical beauty advisor will reach out via WhatsApp or call with personalized recommendations.
            </p>
            
            <div className="farmer-perks-list">
              <div>✓ 100% Free 1-on-1 Skin Consultation</div>
              <div>✓ Complimentary Deluxe Samples with your routine</div>
              <div>✓ Zero obligation to purchase</div>
            </div>
          </div>

          <div className="form-card-col">
            {submitted ? (
              <div className="success-box">
                <span className="success-star">✦</span>
                <h3>Consultation Request Sent!</h3>
                <p>Thank you, <strong>{formData.name}</strong>. Our Senior Beauty Specialist will contact you at <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="button button-dark" onClick={() => setSubmitted(false)}>
                  Submit Another Consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grower-reg-form">
                <h3>Skin Consultation Form</h3>
                
                <label>
                  Full Name
                  <input
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>

                <div className="form-row dual">
                  <label>
                    Phone / WhatsApp Number
                    <input
                      required
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </label>

                  <label>
                    City / Location
                    <input
                      required
                      placeholder="e.g. Mumbai, Delhi, Bangalore"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </label>
                </div>

                <div className="form-row dual">
                  <label>
                    Primary Skin Concern
                    <select
                      value={formData.skinConcern}
                      onChange={(e) => setFormData({ ...formData, skinConcern: e.target.value })}
                    >
                      <option value="glow-dryness">Dryness & Dullness (Needs Glow)</option>
                      <option value="acne-pores">Acne, Clogged Pores & Oiliness</option>
                      <option value="pigmentation">Hyperpigmentation & Dark Spots</option>
                      <option value="aging-lines">Fine Lines & Loss of Elasticity</option>
                      <option value="shade-match">Makeup Shade Matching</option>
                    </select>
                  </label>

                  <label>
                    Current Skincare Routine
                    <input
                      placeholder="e.g. Cleanser & Sunscreen"
                      value={formData.routine}
                      onChange={(e) => setFormData({ ...formData, routine: e.target.value })}
                    />
                  </label>
                </div>

                <label>
                  Specific Questions / Skin Goals
                  <textarea
                    rows="3"
                    placeholder="Describe what you want to achieve with your skin..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </label>

                <button type="submit" className="button button-dark full-width-btn">
                  Book Free Consultation <span>↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
