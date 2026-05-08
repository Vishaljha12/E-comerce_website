import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import './Address.css';

export default function Address() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: 'Rahul Sharma',
      mobile: '9876543210',
      pincode: '400001',
      address: 'Flat 402, Sea View Apartments, Marine Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      isDefault: true
    }
  ]);

  const [formData, setFormData] = useState({
    fullName: '', mobile: '', pincode: '', address: '', city: '', state: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    const newAddress = {
      id: Date.now(),
      ...formData,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, newAddress]);
    setShowForm(false);
    setFormData({ fullName: '', mobile: '', pincode: '', address: '', city: '', state: '' });
  };

  const setDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="address-page container">
      <div className="address-header">
        <h1>Your Addresses</h1>
      </div>

      <div className="address-grid">
        <div className="address-card add-new-card" onClick={() => setShowForm(true)}>
          <Plus size={48} color="#ccc" />
          <h3>Add Address</h3>
        </div>

        {addresses.map(addr => (
          <div className={`address-card ${addr.isDefault ? 'default-card' : ''}`} key={addr.id}>
            {addr.isDefault && <div className="default-badge"><Check size={14} /> Default</div>}
            <div className="address-info">
              <strong>{addr.fullName}</strong>
              <p>{addr.address}</p>
              <p>{addr.city}, {addr.state} {addr.pincode}</p>
              <p>Phone number: {addr.mobile}</p>
            </div>
            <div className="address-actions">
              {!addr.isDefault && (
                <button onClick={() => setDefault(addr.id)} className="btn-link">Set as Default</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="address-modal-overlay">
          <div className="address-modal">
            <div className="modal-header">
              <h2>Add a new address</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSave} className="address-form">
              <div className="form-group">
                <label>Full name (First and Last name)</label>
                <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Mobile number</label>
                <input required type="text" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input required type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Flat, House no., Building, Company, Apartment</label>
                <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Town/City</label>
                  <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input required type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">Add address</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
