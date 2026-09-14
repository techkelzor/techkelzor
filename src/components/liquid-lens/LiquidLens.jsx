import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { LiquidLensEngine } from './LiquidLensEngine';
import './LiquidLens.css';

function isInteractiveDevice() {
  if (typeof window === 'undefined') return false;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return hasFinePointer && !prefersReducedMotion;
}

/**
 * LiquidLens Component
 * 
 * Versatile Liquid Water Droplet Magnification Lens:
 * Can wrap:
 * - Simple typography strings
 * - Rich multiline Titles (h1, h2, h3) with SVG accents / gradients
 * - Paragraphs (p) and subtitles
 * - Media images
 */
export const LiquidLens = ({
  type, // 'typography' | 'image' | 'element'
  text = '',
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  color,
  src = '',
  radius = 95,
  strength = 0.14,
  magnification = 1.12,
  chromaticAberration = 0.0035,
  lerpFactor = 0.15,
  className = '',
  style = {},
  children,
  onClick,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fallbackRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const engineRef = useRef(null);
  const [canEnableWebGL, setCanEnableWebGL] = useState(false);

  // Auto-detect type
  const isPureString = typeof children === 'string' || (!children && text);
  const resolvedType = type || (src ? 'image' : (isPureString ? 'typography' : 'element'));
  const displayText = text || (typeof children === 'string' ? children : '');

  useEffect(() => {
    setCanEnableWebGL(isInteractiveDevice());
  }, []);

  // Direct Vector Typography Rendering for pure strings
  const renderTypography = useCallback((width, height) => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    const canvas = offscreenCanvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    let fSize = fontSize;
    let fFamily = fontFamily;
    let fWeight = fontWeight;
    let fSpacing = letterSpacing;
    let computedColor = color;

    if (containerRef.current) {
      const computed = window.getComputedStyle(containerRef.current);
      if (!fSize) fSize = computed.fontSize;
      if (!fFamily) fFamily = computed.fontFamily;
      if (!fWeight) fWeight = computed.fontWeight;
      if (!fSpacing && computed.letterSpacing !== 'normal') fSpacing = computed.letterSpacing;
      if (!computedColor) {
        computedColor = computed.color || '#ffffff';
      }
    }

    fFamily = fFamily || "'Playfair Display', Georgia, serif";
    fWeight = fWeight || '800';
    fSpacing = fSpacing || '-0.02em';

    let numericFontSize = 120;
    if (typeof fSize === 'number') {
      numericFontSize = fSize;
    } else if (typeof fSize === 'string' && fSize.endsWith('px')) {
      numericFontSize = parseFloat(fSize);
    } else {
      numericFontSize = Math.min(width / (Math.max(displayText.length, 1) * 0.52), height * 0.9);
    }

    ctx.font = `${fWeight} ${numericFontSize}px ${fFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (ctx.letterSpacing !== undefined && fSpacing) {
      ctx.letterSpacing = fSpacing;
    }

    if (Array.isArray(computedColor) && computedColor.length > 1) {
      const grad = ctx.createLinearGradient(0, height * 0.1, width, height * 0.9);
      computedColor.forEach((c, idx) => {
        grad.addColorStop(idx / (computedColor.length - 1), c);
      });
      ctx.fillStyle = grad;
    } else if (Array.isArray(computedColor)) {
      ctx.fillStyle = computedColor[0];
    } else {
      ctx.fillStyle = computedColor || '#ffffff';
    }

    ctx.fillText(displayText, width / 2, height / 2 + numericFontSize * 0.04);
    return canvas;
  }, [displayText, fontFamily, fontSize, fontWeight, letterSpacing, color]);

  // High-DPI Element Capture for complex titles, spans, and paragraphs
  const captureElement = useCallback((width, height) => {
    if (!fallbackRef.current) return;
    const el = fallbackRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    try {
      const cloned = el.cloneNode(true);
      cloned.style.visibility = 'visible';
      cloned.style.opacity = '1';
      cloned.style.width = `${width}px`;
      cloned.style.height = `${height}px`;

      const serialized = new XMLSerializer().serializeToString(cloned);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * dpr}" height="${height * dpr}" viewBox="0 0 ${width} ${height}">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; }
        </style>
        <foreignObject width="${width}" height="${height}">
          ${serialized}
        </foreignObject>
      </svg>`;

      const img = new Image();
      img.onload = () => {
        if (engineRef.current) {
          engineRef.current.setTexture(img);
        }
      };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    } catch (e) {
      console.warn('LiquidLens element capture:', e);
    }
  }, []);

  const updateContent = useCallback(() => {
    if (!engineRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.max(rect.width, 10);
    const height = Math.max(rect.height, 10);

    if (resolvedType === 'typography') {
      const offCanvas = renderTypography(width, height);
      if (offCanvas) {
        engineRef.current.setTexture(offCanvas);
      }
    } else if (resolvedType === 'image' && src) {
      const loader = new THREE.TextureLoader();
      loader.load(src, (texture) => {
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        if (engineRef.current) {
          engineRef.current.setTexture(texture);
        }
      });
    } else if (resolvedType === 'element') {
      captureElement(width, height);
    }
  }, [resolvedType, src, renderTypography, captureElement]);

  useEffect(() => {
    if (!canEnableWebGL || !canvasRef.current) return;

    const engine = new LiquidLensEngine({
      canvas: canvasRef.current,
      radius,
      strength,
      magnification,
      chromaticAberration,
      lerpFactor,
      hideAtRest: resolvedType === 'element',
    });
    engineRef.current = engine;

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (engineRef.current) {
          engineRef.current.resize();
          updateContent();
        }
      });
    } else {
      engineRef.current.resize();
      updateContent();
    }

    const handleResize = () => {
      if (engineRef.current) {
        engineRef.current.resize();
        updateContent();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, [canEnableWebGL, radius, strength, magnification, chromaticAberration, lerpFactor, resolvedType, updateContent]);

  useEffect(() => {
    if (engineRef.current) {
      updateContent();
    }
  }, [updateContent]);

  const handlePointerEnter = (e) => {
    if (!engineRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (resolvedType === 'element') {
      updateContent();
    }

    engineRef.current.onPointerEnter(x, y);
  };

  const handlePointerMove = (e) => {
    if (!engineRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    engineRef.current.onPointerMove(x, y);
  };

  const handlePointerLeave = () => {
    if (!engineRef.current) return;
    engineRef.current.onPointerLeave();
  };

  return (
    <div
      ref={containerRef}
      className={`liquid-lens-container ${resolvedType === 'element' ? 'liquid-lens-container--block' : ''} ${className}`}
      style={style}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      {/* Fallback / Content DOM Layer */}
      <div
        ref={fallbackRef}
        className={`liquid-lens-fallback ${
          canEnableWebGL && resolvedType === 'typography' ? 'liquid-lens-fallback--hidden' : ''
        }`}
      >
        {children || (
          resolvedType === 'image' ? (
            <img src={src} alt={displayText || 'Visual'} className="liquid-lens-fallback-image" />
          ) : (
            <span className="liquid-lens-fallback-text">{displayText}</span>
          )
        )}
      </div>

      {/* WebGL Distortion Shader Layer */}
      {canEnableWebGL && (
        <canvas
          ref={canvasRef}
          className="liquid-lens-canvas"
        />
      )}
    </div>
  );
};

export default LiquidLens;
