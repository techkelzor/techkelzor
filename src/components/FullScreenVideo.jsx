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
      {/* Background Video Layer with Cinematic Aperture & Clip-path Reveal */}
      <motion.div
        className="hero__video-reveal-container"
        initial={{
          clipPath: 'inset(18% 12% round 32px)',
          filter: 'blur(20px) brightness(0.1)',
          scale: 1.18,
          opacity: 0,
        }}
        animate={{
          clipPath: 'inset(0% 0% round 0px)',
          filter: 'blur(0px) brightness(1)',
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.7,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
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

        {/* Cinematic Light Sweep / Scanner Beam */}
        <motion.div
          className="hero__video-beam"
          initial={{ x: '-100%', opacity: 0.8 }}
          animate={{ x: '250%', opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
          initial="hidden"
          animate="visible"
        >
          {title.toUpperCase() === "KELZOR" ? (
            <span className="hero__title-styled">
              {['K', 'E', 'L', 'Z', 'O', 'R'].map((char, index) => {
                const isZ = char === 'Z';

                if (isZ) {
                  return (
                    <motion.span
                      key={index}
                      className="hero__letter-slot"
                      initial={{
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        rotate: 0,
                      }}
                      animate={{
                        opacity: [0, 1, 1, 1, 1],
                        scale: [0, 1.45, 1.15, 1.15, 1],
                        x: [0, 0, -100, -100, 0],
                        rotate: [0, 0, -16, -16, 0],
                      }}
                      transition={{
                        duration: 1.6,
                        delay: 0.35,
                        times: [0, 0.25, 0.55, 0.75, 1],
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <motion.span
                        className="hero__z-wrap hero__letter"
                        whileHover={{
                          scale: 1.14,
                          y: -6,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        {char}
                      </motion.span>
                    </motion.span>
                  );
                }

                // Surrounding letters: 'K', 'E', 'L' and 'O', 'R' appear once Z docks
                const orderIndex = index < 3 ? index : index - 1;
                const letterDelay = 1.95 + orderIndex * 0.08;

                return (
                  <motion.span
                    key={index}
                    className="hero__letter-slot"
                    initial={{
                      opacity: 0,
                      y: -50,
                      scale: 0.6,
                      rotate: index % 2 === 0 ? -18 : 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      delay: letterDelay,
                      type: 'spring',
                      damping: 11,
                      stiffness: 130,
                      mass: 0.75,
                    }}
                  >
                    <motion.span
                      className="hero__letter"
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      {char}
                    </motion.span>
                  </motion.span>
                );
              })}
            </span>
          ) : (
            <span className="hero__title-styled">
              {title.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="hero__word-wrap">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      custom={wordIndex * 4 + charIndex}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: -50,
                          scale: 0.6,
                          filter: 'blur(10px)',
                        },
                        visible: (i) => ({
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: 'blur(0px)',
                          transition: {
                            delay: 0.3 + i * 0.08,
                            type: 'spring',
                            damping: 11,
                            stiffness: 130,
                            mass: 0.75,
                          },
                        }),
                      }}
                      whileHover={{
                        scale: 1.12,
                        rotate: [0, -8, 8, -4, 0],
                        transition: { duration: 0.45 },
                      }}
                      className="hero__letter"
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordIndex < title.split(" ").length - 1 && <span className="hero__space">&nbsp;</span>}
                </span>
              ))}
            </span>
          )}
        </motion.h1>

        {/* Quote with Word-by-Word Drop & Swing + SVG Underline Accent */}
        <div className="hero__quote-box">
          <motion.p
            className="hero__quote"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 2.45,
                },
              },
            }}
          >
            {quote.split(" ").map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={{
                  hidden: (idx) => ({
                    opacity: 0,
                    y: -35,
                    rotate: idx % 2 === 0 ? -12 : 12,
                    scale: 0.85,
                    filter: 'blur(6px)',
                  }),
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: {
                      type: 'spring',
                      damping: 12,
                      stiffness: 130,
                    },
                  },
                }}
                whileHover={{
                  y: -3,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="hero__quote-word"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
          <svg className="hero__quote-underline-svg" viewBox="0 0 240 16" fill="none">
            <motion.path
              d="M 5 10 C 60 2, 180 14, 235 6"
              stroke="url(#hero-quote-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 2.8 }}
            />
            <defs>
              <linearGradient id="hero-quote-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5ed4ff" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

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
