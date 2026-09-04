import React from 'react';
import { motion } from 'framer-motion';
import SectionRevealer from '../components/SectionRevealer';
// import ProjectSlider from '../components/ProjectSlider';
import './Work.css';

/* 
======================================================
EXISTING IMPLEMENTATION (COMMENTED OUT FOR NOW)
======================================================

const ExistingWorkView = () => (
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
*/

// Sample Data for Work Page
const sampleProjects = [
  // {
  //   id: '01',
  //   title: 'Aura Neural Campaign',
  //   client: 'Aura Dynamics',
  //   category: 'AI Commercial & VFX',
  //   year: '2026',
  //   tag: 'AI ADS',
  //   description: 'Hyper-realistic neural-rendered video ad campaign targeting global audiences across multi-channel platforms.',
  //   accentColor: 'linear-gradient(135deg, #0f2744 0%, #081628 100%)',
  //   stats: '+240% CTR'
  // },
  // {
  //   id: '02',
  //   title: 'Nexus Kinetic Branding',
  //   client: 'Nexus Labs',
  //   category: '3D Motion Design',
  //   year: '2026',
  //   tag: 'MOTION',
  //   description: 'Dynamic brand reveal and 3D kinetic typographic spots tailored for high-impact social launches.',
  //   accentColor: 'linear-gradient(135deg, #1c3d2f 0%, #0d2218 100%)',
  //   stats: '1.2M+ Impressions'
  // },
  // {
  //   id: '03',
  //   title: 'Velocita Performance Spot',
  //   client: 'Velocita Motors',
  //   category: 'Cinematic AI Commercial',
  //   year: '2025',
  //   tag: 'AUTOMOTIVE',
  //   description: 'Full CGI and synthetic voiceover integration for futuristic electric vehicle commercial launch.',
  //   accentColor: 'linear-gradient(135deg, #3d2216 0%, #1e100a 100%)',
  //   stats: '4.8/5 Rating'
  // },
  // {
  //   id: '04',
  //   title: 'Epsinity CFD Simulation',
  //   client: 'Epsinity Tech',
  //   category: 'Engineering & Simulation Web',
  //   year: '2025',
  //   tag: 'CFD & AI',
  //   description: 'Interactive web platform showcase demonstrating high-performance fluid dynamics and AI processing.',
  //   accentColor: 'linear-gradient(135deg, #0f2744 0%, #17365d 100%)',
  //   stats: 'Enterprise'
  // },
  // {
  //   id: '05',
  //   title: 'Honesta Botanical Experience',
  //   client: 'Honesta Care',
  //   category: 'E-Commerce Showcase',
  //   year: '2025',
  //   tag: 'E-COMMERCE',
  //   description: 'Handcrafted luxury digital experience for plant-forward haircare and cosmetic brand.',
  //   accentColor: 'linear-gradient(135deg, #1f4233 0%, #0c1c14 100%)',
  //   stats: 'Custom UX'
  // },
  // {
  //   id: '06',
  //   title: 'Roamigo Villa Marketplace',
  //   client: 'Roamigo Stays',
  //   category: 'Marketplace Platform',
  //   year: '2025',
  //   tag: 'LUXURY TRAVEL',
  //   description: 'Curated luxury stay marketplace featuring immersive villa previews and seamless booking flows.',
  //   accentColor: 'linear-gradient(135deg, #422518 0%, #21120b 100%)',
  //   stats: 'Featured'
  // }
];

const Work = () => {
  return (
    <div className="work-page">
      <section className="work-hero">
        <div className="container">
          <motion.p
            className="work-hero__label"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Portfolio & Case Studies
          </motion.p>
          <motion.h1
            className="work-hero__title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Sample Works
          </motion.h1>
        </div>
      </section>

      {/* Sample Projects Grid */}
      <section className="work-grid-section">
        <div className="container">
          <div className="work-grid">
            {sampleProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="work-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="work-card__media"
                  style={{ background: project.accentColor }}
                >
                  <span className="work-card__number">{project.id}</span>
                  <span className="work-card__tag">{project.tag}</span>
                  <span className="work-card__stats">{project.stats}</span>
                </div>
                <div className="work-card__content">
                  <div className="work-card__header">
                    <span className="work-card__category">{project.category}</span>
                    <span className="work-card__year">{project.year}</span>
                  </div>
                  <h3 className="work-card__title">{project.title}</h3>
                  <p className="work-card__client">Client: {project.client}</p>
                  <p className="work-card__desc">{project.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SectionRevealer bg="off-white">
        <div className="work-more">
          <h2>More coming soon</h2>
          <p>We're always creating. Stay tuned.</p>
        </div>
      </SectionRevealer>
    </div>
  );
};

export default Work;

