import React from 'react';
import { motion } from 'framer-motion';
import SectionRevealer from '../components/SectionRevealer';
import AccordionService from '../components/AccordionService';
import CTASection from '../components/CTASection';
import { LiquidLens } from '../components/liquid-lens';
import './Services.css';

const Services = () => {
  return (
    <>
      <section className="services-hero">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <LiquidLens radius={65} strength={0.11} magnification={1.08}>
              <p className="services-hero__label">Services</p>
            </LiquidLens>
          </motion.div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <LiquidLens radius={95} strength={0.14} magnification={1.12}>
              <h1 className="services-hero__title">
                Creative, technical, and AI services that actually connect
              </h1>
            </LiquidLens>
          </motion.div>
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
