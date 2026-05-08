import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useStore(state => state.setUser);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ name: email.split('@')[0], email });
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="login-logo">
        <span className="logo-text" style={{color: '#111'}}>My<span className="logo-highlight">Mart</span></span>
      </Link>
      
      <motion.div 
        className="card login-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email or mobile phone number</label>
            <input 
              type="text" 
              id="email" 
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary login-btn">
            Continue
          </button>
        </form>
        <p className="login-terms">
          By continuing, you agree to MyMart's Conditions of Use and Privacy Notice.
        </p>
      </motion.div>

      <div className="login-divider">
        <span>New to MyMart?</span>
      </div>

      <button className="btn btn-outline create-account-btn">
        Create your MyMart account
      </button>
    </div>
  );
}
