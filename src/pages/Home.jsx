import React from 'react';
import FullScreenVideo from '../components/FullScreenVideo';
import TaglineSection from '../components/TaglineSection';
import ApproachSection from '../components/ApproachSection';
import SectionRevealer from '../components/SectionRevealer';
import ProjectSlider from '../components/ProjectSlider';
import AccordionService from '../components/AccordionService';
import CTASection from '../components/CTASection';
import { LiquidLens } from '../components/liquid-lens';
import './Home.css';

const Home = () => {
  return (
    <>
      {/* 1. Full-screen AI video hero */}
      <FullScreenVideo
        videoSrc="/videos/ai.mp4"
        title="Kelzor"
        quote="AI ads, reimagined"
      />

      {/* 2. Blue overlap section with interactive SVG animations */}
      <TaglineSection />

      {/* 3. Our Approach — Interactive 8-step workflow pipeline */}
      <ApproachSection />


      {/* 4. Latest project slider */}
      {/* <ProjectSlider /> */}

      {/* 5. Services accordion — white bg */}
      <SectionRevealer bg="white">
        <div className="services-home">
          <LiquidLens radius={65} strength={0.11} magnification={1.08}>
            <p className="services-home__label">What We Do</p>
          </LiquidLens>
          <LiquidLens radius={95} strength={0.14} magnification={1.12}>
            <h2 className="services-home__heading">
              Creative, technical, and AI services that actually connect
            </h2>
          </LiquidLens>
          <AccordionService />
        </div>
      </SectionRevealer>



      {/* 6. CTA — blue bg */}
      <CTASection
        tagline="Clear steps, faster loops, better outcomes"
        buttonText="Connect with us"
        link="/contact"
      />
    </>
  );
};

export default Home;
