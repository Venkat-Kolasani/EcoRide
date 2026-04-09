import React, { useState } from 'react';
import { MapPin, Bike, Droplets, Trash2, Edit2, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Note: Droplets used roughly as a scooter analogy icon if scooter icon unavailable, but Lucide has a specific icon? 'Droplets' is used since there isn't a dedicated scooter. Wait, let's use a generic circle or zap. Let's use generic Zap for E-Scooter.  (I will change this in the import and usage)
import { Zap } from 'lucide-react';

const StationCard = ({ station, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editBikes, setEditBikes] = useState(station.bikes);
  const [editScooters, setEditScooters] = useState(station.scooters);

  const totalVehicles = station.bikes + station.scooters;

  const handleUpdate = () => {
    onUpdate(station.id, {
      bikes: parseInt(editBikes) || 0,
      scooters: parseInt(editScooters) || 0
    });
    setIsEditing(false);
  };

  const isUnavailable = totalVehicles === 0;

  return (
    <div className="glass-card glass-card-interactive p-5 flex flex-col relative group">
      
      {/* Operator controls - visible on hover or always if we want */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setIsEditing(!isEditing)} className="text-[var(--color-text-muted)] hover:text-white transition-colors">
          <Edit2 size={16} />
        </button>
        <button onClick={() => onDelete(station.id)} className="text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mb-4 pr-12">
        <h3 className="text-white text-lg font-bold mb-1">{station.name}</h3>
        <div className="flex items-center text-[var(--color-text-secondary)] text-sm">
          <MapPin size={14} className="mr-1" />
          {station.address}
        </div>
      </div>

      {isEditing ? (
         <div className="mb-4 bg-black/40 p-3 rounded border border-[var(--color-border-subtle)]">
            <h4 className="text-xs uppercase text-[var(--color-text-muted)] mb-2 tracking-wider">Update Availability</h4>
            <div className="flex gap-3 mb-3">
              <label className="flex-1 text-sm text-[var(--color-text-secondary)]">
                Bikes
                <input 
                  type="number" 
                  min="0"
                  value={editBikes} 
                  onChange={e => setEditBikes(e.target.value)}
                  className="w-full mt-1 bg-black/20 border border-[var(--color-border-subtle)] rounded p-1 text-white text-center"
                />
              </label>
              <label className="flex-1 text-sm text-[var(--color-text-secondary)]">
                Scooters
                <input 
                  type="number"
                  min="0" 
                  value={editScooters} 
                  onChange={e => setEditScooters(e.target.value)}
                  className="w-full mt-1 bg-black/20 border border-[var(--color-border-subtle)] rounded p-1 text-white text-center"
                />
              </label>
            </div>
            <div className="flex gap-2">
               <button onClick={handleUpdate} className="flex-1 bg-[var(--color-success)] hover:bg-green-600 text-white text-xs py-1 rounded flex justify-center items-center">
                 <Check size={14} className="mr-1" /> Save
               </button>
               <button onClick={() => setIsEditing(false)} className="flex-1 bg-[var(--color-border-subtle)] hover:bg-zinc-700 text-white text-xs py-1 rounded flex justify-center items-center">
                 <X size={14} className="mr-1" /> Cancel
               </button>
            </div>
         </div>
      ) : (
        <div className="flex gap-2 mb-6">
          {isUnavailable ? (
             <div className="bg-[rgba(239,68,68,0.15)] text-[var(--color-error)] text-xs font-semibold py-1 px-3 rounded flex items-center">
               No vehicles available
             </div>
          ) : (
             <>
               <div className="bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs font-semibold py-1 px-3 rounded flex items-center">
                 <Bike size={14} className="mr-1.5" />
                 {station.bikes} Bikes
               </div>
               <div className="bg-teal-500/10 border border-teal-500/20 text-teal-200 text-xs font-semibold py-1 px-3 rounded flex items-center">
                 <Zap size={14} className="mr-1.5" />
                 {station.scooters} Scooters
               </div>
             </>
          )}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-[var(--color-border-subtle)]">
        <button 
          onClick={() => {
            if (!isUnavailable) {
              navigate('/booking', { state: { station } });
            }
          }}
          disabled={isUnavailable}
          className={`w-full py-2.5 rounded text-sm font-bold tracking-wide transition-all ${
            isUnavailable 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : 'bg-[var(--color-primary-orange)] hover:bg-[var(--color-secondary-orange)] text-white shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'
          } md:w-auto md:ml-auto md:px-6 block`}
        >
          {isUnavailable ? 'UNAVAILABLE' : 'BOOK NOW'}
        </button>
      </div>

    </div>
  );
};

export default StationCard;
