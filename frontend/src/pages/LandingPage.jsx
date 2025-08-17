import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Assuming you have a CSS file for styling
function LandingPage() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  console.log("VITE_API_URL ->",process.env );
  return (
    <div>
      <header className="header">
        <div className="logo">Eventful AI</div>
        <nav className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
          <button className="btn-primary" onClick={() => navigate('/signup')}>
            Get started
          </button>
          <button className="btn-secondary"  onClick={() => navigate('/login')}>Log in</button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Plan your perfect event with AI</h1>
          <p className="hero-subtitle">
            Let our AI-powered platform handle the details, so you can focus on celebrating.
          </p>
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>
            Get started
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
