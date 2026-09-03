import React from 'react';
import { motion } from 'framer-motion';
import SectionRevealer from '../components/SectionRevealer';
import ProjectSlider from '../components/ProjectSlider';
import './Work.css';

const Work = () => {
  return (
    <>
      <section className="work-hero">
        <div className="container">
          <motion.p
            className="work-hero__label"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Our
          </motion.p>
          <motion.h1
            className="work-hero__title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Best Works
          </motion.h1>
        </div>
      </section>

      <ProjectSlider />

      <SectionRevealer bg="off-white">
        <div className="work-more">
          <h2>More coming soon</h2>
          <p>We're always creating. Stay tuned.</p>
        </div>
      </SectionRevealer>
    </>
  );
};

export default Work;
