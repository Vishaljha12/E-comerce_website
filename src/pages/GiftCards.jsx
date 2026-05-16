import React, { useState } from 'react';
import { Gift, Mail, Printer, Share2, CreditCard } from 'lucide-react';
import './GiftCards.css';

const designOptions = [
  { id: 'bday', name: 'Birthday', color: 'linear-gradient(135deg, #fceabb, #f8b500)', icon: '🎂' },
  { id: 'thankyou', name: 'Thank You', color: 'linear-gradient(135deg, #d4fc79, #96e6a1)', icon: '💐' },
  { id: 'wedding', name: 'Wedding', color: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)', icon: '💍' },
  { id: 'standard', name: 'MarketHub Standard', color: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', icon: '🛒' },
];

const amounts = [500, 1000, 2000, 5000, 10000];

export default function GiftCards() {
  const [selectedDesign, setSelectedDesign] = useState(designOptions[3]);
  const [amount, setAmount] = useState(1000);
  const [deliveryMethod, setDeliveryMethod] = useState('email'); // email, print, link
  
  return (
    <div className="gc-page">
      <div className="gc-hero">
        <div className="gc-hero-text">
          <h1>MarketHub Gift Cards</h1>
          <p>The perfect gift, every time. Give them the choice of millions of items with no expiration date.</p>
        </div>
      </div>

      <div className="gc-container">
        <div className="gc-content-grid">
          
          {/* Left Column - Card Preview */}
          <div className="gc-preview-col">
            <div className="gc-preview-card" style={{ background: selectedDesign.color }}>
              <div className="gc-card-icon">{selectedDesign.icon}</div>
              <div className="gc-card-amount">₹{amount.toLocaleString()}</div>
              <div className="gc-card-brand">MarketHub</div>
              <div className="gc-card-title">{selectedDesign.name} Gift Card</div>
            </div>
            
            <div className="gc-features">
              <div className="gc-feature"><Gift size={18}/> Never expires</div>
              <div className="gc-feature"><CreditCard size={18}/> Use across all categories</div>
              <div className="gc-feature"><Mail size={18}/> Instant delivery options</div>
            </div>
          </div>

          {/* Right Column - Customization Form */}
          <div className="gc-form-col">
            <h2>Customize your gift</h2>
            
            <div className="gc-form-group">
              <label>1. Choose a design</label>
              <div className="gc-design-selector">
                {designOptions.map(design => (
                  <button 
                    key={design.id}
                    className={`gc-design-btn ${selectedDesign.id === design.id ? 'active' : ''}`}
                    onClick={() => setSelectedDesign(design)}
                  >
                    <div className="gc-design-color" style={{ background: design.color }}></div>
                    <span>{design.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="gc-form-group">
              <label>2. Select amount</label>
              <div className="gc-amount-selector">
                {amounts.map(amt => (
                  <button 
                    key={amt}
                    className={`gc-amount-btn ${amount === amt ? 'active' : ''}`}
                    onClick={() => setAmount(amt)}
                  >
                    ₹{amt}
                  </button>
                ))}
                <div className="gc-custom-amount">
                  <span className="rupee-sym">₹</span>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.length > 7) return;
                      setAmount(Number(val));
                    }} 
                    min="100" 
                    max="50000"
                  />
                </div>
              </div>
            </div>

            <div className="gc-form-group">
              <label>3. How would you like to deliver it?</label>
              <div className="gc-delivery-selector">
                <button 
                  className={`gc-delivery-btn ${deliveryMethod === 'email' ? 'active' : ''}`}
                  onClick={() => setDeliveryMethod('email')}
                >
                  <Mail size={20} />
                  <span>Email</span>
                </button>
                <button 
                  className={`gc-delivery-btn ${deliveryMethod === 'link' ? 'active' : ''}`}
                  onClick={() => setDeliveryMethod('link')}
                >
                  <Share2 size={20} />
                  <span>Share Link</span>
                </button>
                <button 
                  className={`gc-delivery-btn ${deliveryMethod === 'print' ? 'active' : ''}`}
                  onClick={() => setDeliveryMethod('print')}
                >
                  <Printer size={20} />
                  <span>Print at Home</span>
                </button>
              </div>
            </div>

            {deliveryMethod === 'email' && (
              <div className="gc-delivery-details">
                <input type="email" placeholder="Recipient's Email" className="gc-input" />
                <input type="text" placeholder="Sender's Name (Optional)" className="gc-input" />
                <textarea placeholder="Add a personal message (Optional)" className="gc-textarea" rows="3"></textarea>
                <div className="gc-date-picker">
                  <span>Send date: </span>
                  <input type="date" className="gc-input" />
                </div>
              </div>
            )}

            <button className="gc-buy-btn">
              Add to Cart - ₹{amount.toLocaleString()}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
