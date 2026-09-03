import React from 'react';
import { motion } from 'framer-motion';
import './TaglineSection.css';

const TaglineSection = () => {
  return (
    <section className="tagline-section">
      {/* Background Animated SVG Lines */}
      <div className="tagline-section__svg-bg">
        <svg
          className="tagline-section__canvas"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Animated Wave Path 1 */}
          <motion.path
            d="M-100 250 C 300 50, 700 450, 1540 200"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
            strokeDasharray="8 8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />

          {/* Animated Wave Path 2 (Glow accent) */}
          <motion.path
            d="M-100 650 C 400 850, 900 350, 1540 600"
            stroke="url(#blue-gradient)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* Decorative Iris Rings */}
          <g transform="translate(1150, 250)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="0"
                cy="0"
                r="180"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.5"
                strokeDasharray="12 12"
              />
              <circle
                cx="0"
                cy="0"
                r="240"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="-200"
                x2="0"
                y2="200"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
              <line
                x1="-200"
                y1="0"
                x2="200"
                y2="0"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
            </motion.g>
          </g>

          {/* SVG Gradient Definition */}
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="50%" stopColor="rgba(100, 180, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="tagline-section__inner container">
        {/* Top Floating SVG Badge */}
        <motion.div
          className="tagline-section__badge"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg className="tagline-section__badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Production Redefined</span>
        </motion.div>

        {/* Main Text with Animated Underline SVG */}
        <motion.div
          className="tagline-section__text-wrap"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="tagline-section__heading">
            <span className="tagline-section__highlight">
              Motion-first
              <svg className="tagline-section__underline-svg" viewBox="0 0 300 20" fill="none">
                <motion.path
                  d="M5 15 C 80 5, 220 18, 295 8"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                />
              </svg>
            </span>{' '}
            storytelling without the studio bottleneck
          </h2>
        </motion.div>

        {/* Viewfinder Corner Accents */}
        <div className="tagline-section__corners">
          <svg className="corner corner--tl" viewBox="0 0 40 40" fill="none">
            <path d="M0 40 V 10 Q 10 0 20 0 H 40" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
          </svg>
          <svg className="corner corner--br" viewBox="0 0 40 40" fill="none">
            <path d="M40 0 V 30 Q 30 40 20 40 H 0" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default TaglineSection;
