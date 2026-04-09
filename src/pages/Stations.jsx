import React, { useState } from 'react';
import { initialStations } from '../data/stations';
import StationCard from '../components/StationCard';
import { Search, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Stations = () => {
  const [stations, setStations] = useState(initialStations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL'); // ALL, BIKES, SCOOTERS
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addErrors, setAddErrors] = useState({});

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          station.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filter === 'BIKES') return station.bikes > 0;
    if (filter === 'SCOOTERS') return station.scooters > 0;
    return true; // ALL
  });

  const handleUpdateStation = (id, newCounts) => {
    setStations(stations.map(st => 
      st.id === id ? { ...st, ...newCounts } : st
    ));
  };

  const handleDeleteStation = (id) => {
    setStations(stations.filter(st => st.id !== id));
  };

  const handleAddSubmit = () => {
    const name = document.getElementById('addName')?.value;
    const address = document.getElementById('addAddress')?.value;
    const bikesStr = document.getElementById('addBikes')?.value;
    const scootersStr = document.getElementById('addScooters')?.value;

    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!address) errors.address = "Address is required";
    
    const bikes = parseInt(bikesStr);
    const scooters = parseInt(scootersStr);

    if (isNaN(bikes) || bikes < 0) errors.bikes = "Must be 0 or a positive integer";
    if (isNaN(scooters) || scooters < 0) errors.scooters = "Must be 0 or a positive integer";

    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    const newStation = {
      id: Date.now(),
      name,
      address,
      bikes,
      scooters
    };

    setStations([...stations, newStation]);
    setIsAddModalOpen(false);
    setAddErrors({});
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-20 max-w-7xl mx-auto relative z-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2">Find a Station</h1>
          <p className="text-[var(--color-text-secondary)]">Real-time availability across all EcoRide stations</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 text-xs uppercase tracking-wider bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-primary-orange)] text-white px-4 py-2 rounded transition-colors"
        >
          <Plus size={16} /> Add Station
        </button>
      </div>

      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
          <input 
            type="text"
            placeholder="Search by station name or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-[var(--color-border-subtle)] rounded py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-primary-orange)] transition-colors"
          />
        </div>
        <div className="flex bg-black/40 border border-[var(--color-border-subtle)] rounded p-1">
          {['ALL', 'BIKES', 'SCOOTERS'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded text-xs font-bold tracking-wider transition-all ${
                filter === f 
                  ? 'bg-[var(--color-primary-orange)] text-white' 
                  : 'text-[var(--color-text-muted)] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStations.map((station) => (
          <motion.div 
            key={station.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <StationCard 
              station={station} 
              onUpdate={handleUpdateStation} 
              onDelete={handleDeleteStation}
            />
          </motion.div>
        ))}
        {filteredStations.length === 0 && (
          <div className="col-span-1 md:col-span-2 py-20 text-center text-[var(--color-text-muted)]">
            No stations found matching your criteria.
          </div>
        )}
      </div>

      {/* Add Station Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="absolute inset-0" onClick={() => setIsAddModalOpen(false)}></div>
          
          <div className="glass-card relative w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-serif text-white mb-6">Add New Station</h2>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Station Name</label>
                <input id="addName" type="text" className="w-full bg-black/20 border border-[var(--color-border-subtle)] rounded p-3 text-white focus:outline-none focus:border-[var(--color-primary-orange)]" />
                {addErrors.name && <p className="text-[var(--color-error)] text-xs mt-1">{addErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Address</label>
                <input id="addAddress" type="text" className="w-full bg-black/20 border border-[var(--color-border-subtle)] rounded p-3 text-white focus:outline-none focus:border-[var(--color-primary-orange)]" />
                {addErrors.address && <p className="text-[var(--color-error)] text-xs mt-1">{addErrors.address}</p>}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Bikes</label>
                  <input id="addBikes" type="number" min="0" defaultValue="0" className="w-full bg-black/20 border border-[var(--color-border-subtle)] rounded p-3 text-white focus:outline-none focus:border-[var(--color-primary-orange)]" />
                  {addErrors.bikes && <p className="text-[var(--color-error)] text-xs mt-1">{addErrors.bikes}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Scooters</label>
                  <input id="addScooters" type="number" min="0" defaultValue="0" className="w-full bg-black/20 border border-[var(--color-border-subtle)] rounded p-3 text-white focus:outline-none focus:border-[var(--color-primary-orange)]" />
                  {addErrors.scooters && <p className="text-[var(--color-error)] text-xs mt-1">{addErrors.scooters}</p>}
                </div>
              </div>

              <button 
                onClick={handleAddSubmit}
                className="w-full bg-[var(--color-primary-orange)] hover:bg-[var(--color-secondary-orange)] text-white font-semibold rounded p-3 mt-4 transition-colors uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(249,115,22,0.3)]"
              >
                Create Station
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Stations;
