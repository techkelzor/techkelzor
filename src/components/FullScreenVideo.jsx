import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import HeroMeshLine from './HeroMeshLine';
import './FullScreenVideo.css';

/* ─────────────────────────────────────────────────────────────
   HERO — Editorial Split Layout with Rich Hover Physics
   Left: Interactive typography + CTAs
   Right: 3D interactive tilt video card with sheen and micro-details
   ───────────────────────────────────────────────────────────── */

const FullScreenVideo = ({ videoSrc, title = "Kelzor", quote = "AI ads, reimagined" }) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Parallax scroll transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const cardScrollY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  // 3D Tilt & Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for buttery smooth physics
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 280,
    damping: 24,
  });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 280,
    damping: 24,
  });
  const cardScale = useSpring(1, { stiffness: 280, damping: 22 });
  const sheenX = useSpring(50, { stiffness: 300, damping: 25 });
  const sheenY = useSpring(50, { stiffness: 300, damping: 25 });
  const sheenOpacity = useSpring(0, { stiffness: 200, damping: 25 });

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    sheenX.set(((e.clientX - rect.left) / rect.width) * 100);
    sheenY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleCardMouseEnter = () => {
    setIsCardHovered(true);
    cardScale.set(1.028);
    sheenOpacity.set(0.55);
  };

  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    cardScale.set(1);
    sheenOpacity.set(0);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="hero" ref={sectionRef}>
      {/* ═══ COLORFUL MESH LINE CURSOR TRAIL ═══ */}
      <HeroMeshLine containerRef={sectionRef} />

      {/* ═══ MAIN GRID ═══ */}
      <div className="hero__grid">

        {/* LEFT — Typography + CTA */}
        <motion.div className="hero__left" style={{ y: contentY }}>
          <div className="hero__heading-group">
            <motion.h1
              className="hero__heading"
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="hero__heading-line hero__heading-line--serif hero__interactive-word"
                whileHover={{
                  y: -5,
                  scale: 1.03,
                  color: '#16385C',
                  transition: { type: 'spring', stiffness: 400, damping: 18 },
                }}
              >
                Ideas
              </motion.span>
              <motion.span
                className="hero__heading-line hero__heading-line--sans hero__interactive-word"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  color: '#e85d3a',
                  transition: { type: 'spring', stiffness: 400, damping: 18 },
                }}
              >
                made
              </motion.span>
              <motion.span
                className="hero__heading-line hero__heading-line--serif hero__interactive-word"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -5,
                  scale: 1.03,
                  color: '#16385C',
                  transition: { type: 'spring', stiffness: 400, damping: 18 },
                }}
              >
                visible.
              </motion.span>
            </motion.h1>
          </div>

          <motion.div
            className="hero__desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              <strong>Director-led. Motion-first.</strong> We turn an unexpected thought
              into a campaign people can feel — from first frame to final cut.
            </p>
          </motion.div>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="/contact"
              className="hero__btn hero__btn--primary"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span>Imagine with us</span>
              <svg className="hero__btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.a>

            <motion.button
              className="hero__btn hero__btn--ghost"
              onClick={togglePlay}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <svg className={`hero__btn-icon-spin ${isPlaying ? 'hero__btn-icon-spin--active' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
              </svg>
              <span>{isPlaying ? 'Motion on' : 'Motion paused'}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT — Video Card with 3D Tilt Hover Animation */}
        <div className="hero__right">
          {/* Floating badge with interactive magnetic spin hover */}
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 1.1, type: 'spring', stiffness: 220 }}
            whileHover={{
              scale: 1.18,
              rotate: 180,
              boxShadow: '0 8px 24px rgba(232, 93, 58, 0.45)',
              transition: { type: 'spring', stiffness: 320, damping: 15 }
            }}
          >
            <span>HUMAN<br />DIRECTED</span>
          </motion.div>

          {/* Video Card Container with 3D perspective */}
          <motion.div
            ref={cardRef}
            className="hero__video-card-wrapper"
            style={{
              y: cardScrollY,
              perspective: 1100,
            }}
            onMouseMove={handleCardMouseMove}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <motion.div
              className={`hero__video-card ${isCardHovered ? 'hero__video-card--hovered' : ''}`}
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                scale: cardScale,
              }}
              initial={{
                opacity: 0,
                scale: 0.88,
                rotate: 6,
                y: 50,
                filter: 'blur(10px)',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 2,
                y: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 1.1,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Dynamic Glass Sheen on Hover */}
              <motion.div
                className="hero__card-sheen"
                style={{
                  opacity: sheenOpacity,
                  background: useTransform(
                    [sheenX, sheenY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)`
                  ),
                }}
              />

              {/* Card header */}
              <div className="hero__card-header">
                <div className="hero__card-header-left">
                  <span className="hero__card-status-dot" />
                  <span className="hero__card-label">SPECULATIVE FILM / 01</span>
                </div>
                <span className="hero__card-time">{isPlaying ? 'LIVE PREVIEW' : 'PAUSED'}</span>
              </div>

              {/* Video with clip-path reveal and interactive zoom */}
              <motion.div
                className="hero__video-frame"
                initial={{ clipPath: 'inset(100% 0 0 0 round 12px)' }}
                animate={{ clipPath: 'inset(0% 0 0 0 round 12px)' }}
                transition={{
                  duration: 1.3,
                  delay: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  className="hero__video"
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Hover Video Overlay / Play Cue */}
                <div className="hero__video-overlay">
                  <div className="hero__video-overlay-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      {isPlaying ? (
                        <>
                          <rect x="6" y="5" width="4" height="14" rx="1.5" />
                          <rect x="14" y="5" width="4" height="14" rx="1.5" />
                        </>
                      ) : (
                        <polygon points="7,5 19,12 7,19" />
                      )}
                    </svg>
                    <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                  </div>

                  {/* Soundwave Bars on Hover */}
                  <div className="hero__video-soundbars">
                    <span className="bar bar-1" />
                    <span className="bar bar-2" />
                    <span className="bar bar-3" />
                    <span className="bar bar-4" />
                  </div>
                </div>

                {/* Interactive Progress Line */}
                <div className="hero__video-progress">
                  <div className="hero__video-progress-bar" />
                </div>
              </motion.div>

              {/* Card footer */}
              <div className="hero__card-footer">
                <span className="hero__card-tag">MADE FOR FEELING</span>
                <span className="hero__card-meta">KELZOR / IMMERSIVE ADS</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating tilted card with interactive hover bounce */}
          <motion.a
            href="/contact"
            className="hero__float-card"
            initial={{ opacity: 0, y: 40, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              rotate: 0,
              scale: 1.08,
              y: -6,
              boxShadow: '0 16px 36px rgba(22, 56, 92, 0.22)',
              transition: { type: 'spring', stiffness: 350, damping: 18 }
            }}
          >
            <span>Still thinking?</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <motion.div
        className="hero__bottombar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className="hero__scroll-hint">
          <span>SCROLL TO EXPLORE</span>
          <div className="hero__scroll-line" />
        </div>
        <span className="hero__bottom-tags">CONCEPT + CAMPAIGN</span>
      </motion.div>
    </section>
  );
};

export default FullScreenVideo;
