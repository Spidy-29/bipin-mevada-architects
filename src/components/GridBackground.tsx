import { useEffect, useRef } from "react";

interface Spot {
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const spots: Spot[] = [];
    const gridSize = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSpot = () => {
      // Randomly choose horizontal or vertical
      const isVertical = Math.random() > 0.5;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      if (isVertical) {
        const colIndex = Math.floor(Math.random() * cols);
        return {
          x: colIndex * gridSize,
          y: Math.random() < 0.5 ? -20 : canvas.height + 20, // Start just outside
          dx: 0,
          dy: (Math.random() < 0.5 ? 1 : -1) * (1 + Math.random()), // Random speed
          life: 0,
          maxLife: 200 + Math.random() * 100, // Frames
          size: 1 + Math.random(),
        };
      } else {
        const rowIndex = Math.floor(Math.random() * rows);
        return {
          x: Math.random() < 0.5 ? -20 : canvas.width + 20,
          y: rowIndex * gridSize,
          dx: (Math.random() < 0.5 ? 1 : -1) * (1 + Math.random()),
          dy: 0,
          life: 0,
          maxLife: 200 + Math.random() * 100,
          size: 1 + Math.random(),
        };
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      // Use a distinct clear to prevent trails
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      // --- 1. Draw Static Grid ---
      ctx.lineWidth = 0.5; // Thinner lines

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        const x = i * gridSize;
        const opacity = 0.06 + Math.sin(time * 0.5 + i * 0.2) * 0.02;
        ctx.strokeStyle = `rgba(100, 90, 80, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let j = 0; j < rows; j++) {
        const y = j * gridSize;
        const opacity = 0.06 + Math.sin(time * 0.3 + j * 0.15) * 0.02;
        ctx.strokeStyle = `rgba(100, 90, 80, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // --- 2. Draw Intersection Dots (Subtle) ---
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          // Only show some intersections to reduce visual noise
          if ((i + j) % 2 === 0) continue;

          const pulse = Math.sin(time * 0.8 + i * 0.3 + j * 0.3);
          const opacity = 0.08 + pulse * 0.04;
          const size = 1 + pulse * 0.3;

          ctx.fillStyle = `rgba(100, 90, 80, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- 3. Manage and Draw Moving Spots ---
      // Spawn new spots
      if (spots.length < 8 && Math.random() < 0.05) {
        spots.push(createSpot());
      }

      // Update and draw spots
      for (let i = spots.length - 1; i >= 0; i--) {
        const spot = spots[i];
        spot.x += spot.dx;
        spot.y += spot.dy;
        spot.life++;

        // Fade in and out
        let spotOpacity = 1;
        if (spot.life < 50) spotOpacity = spot.life / 50;
        else if (spot.life > spot.maxLife - 50) spotOpacity = (spot.maxLife - spot.life) / 50;

        // Kill if out of bounds or old
        if (
          spot.life > spot.maxLife ||
          spot.x < -100 || spot.x > canvas.width + 100 ||
          spot.y < -100 || spot.y > canvas.height + 100
        ) {
          spots.splice(i, 1);
          continue;
        }

        // Draw "Head" (Bright moving dot)
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(100, 90, 80, 0.5)";
        ctx.fillStyle = `rgba(100, 90, 80, ${spotOpacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, spot.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw "Tail" (Streak)
        const tailLength = 40;
        const grad = ctx.createLinearGradient(
          spot.x, spot.y,
          spot.x - spot.dx * tailLength,
          spot.y - spot.dy * tailLength
        );
        grad.addColorStop(0, `rgba(100, 90, 80, ${spotOpacity * 0.4})`);
        grad.addColorStop(1, "rgba(100, 90, 80, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2; // Slightly wider than grid line
        ctx.beginPath();
        ctx.moveTo(spot.x, spot.y);
        ctx.lineTo(spot.x - spot.dx * tailLength, spot.y - spot.dy * tailLength);
        ctx.stroke();

        ctx.shadowBlur = 0; // Reset
      }

      time += 0.01;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
