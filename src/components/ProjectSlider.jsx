import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ProjectSlider.css';

const projects = [

  {
    id: '01',
    title: 'Epsinity',
    url: 'https://epsinity.com',
    displayUrl: 'epsinity.com',
    category: 'CFD & CAE Simulation',
    description: 'Advanced computational fluid dynamics and engineering simulations.',
    tag: 'ENGINEERING & AI',
    accentColor: 'linear-gradient(135deg, #0f2744 0%, #081628 100%)'
  },
  {
    id: '02',
    title: 'Honesta',
    url: 'https://honesta.in',
    displayUrl: 'honesta.in',
    category: 'Shampoo Ecommerce',
    description: 'Time-tested, plant-forward ingredients — hand-picked and blended with care.',
    tag: 'E-COMMERCE',
    accentColor: 'linear-gradient(135deg, #1c3d2f 0%, #0d2218 100%)'
  },
  {
    id: '03',
    title: 'Roamigo',
    url: 'https://roamigo.in',
    displayUrl: 'roamigo.in',
    category: 'Villa Marketplace',
    description: 'A curated villa marketplace connecting discerning travelers with luxury stays.',
    tag: 'MARKETPLACE',
    accentColor: 'linear-gradient(135deg, #3d2216 0%, #1e100a 100%)'
  }
];

const ProjectSlider = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-15%']);

  return (
    <section className="projects" ref={containerRef}>
      <div className="projects__header container">
        <div className="projects__header-badge">
          <span className="projects__pulse-dot" />
          <span>FEATURED PRODUCTIONS</span>
        </div>
        <h2>Our Best Works</h2>
      </div>

      <motion.div className="projects__track" style={{ x }}>
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.7,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
            >
              <div className="project-card__image-wrap">
                <div
                  className="project-card__bg-gradient"
                  style={{ background: project.accentColor }}
                />

                {/* Number Watermark */}
                <span className="project-card__number">{project.id}</span>

                {/* External Link Pill */}
                <div className="project-card__url-badge">
                  <span>{project.displayUrl}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>

                <div className="project-card__tag">{project.tag}</div>
              </div>

              <div className="project-card__info">
                <div className="project-card__header-row">
                  <h3 className="project-card__title">{project.title}</h3>
                  <span className="project-card__category">{project.category}</span>
                </div>
                <p className="project-card__desc">{project.description}</p>
              </div>
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectSlider;
