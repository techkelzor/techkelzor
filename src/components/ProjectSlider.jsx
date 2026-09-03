import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ProjectSlider.css';

const projects = [
  { id: 1, title: 'Project 1', category: 'AI Ad Campaign' },
  { id: 2, title: 'Project 2', category: 'Brand Film' },
  { id: 3, title: 'Project 3', category: 'Motion Graphics' },
  { id: 4, title: 'Project 4', category: 'Product Launch' },
];

const ProjectSlider = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-25%']);

  return (
    <section className="projects" ref={containerRef}>
      <div className="projects__header container">
        <h2>Our Works</h2>
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
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="project-card__image">
              <div className="project-card__placeholder">
                <span>{project.id}</span>
              </div>
            </div>
            <div className="project-card__info">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__category">{project.category}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectSlider;
