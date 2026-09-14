import { useEffect, useRef, useCallback } from 'react';
import { LiquidLensEngine } from './LiquidLensEngine';

/**
 * useLiquidLens Hook
 * Attach a liquid lens WebGL canvas to any DOM element or container.
 */
export function useLiquidLens({
  radius = 95,
  strength = 0.12,
  magnification = 1.12,
  chromaticAberration = 0.0035,
  lerpFactor = 0.14,
  enabled = true,
} = {}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  const init = useCallback(() => {
    if (!canvasRef.current || !enabled) return;

    if (engineRef.current) {
      engineRef.current.destroy();
    }

    engineRef.current = new LiquidLensEngine({
      canvas: canvasRef.current,
      radius,
      strength,
      magnification,
      chromaticAberration,
      lerpFactor,
    });
  }, [enabled, radius, strength, magnification, chromaticAberration, lerpFactor]);

  useEffect(() => {
    init();
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, [init]);

  const setTexture = useCallback((source) => {
    if (engineRef.current) {
      engineRef.current.setTexture(source);
    }
  }, []);

  return {
    containerRef,
    canvasRef,
    engineRef,
    setTexture,
  };
}

export default useLiquidLens;
