import React from 'react';
import FullScreenVideo from '../components/FullScreenVideo';
import TaglineSection from '../components/TaglineSection';
import SectionRevealer from '../components/SectionRevealer';
import ProjectSlider from '../components/ProjectSlider';
import AccordionService from '../components/AccordionService';
import CTASection from '../components/CTASection';
import './Home.css';

const Home = () => {
  return (
    <>
      {/* 1. Full-screen AI video hero */}
      <FullScreenVideo
        videoSrc="/video/video.MP4"
        title="Kelzor"
        quote="AI ads, reimagined"
      />

      {/* 2. Blue overlap section with interactive SVG animations */}
      <TaglineSection />

      {/* 3. Latest project slider */}
      <ProjectSlider />

      {/* 4. Services accordion — white bg */}
      <SectionRevealer bg="white">
        <div className="services-home">
          <p className="services-home__label">What We Do</p>
          <h2 className="services-home__heading">
            Creative, technical, and AI services that actually connect
          </h2>
          <AccordionService />
        </div>
      </SectionRevealer>

      {/* 5. CTA — blue bg */}
      <CTASection
        tagline="Clear steps, faster loops, better outcomes"
        buttonText="Connect with us"
        link="/contact"
      />
    </>
  );
};

export default Home;
