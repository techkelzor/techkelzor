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
            <p>
              A specialized creative technology studio fusing generative AI models with high-end motion design to pioneer the next generation of digital advertising.
            </p>
          </div>
          <div className="about-grid__item">
            <h3>What drives us</h3>
            <p>
              Eliminating agency friction and traditional render bottlenecks to deliver broadcast-quality video assets at hyper-velocity.
            </p>
          </div>
          <div className="about-grid__item">
            <h3>Our approach</h3>
            <p>
              Motion-first storytelling backed by algorithmic precision, data-informed strategy, and meticulous human craftsmanship.
            </p>
          </div>
        </div>
      </SectionRevealer>

      <SectionRevealer bg="white" className="about-statement-revealer">
        <div className="about-statement">
          {/* Animated Background SVG Lines */}
          <div className="about-statement__svg-bg">
            <svg
              className="about-statement__canvas"
              viewBox="0 0 1440 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M-100 150 C 350 20, 850 420, 1540 100"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="2"
                strokeDasharray="8 10"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <motion.path
                d="M-100 380 C 450 540, 950 120, 1540 320"
                stroke="url(#about-statement-grad)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.2 }}
              />
              <defs>
                <linearGradient id="about-statement-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                  <stop offset="50%" stopColor="rgba(94, 212, 255, 0.9)" />
                  <stop offset="100%" stopColor="rgba(22, 56, 92, 0.4)" />
                </linearGradient>
                <linearGradient id="statement-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5ed4ff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="about-statement__content">
            <h2>
              Architecting the{' '}
              <span className="about-statement__highlight">
                future of commercial motion
                <svg className="about-statement__underline-svg" viewBox="0 0 320 20" fill="none">
                  <motion.path
                    d="M5 15 C 80 5, 240 18, 315 8"
                    stroke="url(#statement-underline)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                  />
                </svg>
              </span>{' '}
              design
            </h2>
          </div>
        </div>
      </SectionRevealer>
    </>
  );
};

export default About;
