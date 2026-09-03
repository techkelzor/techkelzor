import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './ApproachSection.css';

const steps = [
  {
    number: '01',
    title: 'Concept & Scripting',
    subtitle: 'Vision & Narrative Blueprint',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
        <path d="M9 21h6" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Storyboard & Direction',
    subtitle: 'Visual Framing & Aesthetics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'AI Production',
    subtitle: 'Generative Motion Synthesis',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Editing & Sound',
    subtitle: 'Rhythm, SFX & Audio Score',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <path d="M14 14l6 6" />
      </svg>
    )
  },
  {
    number: '05',
    title: 'Final Film',
    subtitle: '4K Broadcast Delivery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    )
  }
];

const ApproachSection = () => {
  const containerRef = useRef(null);

  return (
    <section className="approach-compact approach-compact--white" ref={containerRef}>
      {/* Background Ambient Glow */}
      <div className="approach-compact__bg-glow" />

      <div className="approach-compact__inner container">
        {/* Header */}
        <motion.div
          className="approach-compact__header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="approach-compact__badge">
            <span className="approach-compact__pulse-dot" />
            <span>OUR APPROACH</span>
          </div>

          <h2 className="approach-compact__heading">
            Think Like a Filmmaker.{' '}
            <span className="approach-compact__highlight">
              Create Like the Future.
              <svg className="approach-compact__underline-svg" viewBox="0 0 340 24" fill="none">
                <motion.path
                  d="M5 16 C 90 4, 240 20, 335 8"
                  stroke="url(#compact-approach-grad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="compact-approach-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#16385C" />
                    <stop offset="100%" stopColor="#3892e0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <div className="approach-compact__quote-box">
            <span className="approach-compact__quote-text">We don't start with a prompt.</span>
            <span className="approach-compact__idea-badge">We start with an idea.</span>
          </div>
        </motion.div>

        {/* Compact Horizontal 5-Step Pipeline with Animated SVG Connecting Path */}
        <div className="approach-compact__pipeline">
          {/* Animated SVG Path Line connecting the nodes */}
          <div className="approach-compact__svg-connector">
            <svg viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M 50 30 C 250 5, 400 55, 600 20 C 750 0, 850 45, 950 30"
                stroke="url(#compact-svg-beam)"
                strokeWidth="3"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="compact-svg-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(22, 56, 92, 0.15)" />
                  <stop offset="50%" stopColor="#16385C" />
                  <stop offset="100%" stopColor="rgba(56, 146, 224, 0.3)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="approach-compact__grid">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                className="approach-mini-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.3, delay: idx * 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="approach-mini-card__top">
                  <span className="approach-mini-card__number">{step.number}</span>
                  <div className="approach-mini-card__icon">{step.icon}</div>
                </div>

                <h3 className="approach-mini-card__title">{step.title}</h3>
                <p className="approach-mini-card__subtitle">{step.subtitle}</p>

                <div className="approach-mini-card__node-dot" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
