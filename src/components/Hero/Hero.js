import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const socialVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        delay: 1.2,
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <Container className="hero-container">
        <Row className="align-items-center min-vh-100">
          <Col lg={8} className="hero-content">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="hero-greeting">
                <span className="greeting-text">{t('hero.greeting')}</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="hero-name">
                <span className="futuristic-text">{t('hero.name')}</span>
              </motion.h1>
              
              <motion.div variants={itemVariants} className="hero-title">
                <h2>{t('hero.title')}</h2>
                <div className="typing-effect">
                  <span className="typing-text">{t('hero.subtitle')}</span>
                </div>
              </motion.div>
              
              <motion.p variants={itemVariants} className="hero-description">
                {t('hero.description')}
              </motion.p>
              
              <motion.div variants={itemVariants} className="hero-buttons">
                <Button 
                  className="futuristic-btn me-3 mb-3"
                  onClick={() => scrollToSection('projects')}
                >
                  {t('hero.viewWork')}
                </Button>
                <Button 
                  variant="outline-primary" 
                  className="outline-btn mb-3"
                  onClick={() => scrollToSection('contact')}
                >
                  {t('hero.getInTouch')}
                </Button>
              </motion.div>
              
              <motion.div variants={socialVariants} className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaLinkedin />
                </a>
                <a href="mailto:your.email@example.com" className="social-link">
                  <FaEnvelope />
                </a>
              </motion.div>
            </motion.div>
          </Col>
          
          <Col lg={4} className="hero-visual">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="hero-avatar"
            >
              <div className="avatar-container">
                <div className="avatar-glow"></div>
                <div className="code-lines">
                  <div className="code-line"></div>
                  <div className="code-line"></div>
                  <div className="code-line"></div>
                  <div className="code-line"></div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="scroll-indicator"
          onClick={() => scrollToSection('about')}
        >
          <FaArrowDown className="scroll-arrow" />
          <span>{t('hero.scrollToExplore')}</span>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
