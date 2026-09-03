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
          {title}
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
