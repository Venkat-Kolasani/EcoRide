import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center px-6 md:px-20 relative z-10 overflow-hidden">
      
      <div className="flex-grow flex items-center w-full max-w-7xl mx-auto">
        <div className="w-full md:w-1/2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[var(--color-primary-orange)] text-xs uppercase tracking-[0.3em] font-semibold mb-4">
              Sustainable Urban Mobility
            </p>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-2">
              Ride the city,
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--color-primary-orange)] italic leading-tight mb-8 drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]">
              your way.
            </h1>
            
            <p className="text-[var(--color-text-secondary)] text-lg md:text-xl font-light max-w-lg mb-10 leading-relaxed font-sans">
              Find a bike or scooter at any station near you. Book in seconds. Ride immediately. No queues, no hassle.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-16">
              <Link 
                to="/stations"
                className="bg-[var(--color-primary-orange)] hover:bg-[var(--color-secondary-orange)] text-white px-8 py-4 rounded text-sm font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-1"
              >
                View Stations
              </Link>
              <Link
                to="/stations" 
                className="border border-[var(--color-border-subtle)] hover:border-white text-white px-8 py-4 rounded text-sm font-bold tracking-widest uppercase transition-all bg-[var(--color-surface)] hover:bg-white/5 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {['NO DEPOSIT', 'INSTANT BOOKING', '24/7 AVAILABLE', 'ECO FRIENDLY'].map((feature) => (
                <div key={feature} className="px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] backdrop-blur text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest">
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Right side is transparent to let the canvas orbital animation shine through */}
        <div className="hidden md:block w-1/2"></div>
      </div>

      {/* Bottom Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass-card mt-auto mb-10 mx-auto w-full max-w-5xl flex py-8 px-6 justify-around divide-x divide-[var(--color-border-subtle)]"
      >
        <div className="flex flex-col items-center px-4">
          <span className="text-[var(--color-primary-orange)] text-4xl font-serif mb-1">12</span>
          <span className="text-[var(--color-text-secondary)] text-xs uppercase tracking-widest">Stations</span>
        </div>
        <div className="flex flex-col items-center px-4">
          <span className="text-[var(--color-primary-orange)] text-4xl font-serif mb-1">340+</span>
          <span className="text-[var(--color-text-secondary)] text-xs uppercase tracking-widest">Bikes</span>
        </div>
        <div className="flex flex-col items-center px-4">
          <span className="text-[var(--color-primary-orange)] text-4xl font-serif mb-1">180+</span>
          <span className="text-[var(--color-text-secondary)] text-xs uppercase tracking-widest">Scooters</span>
        </div>
      </motion.div>
      
    </div>
  );
};

export default Home;
