import React from 'react';
import { motion } from 'framer-motion';
import SectionRevealer from '../components/SectionRevealer';
import AccordionService from '../components/AccordionService';
import CTASection from '../components/CTASection';
import './Services.css';

const Services = () => {
  return (
    <>
      <section className="services-hero">
        <div className="container">
          <motion.p
            className="services-hero__label"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Services
          </motion.p>
          <motion.h1
            className="services-hero__title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Creative, technical, and AI services that actually connect
          </motion.h1>
        </div>
      </section>

      <SectionRevealer bg="white">
        <AccordionService />
      </SectionRevealer>

      <CTASection
        tagline="Ready to create something remarkable?"
        buttonText="Contact us"
        link="/contact"
      />
    </>
  );
};

export default Services;
