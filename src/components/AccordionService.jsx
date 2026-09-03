import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AccordionService.css';

const services = [
  {
    id: 1,
    title: 'Service 1',
    subtitle: 'AI-Powered Cinema',
    description: 'From concept to final cut — powered by AI.',
  },
  {
    id: 2,
    title: 'Service 2',
    subtitle: 'Web Developement',
    description: 'Smooth, scroll-stopping motion for every platform.',
  },
  {
    id: 3,
    title: 'Service 3',
    subtitle: 'Creative Strategy',
    description: 'Data-informed creative that actually converts.',
  },
  // {
  //   id: 4,
  //   title: 'Service 4',
  //   subtitle: 'Post-Production & VFX',
  //   description: 'Polish and finesse without the studio overhead.',
  // },
];

const AccordionService = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="accordion">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          className={`accordion__item ${openId === service.id ? 'accordion__item--open' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.6,
            delay: index * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <button
            className="accordion__trigger"
            onClick={() => toggle(service.id)}
            aria-expanded={openId === service.id}
          >
            <span className="accordion__number">
              {String(service.id).padStart(2, '0')}
            </span>
            <span className="accordion__title">{service.subtitle}</span>
            <span className="accordion__icon">
              {openId === service.id ? '−' : '+'}
            </span>
          </button>

          <AnimatePresence>
            {openId === service.id && (
              <motion.div
                className="accordion__content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p>{service.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default AccordionService;
