import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bike, Zap } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const station = location.state?.station;

  // If accessed directly without station in state, redirect to stations
  useEffect(() => {
    if (!station) {
      navigate('/stations');
    }
  }, [station, navigate]);

  const [vehicleType, setVehicleType] = useState(null); // 'bike' or 'scooter'
  const [duration, setDuration] = useState(30); // in minutes
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  if (!station) return null;

  const cost = vehicleType === 'bike' 
    ? (1.50 * (duration / 15)).toFixed(2) 
    : vehicleType === 'scooter' 
      ? (2.00 * (duration / 15)).toFixed(2) 
      : '0.00';

  const handleConfirm = () => {
    let newErrors = {};
    if (!vehicleType) newErrors.type = "Please select a vehicle type";
    if (!termsAgreed) newErrors.terms = "Please accept the terms to continue";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success - generate booking and navigate to confirmation
    const bookingId = "BK-" + Math.floor(10000000 + Math.random() * 90000000);
    const newBooking = {
      id: bookingId,
      stationName: station.name,
      vehicle: vehicleType === 'bike' ? 'Bicycle' : 'E-Scooter',
      duration,
      cost,
      timestamp: new Date().toLocaleString()
    };

    // Save to session storage (simulating persistence per session)
    const existingBookings = JSON.parse(sessionStorage.getItem('bookings') || '[]');
    sessionStorage.setItem('bookings', JSON.stringify([newBooking, ...existingBookings]));

    navigate('/confirmation', { state: { booking: newBooking } });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 flex justify-center relative z-10">
      
      <div className="glass-card w-full max-w-[480px] p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <button 
          onClick={() => navigate('/stations')}
          className="flex items-center text-[var(--color-text-muted)] hover:text-white transition-colors text-sm mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Stations
        </button>

        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mb-4">Confirm Your Ride</h2>

        {/* Selected Station */}
        <div className="bg-black/40 border border-[var(--color-border-subtle)] rounded p-4 mb-6">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Selected Station</p>
          <h3 className="text-white font-bold text-xl">{station.name}</h3>
          <p className="text-[var(--color-text-secondary)] text-sm">{station.address}</p>
        </div>

        {/* Vehicle Selection */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">Select Vehicle Type</p>
          <div className="flex gap-4">
            {/* Bike Option */}
            <div 
              onClick={() => station.bikes > 0 && setVehicleType('bike')}
              className={`flex-1 border rounded p-4 flex flex-col items-center justify-center transition-all ${
                station.bikes === 0 ? 'bg-zinc-900 border-zinc-800 opacity-50 cursor-not-allowed' :
                vehicleType === 'bike' ? 'border-[var(--color-primary-orange)] bg-[rgba(249,115,22,0.1)] shadow-[0_0_15px_rgba(249,115,22,0.15)] cursor-pointer' : 'bg-[var(--color-surface)] border-[var(--color-border-subtle)] hover:border-zinc-500 cursor-pointer'
              }`}
            >
              <Bike size={32} className={`mb-2 ${vehicleType === 'bike' ? 'text-[var(--color-primary-orange)]' : 'text-white'}`} />
              <span className="text-sm font-semibold text-white mb-1">Bicycle</span>
              <span className={`text-xs ${station.bikes > 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                {station.bikes} Available
              </span>
            </div>

            {/* Scooter Option */}
            <div 
              onClick={() => station.scooters > 0 && setVehicleType('scooter')}
              className={`flex-1 border rounded p-4 flex flex-col items-center justify-center transition-all ${
                station.scooters === 0 ? 'bg-zinc-900 border-zinc-800 opacity-50 cursor-not-allowed' :
                vehicleType === 'scooter' ? 'border-[var(--color-primary-orange)] bg-[rgba(249,115,22,0.1)] shadow-[0_0_15px_rgba(249,115,22,0.15)] cursor-pointer' : 'bg-[var(--color-surface)] border-[var(--color-border-subtle)] hover:border-zinc-500 cursor-pointer'
              }`}
            >
              <Zap size={32} className={`mb-2 ${vehicleType === 'scooter' ? 'text-[var(--color-primary-orange)]' : 'text-white'}`} />
              <span className="text-sm font-semibold text-white mb-1">E-Scooter</span>
              <span className={`text-xs ${station.scooters > 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                {station.scooters} Available
              </span>
            </div>
          </div>
          {errors.type && <p className="text-[var(--color-error)] text-xs mt-2">{errors.type}</p>}
        </div>

        {/* Duration Selector */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">Duration</p>
          <div className="bg-black/20 border border-[var(--color-border-subtle)] rounded flex divide-x divide-[var(--color-border-subtle)]">
            {[15, 30, 45, 60].map(mins => (
              <button 
                key={mins}
                onClick={() => setDuration(mins)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  duration === mins ? 'bg-[var(--color-surface)] text-white' : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Display */}
        <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded p-4 flex justify-between items-center mb-6">
          <span className="text-xs uppercase tracking-widest text-green-400 font-semibold">Estimated Cost</span>
          <span className="text-2xl font-bold text-white">RM {cost}</span>
        </div>

        {/* Terms */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--color-border-subtle)] bg-black/40 accent-[var(--color-primary-orange)]"
            />
            <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
              I agree to EcoRide Terms of Use
            </span>
          </label>
          {errors.terms && <p className="text-[var(--color-error)] text-xs mt-2">{errors.terms}</p>}
        </div>

        {/* Submit */}
        <button 
          onClick={handleConfirm}
          disabled={!vehicleType || !termsAgreed}
          className={`w-full py-4 rounded text-sm font-bold tracking-widest uppercase transition-all ${
            (!vehicleType || !termsAgreed) 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : 'bg-[var(--color-primary-orange)] hover:bg-[var(--color-secondary-orange)] text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]'
          }`}
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
};

export default Booking;
