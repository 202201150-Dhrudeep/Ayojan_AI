import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo">Ayojan.AI</div>
        <nav className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
          <button className="btn-primary">Get started</button>
          <button className="btn-secondary">Log in</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Plan your perfect event with AI</h1>
          <p className="hero-subtitle">
            Let our AI-powered platform handle the details, so you can focus on celebrating. From intimate gatherings to grand galas, we’ve got you covered.
          </p>
          <button className="btn-primary">Get started</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <p className="footer-copy">© 2024 AyojanIt. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;


