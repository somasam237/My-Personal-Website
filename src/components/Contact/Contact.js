import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter,
  FaPaperPlane,
  FaUser,
  FaEdit
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setShowAlert(true);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setShowAlert(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: t('contact.info.email'),
      value: "audreytafawoung@gmail.com",
      link: "mailto:audreytafawoung@gmail.com"
    },
    {
      icon: <FaPhone />,
      title: t('contact.info.phone'),
      value: "+4915560704874",
      link: "tel:+4915560704874"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: t('contact.info.location'),
      value: "Bingen, Germany",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/samyra-audrey-tafawoung-2183bb1b3/",
      color: "#0077B5"
    },
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com/somasam237",
      color: "#333"
    },
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="contact-section section-padding">
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
                  {t('contact.title')} <span className="futuristic-text">{t('contact.touch')}</span>
                </h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">
                  {t('contact.subtitle')}
                </p>
              </motion.div>
            </Col>
          </Row>

          <Row>
            {/* Contact Information */}
            <Col lg={5} className="mb-5">
              <motion.div variants={itemVariants} className="contact-info">
                <h3 className="info-title">{t('contact.info.title')}</h3>
                <p className="info-description">
                  {t('contact.info.description')}
                </p>

                <div className="contact-methods">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="contact-method glass-effect"
                    >
                      <div className="method-icon">
                        {info.icon}
                      </div>
                      <div className="method-content">
                        <h4 className="method-title">{info.title}</h4>
                        {info.link ? (
                          <a href={info.link} className="method-value">
                            {info.value}
                          </a>
                        ) : (
                          <span className="method-value">{info.value}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="social-section">
                  <h4 className="social-title">{t('contact.social.title')}</h4>
                  <div className="social-links">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 5,
                          backgroundColor: social.color
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Col>

            {/* Contact Form */}
            <Col lg={7}>
              <motion.div variants={itemVariants} className="contact-form-container glass-effect">
                <h3 className="form-title">{t('contact.form.title')}</h3>
                
                {showAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Alert variant="success" className="custom-alert">
                      <FaPaperPlane className="me-2" />
                      {t('contact.form.success')}
                    </Alert>
                  </motion.div>
                )}

                <Form onSubmit={handleSubmit} className="contact-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="form-label">
                          <FaUser className="me-2" />
                          {t('contact.form.name')}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.namePlaceholder')}
                          className="futuristic-input"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="form-label">
                          <FaEnvelope className="me-2" />
                          {t('contact.form.email')}
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('contact.form.emailPlaceholder')}
                          className="futuristic-input"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">
                      <FaEdit className="me-2" />
                      {t('contact.form.subject')}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.subjectPlaceholder')}
                      className="futuristic-input"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">
                      <FaEdit className="me-2" />
                      {t('contact.form.message')}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.messagePlaceholder')}
                      className="futuristic-input"
                      required
                    />
                  </Form.Group>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="submit-btn futuristic-btn w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="loading-spinner me-2"></div>
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          {t('contact.form.send')}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </Form>
              </motion.div>
            </Col>
          </Row>

          {/* Footer */}
          <Row className="mt-5">
            <Col lg={12}>
              <motion.div 
                variants={itemVariants}
                className="contact-footer text-center"
              >
                <p className="footer-text">
                  {t('contact.footer.built')}
                </p>
                <p className="copyright">
                  {t('contact.footer.copyright')}
                </p>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;
