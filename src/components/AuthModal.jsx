import React, { useState } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let newErrors = {};

    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!data.password || data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (isRegister) {
      if (!data.fullName) {
        newErrors.fullName = "Full name is required";
      }
      if (data.password !== data.confirmPassword) {
        newErrors.confirmPassword = "Passwords must match";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success (mock)
    alert(isRegister ? "Account created successfully!" : "Logged in successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="glass-card relative w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-serif text-white mb-6">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>

        {/* Note: using <form> tag natively works best for standard inputs, but user requested "NO <form> tags — use div wrappers with onClick handlers on buttons". I will refactor to use a div wrapper. */}
        <div className="flex flex-col gap-4">
          
          {isRegister && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Full Name</label>
              <input id="fullName" type="text" className="w-full bg-black/20 border border-[var(--color-border-subtle)] rounded p-3 text-white focus:outline-none focus:border-[var(--color-primary-orange)]" />
              {errors.fullName && <p className="text-[var(--color-error)] text-xs mt-1">{errors.fullName}</p>}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Email</label>
            <input id="email" type="email" className="w-full bg-black/20 border border-[var(--color-border-subtle)] rounded p-3 text-white focus:outline-none focus:border-[var(--color-primary-orange)]" />
            {errors.email && <p className="text-[var(--color-error)] text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Password</label>
            <input id="password" type="password" className="w-full bg-black/20 border border-[var(--color-border-subtle)] rounded p-3 text-white focus:outline-none focus:border-[var(--color-primary-orange)]" />
            {errors.password && <p className="text-[var(--color-error)] text-xs mt-1">{errors.password}</p>}
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Confirm Password</label>
              <input id="confirmPassword" type="password" className="w-full bg-black/20 border border-[var(--color-border-subtle)] rounded p-3 text-white focus:outline-none focus:border-[var(--color-primary-orange)]" />
              {errors.confirmPassword && <p className="text-[var(--color-error)] text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <button 
            onClick={(e) => {
              const data = {
                email: document.getElementById('email')?.value,
                password: document.getElementById('password')?.value,
                ...(isRegister ? {
                  fullName: document.getElementById('fullName')?.value,
                  confirmPassword: document.getElementById('confirmPassword')?.value
                } : {})
              };

              let newErrors = {};

              if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
                newErrors.email = "Valid email is required";
              }
              if (!data.password || data.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters";
              }

              if (isRegister) {
                if (!data.fullName) {
                  newErrors.fullName = "Full name is required";
                }
                if (data.password !== data.confirmPassword) {
                  newErrors.confirmPassword = "Passwords must match";
                }
              }

              if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
              }

               setErrors({});
              // Success (mock)
              onClose();
            }}
            className="w-full bg-[var(--color-primary-orange)] hover:bg-[var(--color-secondary-orange)] text-white font-semibold rounded p-3 mt-2 transition-colors uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(249,115,22,0.3)]"
          >
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button 
            onClick={() => {
              setIsRegister(!isRegister);
              setErrors({});
            }}
            className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors"
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
