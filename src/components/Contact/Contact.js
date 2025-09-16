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
import './Contact.css';

const Contact = () => {
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
      title: "Email",
      value: "audreytafawoung@gmail.com",
      link: "mailto:audreytafawoung@gmail.com"
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      value: "+4915560704874",
      link: "tel:+4915560704874"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
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
                  Get In <span className="futuristic-text">Touch</span>
                </h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">
                  Ready to start your next project? Let's work together to create something amazing!
                </p>
              </motion.div>
            </Col>
          </Row>

          <Row>
            {/* Contact Information */}
            <Col lg={5} className="mb-5">
              <motion.div variants={itemVariants} className="contact-info">
                <h3 className="info-title">Let's Connect</h3>
                <p className="info-description">
                  I'm always excited to discuss new opportunities, creative projects, 
                  or just have a chat about technology and development.
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
                  <h4 className="social-title">Follow Me</h4>
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
                <h3 className="form-title">Send Me a Message</h3>
                
                {showAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Alert variant="success" className="custom-alert">
                      <FaPaperPlane className="me-2" />
                      Message sent successfully! I'll get back to you soon.
                    </Alert>
                  </motion.div>
                )}

                <Form onSubmit={handleSubmit} className="contact-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="form-label">
                          <FaUser className="me-2" />
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="futuristic-input"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="form-label">
                          <FaEnvelope className="me-2" />
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className="futuristic-input"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">
                      <FaEdit className="me-2" />
                      Subject
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="futuristic-input"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">
                      <FaEdit className="me-2" />
                      Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or just say hello!"
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Send Message
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
                  Built with ❤️ using React.js, Bootstrap, and lots of creativity
                </p>
                <p className="copyright">
                  © 2025 Samyra. All rights reserved.
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
