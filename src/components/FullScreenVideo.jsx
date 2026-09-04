import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './FullScreenVideo.css';

const FullScreenVideo = ({ videoSrc, title = "Kelzor", quote = "AI ads, reimagined" }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className="hero" ref={sectionRef}>
      {/* Background Video Layer */}
      <motion.div className="hero__video-wrap" style={{ scale: videoScale }}>
        <video
          className="hero__video"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>

      {/* Hero Overlay */}
      <motion.div className="hero__overlay" style={{ opacity: overlayOpacity }} />



      {/* Minimal HUD Viewfinder Corner Brackets & Telemetry */}
      <div className="hero__hud">
        <motion.div
          className="hero__hud-corner hero__hud-corner--tl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M0 35 V 10 Q 10 0 20 0 H 40" stroke="rgba(94, 212, 255, 0.4)" strokeWidth="1.5" />
          </svg>

        </motion.div>

        <motion.div
          className="hero__hud-corner hero__hud-corner--br"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >

          <svg viewBox="0 0 40 40" fill="none">
            <path d="M40 5 V 30 Q 30 40 20 40 H 0" stroke="rgba(94, 212, 255, 0.4)" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>

      {/* Hero Center Title & Quote */}
      <motion.div className="hero__content" style={{ y: titleY }}>
        <motion.h1
          className="hero__title"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {title === "Kelzor" || title === "KELZOR" ? (
            <span className="hero__title-styled">
              KEL
              <span className="hero__z-wrap">
                Z

              </span>
              OR
            </span>
          ) : (
            title
          )}
        </motion.h1>

        {/* Quote with SVG Underline Accent */}
        <motion.div
          className="hero__quote-box"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero__quote">{quote}</p>
          <svg className="hero__quote-underline-svg" viewBox="0 0 240 16" fill="none">
            <motion.path
              d="M 5 10 C 60 2, 180 14, 235 6"
              stroke="url(#hero-quote-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.9 }}
            />
            <defs>
              <linearGradient id="hero-quote-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5ed4ff" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Minimal Animated SVG Scroll Indicator */}
        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className="hero__scroll-line" />
          <svg className="hero__scroll-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <motion.path
              d="M6 9l6 6 6-6"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FullScreenVideo;
