import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AccordionService.css';

const services = [
  {
    id: 1,
    title: 'AI Commercials',
    description: 'Cinematic advertisements created for brands, products and campaigns.',
  },
  {
    id: 2,
    title: 'AI Brand Films',
    description: 'Stories that build emotion, identity and recall around your brand.',
  },
  {
    id: 3,
    title: 'AI Product Films',
    description: 'Put your product in worlds, situations and visual environments that traditional production makes difficult or expensive.',
  },
  {
    id: 4,
    title: 'AI Social Ads',
    description: 'Short-form commercials designed to stop the scroll and communicate fast.',
  },
  {
    id: 5,
    title: 'AI Visual Worlds',
    description: 'From another planet to a world that exists only in your imagination — we build visual concepts without traditional production limitations.',
  },
];

const AccordionService = () => {
  const [openId, setOpenId] = useState(1);

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
            <span className="accordion__title">{service.title}</span>
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
