import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './TaglineSection.css';

const featureCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "10x Velocity",
    desc: "Instant AI generative workflows without render lag or bottlenecks."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
    title: "Cinema Fidelity",
    desc: "Hyper-realistic 4K motion output crafted for modern broadcast standards."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    title: "Real-time Loops",
    desc: "Instant iteration cycles that eliminate traditional agency friction."
  }
];

const TaglineSection = () => {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={sectionRef} 
      className="tagline-section"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Cursor Light Spotlight */}
      <div 
        className="tagline-section__spotlight"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(82, 172, 255, 0.15), transparent 70%)`
        }}
      />

      {/* Ambient Glowing Radial Background Orbs */}
      <div className="tagline-section__glow-orb tagline-section__glow-orb--1" />
      <div className="tagline-section__glow-orb tagline-section__glow-orb--2" />

      {/* Background Animated SVG Canvas */}
      <div className="tagline-section__svg-bg">
        <svg
          className="tagline-section__canvas"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Animated Wave Path 1 (Dashed Grid Wave) */}
          <motion.path
            d="M-100 220 C 300 20, 750 420, 1540 180"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
            strokeDasharray="8 12"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />

          {/* Animated Wave Path 2 (Electric Blue Cyan Gradient Wave) */}
          <motion.path
            d="M-100 680 C 450 880, 950 320, 1540 580"
            stroke="url(#tagline-blue-gradient)"
            strokeWidth="3.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2.6, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* Wave Path 3 (Subtle Accent line) */}
          <motion.path
            d="M-100 450 C 500 200, 800 650, 1540 380"
            stroke="rgba(94, 212, 255, 0.12)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 0.4 }}
          />

          {/* Glowing Target Node Points */}
          <motion.circle
            cx="480"
            cy="365"
            r="5"
            fill="#5ed4ff"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
          <motion.circle
            cx="480"
            cy="365"
            r="16"
            stroke="rgba(94, 212, 255, 0.4)"
            strokeWidth="1.5"
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Decorative Iris Rings */}
          <g transform="translate(1220, 220)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="0"
                cy="0"
                r="180"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1.5"
                strokeDasharray="10 14"
              />
              <circle
                cx="0"
                cy="0"
                r="250"
                stroke="rgba(94, 212, 255, 0.08)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <line x1="0" y1="-210" x2="0" y2="210" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
              <line x1="-210" y1="0" x2="210" y2="0" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
            </motion.g>
          </g>

          {/* SVG Gradient Definitions */}
          <defs>
            <linearGradient id="tagline-blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="40%" stopColor="rgba(94, 212, 255, 0.9)" />
              <stop offset="100%" stopColor="rgba(22, 56, 92, 0.4)" />
            </linearGradient>
            <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5ed4ff" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#3892e0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="tagline-section__inner container">
        {/* Top Floating Badge */}
        <motion.div
          className="tagline-section__badge"
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="tagline-section__pulse-dot" />
          <span className="tagline-section__badge-text">PRODUCTION REDEFINED // ENGINE 2.0</span>
        </motion.div>

        {/* Main Title & Subtitle */}
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
              <svg className="tagline-section__underline-svg" viewBox="0 0 320 24" fill="none">
                <motion.path
                  d="M5 16 C 90 4, 230 20, 315 8"
                  stroke="url(#underline-gradient)"
                  strokeWidth="4"
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

          <p className="tagline-section__subheading">
            We fuse generative AI velocity with high-end motion design to deliver broadcast-grade video assets in hours instead of weeks.
          </p>
        </motion.div>

        {/* Glassmorphism Feature Cards Grid */}
        <motion.div 
          className="tagline-section__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.35
              }
            }
          }}
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="tagline-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="tagline-card__icon-wrap">
                {card.icon}
              </div>
              <h3 className="tagline-card__title">{card.title}</h3>
              <p className="tagline-card__desc">{card.desc}</p>
              <div className="tagline-card__glow-border" />
            </motion.div>
          ))}
        </motion.div>

        {/* Viewfinder Corner HUD Accents */}
        <div className="tagline-section__corners">
          <div className="hud-label hud-label--tl">SYS // READY</div>
          <svg className="corner corner--tl" viewBox="0 0 40 40" fill="none">
            <path d="M0 40 V 10 Q 10 0 20 0 H 40" stroke="rgba(94, 212, 255, 0.5)" strokeWidth="2"/>
          </svg>
          
          <div className="hud-label hud-label--br">REC ● 60 FPS</div>
          <svg className="corner corner--br" viewBox="0 0 40 40" fill="none">
            <path d="M40 0 V 30 Q 30 40 20 40 H 0" stroke="rgba(94, 212, 255, 0.5)" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default TaglineSection;
