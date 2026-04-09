import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b flex items-center justify-between px-6 h-20" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <Link to="/" className="text-[var(--color-primary-orange)] font-serif text-3xl font-bold tracking-tight">
        EcoRide
      </Link>
      
      <div className="hidden md:flex gap-8">
        <Link to="/stations" className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-white transition-colors">
          Stations
        </Link>
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-white transition-colors">
          How It Works
        </Link>
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-white transition-colors">
          Pricing
        </Link>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onLoginClick}
          className="text-[var(--color-text-primary)] hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors px-4 py-2"
        >
          Login
        </button>
        <Link
          to="/stations"
          className="border border-[var(--color-primary-orange)] text-[var(--color-primary-orange)] hover:bg-[var(--color-primary-orange)] hover:text-white transition-colors text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
