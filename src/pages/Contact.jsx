import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact">
      <div className="container">
        <div className="contact__inner">
          <div className="contact__info">
            <motion.p
              className="contact__label"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Get in Touch
            </motion.p>
            <motion.h1
              className="contact__title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's create something together
            </motion.h1>
            <motion.div
              className="contact__details"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="mailto:hello@kelzor.com" className="contact__email">hello@kelzor.com</a>
            </motion.div>
          </div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="contact__success">
                <h3>Thank you!</h3>
                <p>We'll get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="contact__field">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required autoComplete="name" />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required autoComplete="email" />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="4" required />
                </div>
                <button type="submit" className="contact__submit">
                  Send Message
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 10h10M12 7l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
