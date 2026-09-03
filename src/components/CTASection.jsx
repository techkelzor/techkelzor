import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './CTASection.css';

const CTASection = ({ tagline, buttonText, link }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section className="cta" ref={sectionRef}>
      <motion.div className="cta__bg" style={{ y: bgY }}>
        {/* Animated circles in the background */}
        <div className="cta__circle cta__circle--1" />
        <div className="cta__circle cta__circle--2" />
        <div className="cta__circle cta__circle--3" />
      </motion.div>

      <div className="cta__content container">
        <motion.h2
          className="cta__tagline"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {tagline}
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to={link} className="cta__button">
            {buttonText}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10h10M12 7l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
