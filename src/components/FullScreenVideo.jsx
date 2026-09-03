import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './FullScreenVideo.css';

const FullScreenVideo = ({ videoSrc, title = "Kelzor", quote = "AI ads, reimagined" }) => {
  const sectionRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 850); // 0.85 sec splash screen
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className="hero" ref={sectionRef}>
      {/* 0.8s Full-Screen SVG Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="hero__splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero__splash-content">
              <svg
                className="hero__splash-z-svg"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Rotating Dashed Target Ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="rgba(94, 212, 255, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Animated 'Z' Path */}
                <motion.path
                  d="M 50 55 L 150 55 L 50 145 L 150 145"
                  stroke="url(#splash-z-grad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                
                {/* Laser Glow Beam */}
                <motion.line
                  x1="30" y1="100" x2="170" y2="100"
                  stroke="#5ed4ff"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                />

                <defs>
                  <linearGradient id="splash-z-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#5ed4ff" />
                    <stop offset="100%" stopColor="#16385C" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.span 
                className="hero__splash-brand"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
              >
                KEL<span className="hero__splash-z-text">Z</span>OR
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <motion.div className="hero__overlay" style={{ opacity: overlayOpacity }} />

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
              <span className="hero__z-accent">
                Z
                <svg className="hero__z-spark-svg" viewBox="0 0 100 120" fill="none">
                  <motion.path
                    d="M 10 20 L 90 20 L 10 100 L 90 100"
                    stroke="url(#title-z-gradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, delay: 0.7, times: [0, 0.6, 1], ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="title-z-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5ed4ff" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              OR
            </span>
          ) : (
            title
          )}
        </motion.h1>

        <motion.p
          className="hero__quote"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {quote}
        </motion.p>

        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="hero__scroll-line" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FullScreenVideo;
