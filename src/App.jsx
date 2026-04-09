import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import CanvasBackground from './components/CanvasBackground'
import AuthModal from './components/AuthModal'

import Home from './pages/Home'
import Stations from './pages/Stations'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'

// Creating a component to handle Animated Routes
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen text-white bg-transparent font-sans">
        <CanvasBackground />
        
        <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
        
        {isAuthModalOpen && (
          <AuthModal onClose={() => setIsAuthModalOpen(false)} />
        )}

        <AnimatedRoutes />
      </div>
    </Router>
  )
}

export default App
