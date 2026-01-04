import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Grid configuration
    const gridSize = 60; // Size of grid squares
    let offset = 0;

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear visually

      // Background base
      ctx.fillStyle = '#FAF8F5'; // Very light beige background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid
      ctx.beginPath();
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, canvas.height);
      }
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(canvas.width, y + 0.5);
      }

      ctx.strokeStyle = 'rgba(200, 190, 180, 0.25)'; // Increased visibility
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw "Crosshairs" at intersections for technical look
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          // Small crosshair
          const size = 2;
          ctx.moveTo(x - size, y);
          ctx.lineTo(x + size, y);
          ctx.moveTo(x, y - size);
          ctx.lineTo(x, y + size);
        }
      }
      ctx.strokeStyle = 'rgba(160, 150, 140, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // ANIMATION: scanline effect
      offset += 0.5;
      if (offset > canvas.height + 200) offset = -200;

      // Draw a subtle moving highlight line
      const gradient = ctx.createLinearGradient(0, offset, 0, offset + 150);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(200, 190, 180, 0.1)'); // Highlight color
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, offset, canvas.width, 150);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 1 }} // Controlled by canvas drawing
    />
  );
};

export default BackgroundAnimation;