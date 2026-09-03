import React from 'react';
import { motion } from 'framer-motion';
import SectionRevealer from '../components/SectionRevealer';
import './About.css';

const About = () => {
  return (
    <>
      <section className="about-hero">
        <div className="container">
          <motion.p
            className="about-hero__label"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            About
          </motion.p>
          <motion.h1
            className="about-hero__title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            We make AI ads that move people
          </motion.h1>
        </div>
      </section>

      <SectionRevealer bg="off-white">
        <div className="about-grid">
          <div className="about-grid__item">
            <h3>Who we are</h3>
            <p>A small, focused team at the intersection of AI and advertising.</p>
          </div>
          <div className="about-grid__item">
            <h3>What drives us</h3>
            <p>Better outcomes, faster loops, zero studio bottlenecks.</p>
          </div>
          <div className="about-grid__item">
            <h3>Our approach</h3>
            <p>Motion-first. Data-informed. Human-crafted.</p>
          </div>
        </div>
      </SectionRevealer>

      <SectionRevealer bg="blue">
        <div className="about-statement">
          <h2>Built for the future of advertising</h2>
        </div>
      </SectionRevealer>
    </>
  );
};

export default About;
