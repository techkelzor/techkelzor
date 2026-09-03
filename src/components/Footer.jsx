import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">Kelzor</Link>
            <p className="footer__tagline">AI ads, reimagined.</p>
          </div>

          <div className="footer__nav">
            <div className="footer__col">
              <h4 className="footer__col-title">Pages</h4>
              <Link to="/work" className="footer__link">Work</Link>
              <Link to="/services" className="footer__link">Services</Link>
              <Link to="/about" className="footer__link">About</Link>
              <Link to="/contact" className="footer__link">Contact</Link>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Connect</h4>
              <a href="mailto:hello@kelzor.com" className="footer__link">hello@kelzor.com</a>
              <a href="#" className="footer__link">LinkedIn</a>
              <a href="#" className="footer__link">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {currentYear} Kelzor. All rights reserved.</p>
          <p className="footer__currency">₹ INR</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
