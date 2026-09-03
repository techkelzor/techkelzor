import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './CTASection.css';

const CTASection = ({ 
  tagline = "Clear steps, faster loops, better outcomes", 
  buttonText = "Connect with us", 
  link = "/contact",
  subtext = "Transform your vision into high-converting, motion-driven creative campaigns with our AI-powered production engine.",
  badgeText = "LET'S BUILD TOGETHER"
}) => {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section 
      className="cta" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Cursor Light Spotlight */}
      <div 
        className="cta__spotlight"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(94, 212, 255, 0.16), transparent 70%)`
        }}
      />

      {/* Ambient Glowing Background Orbs */}
      <motion.div className="cta__bg" style={{ y: bgY }}>
        <div className="cta__glow-orb cta__glow-orb--1" />
        <div className="cta__glow-orb cta__glow-orb--2" />
        <div className="cta__circle cta__circle--1" />
        <div className="cta__circle cta__circle--2" />
      </motion.div>

      {/* Background Tech Grid Lines */}
      <div className="cta__tech-grid">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="cta__content container">
        {/* Shimmering Badge */}
        <motion.div
          className="cta__badge"
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="cta__pulse-dot" />
          <span className="cta__badge-text">{badgeText}</span>
        </motion.div>

        {/* Main Heading Tagline */}
        <motion.h2
          className="cta__tagline"
          initial={{ y: 35, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="cta__tagline-text">{tagline}</span>
        </motion.h2>

        {/* Supporting Narrative */}
        {subtext && (
          <motion.p
            className="cta__subtext"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtext}
          </motion.p>
        )}

        {/* Interactive Action Area */}
        <motion.div
          className="cta__action-wrap"
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to={link} className="cta__button">
            <span className="cta__button-bg" />
            <span className="cta__button-text">{buttonText}</span>
            <div className="cta__button-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.166 10h11.668M11.666 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </motion.div>

        {/* Quick Reassurance Pill Bar */}
        <motion.div 
          className="cta__pills"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <div className="cta__pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>Response &lt; 2 hrs</span>
          </div>
          <div className="cta__pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>No Long Contracts</span>
          </div>
          <div className="cta__pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Fast Turnarounds</span>
          </div>
        </motion.div>

        {/* Viewfinder Telemetry Corners */}
        <div className="cta__corners">
          <span className="cta__hud-tag cta__hud-tag--tl">CONNECT // DIRECT</span>
          <svg className="cta__corner cta__corner--tl" viewBox="0 0 40 40" fill="none">
            <path d="M0 40 V 10 Q 10 0 20 0 H 40" stroke="rgba(94, 212, 255, 0.4)" strokeWidth="2"/>
          </svg>

          <span className="cta__hud-tag cta__hud-tag--br">STATUS // ACCEPTING PROJECTS</span>
          <svg className="cta__corner cta__corner--br" viewBox="0 0 40 40" fill="none">
            <path d="M40 0 V 30 Q 30 40 20 40 H 0" stroke="rgba(94, 212, 255, 0.4)" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
