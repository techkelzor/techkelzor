import React from 'react';
import { motion } from 'framer-motion';
import SectionRevealer from '../components/SectionRevealer';
import CTASection from '../components/CTASection';
import './About.css';

const whyKelzorItems = [
  {
    title: '13 YEARS',
    desc: 'of filmmaking experience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    )
  },
  {
    title: 'AI-FIRST',
    desc: 'production workflows.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    title: 'CINEMATIC',
    desc: 'visual storytelling.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    )
  },
  {
    title: 'END-TO-END',
    desc: 'from idea to final film.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    )
  },
  {
    title: 'LIMITLESS',
    desc: 'locations, characters & visual worlds.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }
];

const limitations = [
  'Locations',
  'Casting',
  'Weather',
  'Travel',
  'Sets',
  'Equipment',
  'Production scale'
];

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-hero__dot" />
            <span>ABOUT KELZOR</span>
          </motion.div>

          <motion.h1
            className="about-hero__title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Expanding what filmmaking can be
          </motion.h1>
        </div>
      </section>

      {/* WHY KELZOR? Section */}
      <SectionRevealer bg="white">
        <div className="about-why-header">
          <p className="about-why-header__label">WHY KELZOR?</p>
          <h2 className="about-why-header__title">Built on 13 years of cinema craft</h2>
        </div>

        <div className="about-why-grid">
          {whyKelzorItems.map((item, index) => (
            <motion.div
              key={index}
              className="about-why-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              <div className="about-why-card__icon-wrap">
                {item.icon}
              </div>
              <h3 className="about-why-card__title">{item.title}</h3>
              <p className="about-why-card__desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionRevealer>

      {/* THE KELZOR PROMISE Section */}
      <SectionRevealer bg="white" className="about-promise-revealer">
        <div className="about-promise">
          {/* Animated Background Canvas Lines */}
          <div className="about-promise__svg-bg">
            <svg
              className="about-promise__canvas"
              viewBox="0 0 1440 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M-100 180 C 350 40, 850 480, 1540 120"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="2"
                strokeDasharray="8 10"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <motion.path
                d="M-100 420 C 450 580, 950 150, 1540 320"
                stroke="url(#about-blue-gradient)"
                strokeWidth="3.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.2 }}
              />
              <defs>
                <linearGradient id="about-blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                  <stop offset="50%" stopColor="rgba(94, 212, 255, 0.9)" />
                  <stop offset="100%" stopColor="rgba(22, 56, 92, 0.4)" />
                </linearGradient>
                <linearGradient id="promise-underline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5ed4ff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="about-promise__inner">
            {/* <motion.div
              className="about-promise__badge"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="about-promise__pulse-dot" />
              <span>THE KELZOR PROMISE</span>
            </motion.div> */}

            <motion.div
              className="about-promise__statement-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <h2 className="about-promise__heading">
                We don't use AI to replace filmmaking.{' '}
                <span className="about-promise__highlight">
                  We use AI to expand what filmmaking can be.
                  <svg className="about-promise__underline-svg" viewBox="0 0 340 24" fill="none">
                    <motion.path
                      d="M5 16 C 90 4, 240 20, 335 8"
                      stroke="url(#promise-underline-grad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                    />
                  </svg>
                </span>
              </h2>
            </motion.div>

            {/* <motion.div
              className="about-promise__limitations-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <p className="about-promise__sublabel">
                A production doesn't need to be limited by:
              </p>

              <div className="about-promise__tags">
                {limitations.map((limit, idx) => (
                  <motion.span
                    key={idx}
                    className="about-promise__tag"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.06 }}
                  >
                    {limit}.
                  </motion.span>
                ))}
              </div>
            </motion.div> */}

            {/* <motion.div
              className="about-promise__conclusion"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <p className="about-promise__conclusion-text">
                Your imagination becomes the starting point.
              </p>
            </motion.div> */}
          </div>
        </div>
      </SectionRevealer>

      {/* CTA Section */}
      <CTASection
        tagline="Ready to expand what your brand films can be?"
        buttonText="Get in touch"
        link="/contact"
      />
    </>
  );
};

export default About;
