import React, { useRef, useEffect } from 'react';

/**
 * HeroMeshLine — Fluid multi-color gradient line that follows the cursor
 * Creates a sleek, glowing, tapered line transitioning through vibrant colors
 * (electric lime, cyan, cobalt blue, vivid violet, magenta, and warm orange).
 */
const HeroMeshLine = ({ containerRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Trail points history
    const points = [];
    const MAX_POINTS = 38;
    const POINT_LIFETIME = 550; // ms

    const mouse = {
      x: -100,
      y: -100,
      targetX: -100,
      targetY: -100,
      active: false,
    };

    const container = containerRef?.current || canvas.parentElement;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.targetX = x;
      mouse.targetY = y;
      mouse.active = true;

      if (mouse.x === -100) {
        mouse.x = x;
        mouse.y = y;
      }
    };

    const onMouseEnter = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.x = mouse.targetX;
      mouse.y = mouse.targetY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    if (container) {
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseenter', onMouseEnter);
      container.addEventListener('mouseleave', onMouseLeave);
    }

    // Spectrum palette: Electric Lime -> Cyan -> Cobalt -> Violet -> Magenta -> Sunset Orange
    const spectrum = [
      { r: 163, g: 230, b: 53 },  // Electric Lime (#a3e635)
      { r: 6,   g: 182, b: 212 }, // Vivid Cyan (#06b6d4)
      { r: 37,  g: 99,  b: 235 }, // Cobalt Royal (#2563eb)
      { r: 139, g: 92,  b: 246 }, // Electric Violet (#8b5cf6)
      { r: 236, g: 72,  b: 153 }, // Neon Magenta (#ec4899)
      { r: 249, g: 115, b: 22 },  // Sunset Orange (#f97316)
    ];

    function getColorAtProgress(p, timeOffset = 0) {
      // Loop seamlessly through spectrum with time flow
      const t = (p + timeOffset) % 1;
      const count = spectrum.length;
      const scaled = t * count;
      const idx1 = Math.floor(scaled) % count;
      const idx2 = (idx1 + 1) % count;
      const factor = scaled - Math.floor(scaled);

      const c1 = spectrum[idx1];
      const c2 = spectrum[idx2];

      const r = Math.round(c1.r + (c2.r - c1.r) * factor);
      const g = Math.round(c1.g + (c2.g - c1.g) * factor);
      const b = Math.round(c1.b + (c2.b - c1.b) * factor);

      return { r, g, b };
    }

    let time = 0;

    const render = () => {
      time += 0.008;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const now = performance.now();

      // Smooth mouse easing toward cursor
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.45;
        mouse.y += (mouse.targetY - mouse.y) * 0.45;

        // Push new point if moved or list empty
        const last = points[0];
        const dist = last ? Math.hypot(mouse.x - last.x, mouse.y - last.y) : 999;
        if (dist > 2) {
          points.unshift({
            x: mouse.x,
            y: mouse.y,
            created: now,
          });
        }
      }

      // Evict expired points
      while (points.length > 0 && (now - points[points.length - 1].created > POINT_LIFETIME || points.length > MAX_POINTS)) {
        points.pop();
      }

      if (points.length > 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw segmented curve with smooth quadratic midpoints and flowing colors
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          const progress = i / points.length; // 0 at head, 1 at tail
          const age = now - p1.created;
          const lifeProgress = Math.max(0, 1 - age / POINT_LIFETIME);

          const { r, g, b } = getColorAtProgress(progress, time);
          const alpha = (1 - progress * 0.85) * lifeProgress * 0.9;
          const lineWidth = Math.max(1, (1 - progress) * 6.5);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = lineWidth;

          if (i === 0) {
            ctx.moveTo(p1.x, p1.y);
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            ctx.lineTo(midX, midY);
          } else {
            const pPrev = points[i - 1];
            const prevMidX = (pPrev.x + p1.x) / 2;
            const prevMidY = (pPrev.y + p1.y) / 2;
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            ctx.moveTo(prevMidX, prevMidY);
            ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
          }

          ctx.stroke();
        }

        // Add soft glowing tip dot at cursor head
        if (mouse.active && points.length > 0) {
          const head = points[0];
          const tipColor = getColorAtProgress(0, time);
          ctx.beginPath();
          ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${tipColor.r}, ${tipColor.g}, ${tipColor.b})`;
          ctx.shadowColor = `rgba(${tipColor.r}, ${tipColor.g}, ${tipColor.b}, 0.6)`;
          ctx.shadowBlur = 8;
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseenter', onMouseEnter);
        container.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="hero__mesh-canvas"
      aria-hidden="true"
    />
  );
};

export default HeroMeshLine;
