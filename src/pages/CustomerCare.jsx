import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, FileText, ChevronRight, Search } from 'lucide-react';
import './CustomerCare.css';

const CustomerCare = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpTopics = [
    { title: 'Track Packages', icon: <FileText size={24} />, desc: 'Check status of your delivery' },
    { title: 'Returns & Refunds', icon: <MessageSquare size={24} />, desc: 'Return items or check refunds' },
    { title: 'Manage Addresses', icon: <FileText size={24} />, desc: 'Update your delivery locations' },
    { title: 'Payment Settings', icon: <FileText size={24} />, desc: 'Add or edit payment methods' },
    { title: 'Account Settings', icon: <FileText size={24} />, desc: 'Change email or password' },
    { title: 'Security', icon: <FileText size={24} />, desc: 'Manage unauthorized activity' }
  ];

  return (
    <div className="customer-care-page">
      <div className="cc-hero">
        <div className="cc-hero-content">
          <h1>Hello. What can we help you with?</h1>
          <div className="cc-search-box">
            <Search size={20} color="#555" />
            <input 
              type="text" 
              placeholder="Search our help library" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="cc-main-content">
        <section className="cc-topics-section">
          <h2>Some things you can do here</h2>
          <div className="topics-grid">
            {helpTopics.map((topic, index) => (
              <div key={index} className="topic-card">
                <div className="topic-icon">{topic.icon}</div>
                <div className="topic-info">
                  <h3>{topic.title}</h3>
                  <p>{topic.desc}</p>
                </div>
                <ChevronRight size={20} className="topic-arrow" />
              </div>
            ))}
          </div>
        </section>

        <section className="cc-contact-section">
          <h2>Need more help?</h2>
          <div className="contact-options">
            <div className="contact-card">
              <div className="contact-icon-wrapper blue">
                <Phone size={28} />
              </div>
              <h3>Call Us</h3>
              <p>We are available 24/7 to help you with your queries.</p>
              <button className="contact-btn outline">Call Now</button>
            </div>
            <div className="contact-card">
              <div className="contact-icon-wrapper green">
                <MessageSquare size={28} />
              </div>
              <h3>Live Chat</h3>
              <p>Chat with our customer service team right now.</p>
              <button className="contact-btn primary">Start Chat</button>
            </div>
            <div className="contact-card">
              <div className="contact-icon-wrapper purple">
                <Mail size={28} />
              </div>
              <h3>Email Us</h3>
              <p>Drop us an email and we'll get back to you within 24 hours.</p>
              <button className="contact-btn outline">Send Email</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerCare;
