import React, { useState } from 'react';

export default function FarmerSupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    cropType: 'vegetables',
    acreage: '',
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
          <span className="eyebrow">GROWER NETWORK & COMMUNITY</span>
          <h1>Empowering Independent <em>Organic Farmers</em></h1>
          <p>
            Fair market pricing, practical soil health tools, and a reliable community helping independent eco-farmers thrive.
          </p>
        </div>
      </header>

      {/* Grower Support Programs */}
      <section className="farmer-programs-section">
        <div className="section-heading centered">
          <span className="section-label">HOW WE HELP GROWERS</span>
          <h2>Rooted in <em>Farmer Success</em></h2>
        </div>

        <div className="programs-grid">
          <div className="program-card">
            <span className="program-icon">🌾</span>
            <h3>Direct Market Access</h3>
            <p>Sell directly to thousands of organic food lovers without paying middleman commissions or dealing with unstable mandis.</p>
          </div>

          <div className="program-card">
            <span className="program-icon">🧪</span>
            <h3>Soil Testing & Guidance</h3>
            <p>Access free bio-soil testing kit support, organic composting blueprints, and natural pest management consultations.</p>
          </div>

          <div className="program-card">
            <span className="program-icon">💳</span>
            <h3>Guaranteed Weekly Payouts</h3>
            <p>Enjoy transparent weight-based pricing with direct bank transfers within 48 hours of harvest pickup.</p>
          </div>

          <div className="program-card">
            <span className="program-icon">🚜</span>
            <h3>Eco Equipment Assistance</h3>
            <p>Shared community toolbanks for drip irrigation, solar drying, and certified organic seed bank distribution.</p>
          </div>
        </div>
      </section>

      {/* Grower Registration Form Section */}
      <section className="farmer-form-section">
        <div className="farmer-form-container">
          <div className="form-info-col">
            <span className="eyebrow">JOIN OUR NETWORK</span>
            <h2>Are you an <em>organic grower?</em></h2>
            <p>
              Whether you cultivate 1 acre or 50 acres, we help you sell your harvest at fair prices with zero marketing hassle.
            </p>
            
            <div className="farmer-perks-list">
              <div>✓ Zero listing or registration fees</div>
              <div>✓ Doorstep harvest pickup service</div>
              <div>✓ Dedicated agronomist assistance</div>
            </div>
          </div>

          <div className="form-card-col">
            {submitted ? (
              <div className="success-box">
                <span className="success-star">✦</span>
                <h3>Application Received!</h3>
                <p>Thank you, <strong>{formData.name}</strong>. Our grower community manager will call you back at <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="button button-dark" onClick={() => setSubmitted(false)}>
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grower-reg-form">
                <h3>Grower Registration Form</h3>
                
                <label>
                  Full Name
                  <input
                    required
                    placeholder="e.g. Ramesh Patil"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>

                <div className="form-row dual">
                  <label>
                    Phone Number
                    <input
                      required
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </label>

                  <label>
                    Farm Location / District
                    <input
                      required
                      placeholder="e.g. Satara, Maharashtra"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </label>
                </div>

                <div className="form-row dual">
                  <label>
                    Primary Crops
                    <select
                      value={formData.cropType}
                      onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                    >
                      <option value="vegetables">Leafy Greens & Vegetables</option>
                      <option value="fruits">Seasonal Fruits & Berries</option>
                      <option value="spices">Spices & Medicinal Herbs</option>
                      <option value="grains">Grains & Cold Pressed Oils</option>
                    </select>
                  </label>

                  <label>
                    Farm Land Size (Acres)
                    <input
                      required
                      placeholder="e.g. 3 Acres"
                      value={formData.acreage}
                      onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                    />
                  </label>
                </div>

                <label>
                  Message / Farming Details
                  <textarea
                    rows="3"
                    placeholder="Tell us what crops you are currently growing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </label>

                <button type="submit" className="button button-dark full-width-btn">
                  Submit Grower Application <span>↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
