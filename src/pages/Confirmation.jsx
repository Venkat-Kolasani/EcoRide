import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!booking) {
      navigate('/');
      return;
    }
    const existing = JSON.parse(sessionStorage.getItem('bookings') || '[]');
    setHistory(existing);
  }, [booking, navigate]);

  if (!booking) return null;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 flex flex-col items-center relative z-10">
      
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="mb-6"
      >
        <CheckCircle size={80} className="text-[var(--color-success)] bg-[rgba(34,197,94,0.1)] rounded-full drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl md:text-5xl font-serif text-white mb-4 text-center"
      >
        Booking Confirmed!
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-[var(--color-text-secondary)] text-center max-w-sm mb-10"
      >
        Your ride is ready. Head to the station and scan your QR code.
      </motion.p>

      {/* Booking Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-card w-full max-w-[480px] p-6 mb-10 border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.02)]"
      >
        <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-6 border-b border-[var(--color-border-subtle)] pb-2">Booking Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">Booking ID</span>
            <span className="text-white font-mono">{booking.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">Station</span>
            <span className="text-white font-semibold">{booking.stationName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">Vehicle</span>
            <span className="text-white">{booking.vehicle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">Duration</span>
            <span className="text-white">{booking.duration} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">Estimated Cost</span>
            <span className="text-[var(--color-success)] font-bold">RM {booking.cost}</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-[var(--color-border-subtle)]">
            <span className="text-xs text-[var(--color-text-muted)]">Booked at</span>
            <span className="text-xs text-white/70">{booking.timestamp}</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-[480px]"
      >
        <button 
          onClick={() => navigate('/stations')}
          className="flex-1 py-4 bg-[var(--color-primary-orange)] hover:bg-[var(--color-secondary-orange)] rounded text-white text-sm font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]"
        >
          View My Bookings
        </button>
        <button 
          onClick={() => navigate('/')}
          className="flex-1 py-4 border border-[var(--color-border-subtle)] hover:border-white bg-[var(--color-surface)] hover:bg-white/5 backdrop-blur-sm rounded text-white text-sm font-bold tracking-widest uppercase transition-all"
        >
          Back to Home
        </button>
      </motion.div>

      {/* Booking History Session */}
      {history.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="w-full max-w-4xl mt-20"
        >
          <h3 className="text-white font-serif text-2xl mb-6">Recent Session Bookings</h3>
          <div className="glass-card overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-black/40 text-[var(--color-text-muted)] text-xs uppercase tracking-wider border-b border-[var(--color-border-subtle)]">
                <tr>
                  <th className="p-4 font-normal">Booking ID</th>
                  <th className="p-4 font-normal">Station</th>
                  <th className="p-4 font-normal">Vehicle</th>
                  <th className="p-4 font-normal">Duration</th>
                  <th className="p-4 font-normal">Cost</th>
                  <th className="p-4 font-normal">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)] text-[#e4e4e7]">
                {history.map((bk, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-[var(--color-primary-orange)]">{bk.id}</td>
                    <td className="p-4">{bk.stationName}</td>
                    <td className="p-4">{bk.vehicle}</td>
                    <td className="p-4">{bk.duration} min</td>
                    <td className="p-4 text-[var(--color-success)] text-xs">RM {bk.cost}</td>
                    <td className="p-4 text-[var(--color-text-muted)] text-xs">{bk.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default Confirmation;
