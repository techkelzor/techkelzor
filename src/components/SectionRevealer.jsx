import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SectionRevealer.css';

const SectionRevealer = ({ children, className = '', bg = 'white', fullHeight = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const bgMap = {
    white: 'var(--white)',
    blue: 'var(--blue)',
    'off-white': 'var(--off-white)',
    black: 'var(--black)',
  };

  return (
    <motion.section
      ref={ref}
      className={`section-revealer ${className} ${fullHeight ? 'section-revealer--full' : ''}`}
      style={{ background: bgMap[bg] || bg }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="section-revealer__inner"
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default SectionRevealer;
