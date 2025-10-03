import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaLightbulb, FaUsers } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './About.css'; 

const About = () => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  const values = [
    {
      icon: <FaCode />,
      title: t('about.values.cleanCode.title'),
      description: t('about.values.cleanCode.description')
    },
    {
      icon: <FaRocket />,
      title: t('about.values.performance.title'),
      description: t('about.values.performance.description')
    },
    {
      icon: <FaLightbulb />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: <FaUsers />,
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description')
    }
  ];

  return (
    <section id="about" className="about-section section-padding">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Row>
            <Col lg={12} className="text-center mb-5">
              <motion.div variants={itemVariants}>
                <h2 className="section-title">
                  {t('about.title')} <span className="futuristic-text">{t('about.me')}</span>
                </h2>
                <div className="title-underline"></div>
              </motion.div>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col lg={6} className="mb-4">
              <motion.div variants={itemVariants} className="about-content">
                <h3 className="about-subtitle">{t('about.subtitle')}</h3>
                <p className="about-text">
                  {t('about.description1')}
                </p>
                <p className="about-text">
                  {t('about.description2')}
                </p>
                <div className="about-stats">
                  <div className="stat-item">
                    <span className="stat-number">3+</span>
                    <span className="stat-label">{t('about.stats.experience')}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">10+</span>
                    <span className="stat-label">{t('about.stats.projects')}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">70%</span>
                    <span className="stat-label">{t('about.stats.satisfaction')}</span>
                  </div>
                </div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div variants={itemVariants} className="about-visual">
                <div className="code-editor">
                  <div className="editor-header">
                    <div className="editor-controls">
                      <span className="control close"></span>
                      <span className="control minimize"></span>
                      <span className="control maximize"></span>
                    </div>
                    <span className="file-name">developer.js</span>
                  </div>
                  <div className="editor-content">
                    <div className="code-line">
                      <span className="keyword">const</span> 
                      <span className="variable"> developer</span> 
                      <span className="operator"> = </span>
                      <span className="bracket">{'{'}</span>
                    </div>
                    <div className="code-line indent">
                      <span className="property">name</span>
                      <span className="operator">: </span>
                      <span className="string">"Samyra Tafawoung"</span>
                      <span className="operator">,</span>
                    </div>
                    <div className="code-line indent">
                      <span className="property">role</span>
                      <span className="operator">: </span>
                      <span className="string">"Student and Full Stack Developer"</span>
                      <span className="operator">,</span>
                    </div>
                    <div className="code-line indent">
                      <span className="property">skills</span>
                      <span className="operator">: </span>
                      <span className="bracket">[</span>
                      <span className="string">"React"</span>
                      <span className="operator">, </span>
                      <span className="string">"Node.js"</span> 
                      <span className="bracket">]</span>
                      <span className="operator">,</span>
                    </div>
                    <div className="code-line indent">
                      <span className="property">passion</span>
                      <span className="operator">: </span>
                      <span className="string">"Building my future"</span>
                    </div>
                    <div className="code-line">
                      <span className="bracket">{'}'}</span>
                      <span className="operator">;</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={12}>
              <motion.h3 
                variants={itemVariants}
                className="values-title text-center mb-4"
              >
                {t('about.values.title')}
              </motion.h3>
            </Col>
            {values.map((value, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="value-card glass-effect hover-glow"
                >
                  <div className="value-icon">
                    {value.icon}
                  </div>
                  <h4 className="value-title">{value.title}</h4>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default About;
