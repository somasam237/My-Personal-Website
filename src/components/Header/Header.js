import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCode, FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const logoVariants = {
    hover: { 
      scale: 1.1,
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`futuristic-navbar ${scrolled ? 'scrolled' : ''}`}
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container>
          <Navbar.Brand href="#home" className="brand-logo">
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="d-flex align-items-center"
            >
              <FaCode className="brand-icon" />
              <span className="brand-text">Samyra</span>
            </motion.div>
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            className="custom-toggler"
          >
            {expanded ? <FaTimes /> : <FaBars />}
          </Navbar.Toggle>
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {[
                { key: 'home', href: '#home' },
                { key: 'about', href: '#about' },
                { key: 'skills', href: '#skills' },
                { key: 'projects', href: '#projects' },
                { key: 'contact', href: '#contact' }
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Nav.Link 
                    href={item.href}
                    className="nav-item"
                    onClick={() => setExpanded(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </Nav.Link>
                </motion.div>
              ))}
              <LanguageSwitcher />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Header;
