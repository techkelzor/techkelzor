import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * MorphingTagline — Cycles through tagline phrases with a
 * scramble/decode effect. Each word dissolves into random characters,
 * then resolves into the next phrase.
 */

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

const phrases = [
  'AI ads, reimagined',
  'Stories that move',
  'Beyond imagination',
  'Create the impossible',
  'Motion without limits',
];

const MorphingTagline = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const morphTo = useCallback((targetText) => {
    setIsTransitioning(true);
    const maxLen = Math.max(displayText.length || targetText.length, targetText.length);
    const padded = targetText.padEnd(maxLen);
    const steps = 20;
    let step = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      step++;
      const progress = step / steps;

      const result = padded.split('').map((char, i) => {
        const charProgress = Math.max(0, (progress - (i / maxLen) * 0.5) / 0.5);
        if (charProgress >= 1) return char;
        if (char === ' ' && charProgress > 0.5) return ' ';
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('').trimEnd();

      setDisplayText(result);

      if (step >= steps) {
        clearInterval(intervalRef.current);
        setDisplayText(targetText);
        setIsTransitioning(false);
      }
    }, 45);
  }, [displayText]);

  useEffect(() => {
    // Initial reveal
    const initialDelay = setTimeout(() => {
      morphTo(phrases[0]);
    }, 1800);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    // Cycle through phrases
    const cycleInterval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % phrases.length;
        morphTo(phrases[next]);
        return next;
      });
    }, 3500);

    return () => {
      clearInterval(cycleInterval);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [morphTo]);

  return (
    <div className={`morphing-tagline ${className}`}>
      <p className="morphing-tagline__text">
        {displayText || '\u00A0'}
      </p>
      <div className="morphing-tagline__underline">
        <div
          className="morphing-tagline__underline-fill"
          style={{
            transform: `scaleX(${isTransitioning ? 0.3 : 1})`,
          }}
        />
      </div>
    </div>
  );
};

export default MorphingTagline;
