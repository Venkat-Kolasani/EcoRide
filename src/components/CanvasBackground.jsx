import React, { useEffect, useRef } from 'react';

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const numParticles = 200; // Increased for more dense/vm feel

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        targetRadius: Math.random() * 1.5, // for subtle pulsing
        glow: Math.random() > 0.95, // a few particles glow
        vx: (Math.random() - 0.5) * 0.2, // very slow drift
        vy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random(),
        opDir: Math.random() > 0.5 ? 0.005 : -0.005
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw 3 orbital rings
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDim = Math.max(canvas.width, canvas.height);
      
      ctx.save();
      ctx.translate(centerX, centerY);
      angle += 0.001; // slow rotation
      ctx.rotate(angle);
      
      // Ring 1
      ctx.beginPath();
      ctx.ellipse(0, 0, maxDim * 0.4, maxDim * 0.2, 0, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Ring 2
      ctx.rotate(Math.PI / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, maxDim * 0.45, maxDim * 0.25, 0, 0, 2 * Math.PI);
      ctx.stroke();

      // Ring 3
      ctx.rotate(Math.PI / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, maxDim * 0.35, maxDim * 0.15, 0, 0, 2 * Math.PI);
      ctx.stroke();
      
      ctx.restore();

      // Update & draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Opacity pulsing
        p.opacity += p.opDir;
        if (p.opacity >= 1) p.opDir = -Math.random() * 0.01;
        if (p.opacity <= 0) p.opDir = Math.random() * 0.01;

        ctx.beginPath();
        if (p.glow) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.max(0, p.opacity)})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.radius * 6, 0, 2 * Math.PI);
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.opacity * 0.5)})`;
          ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        }
        ctx.fill();
        
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

export default CanvasBackground;
