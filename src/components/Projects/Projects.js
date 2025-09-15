import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      category: "fullstack",
      github: "https://github.com",
      live: "https://example.com",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates using Socket.io. Built with React and Express.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Socket.io", "Node.js", "PostgreSQL"],
      category: "fullstack",
      github: "https://github.com",
      live: "https://example.com",
      featured: false
    },
    {
      id: 3,
      title: "Portfolio Dashboard",
      description: "Modern portfolio dashboard with data visualization and analytics. Built with React and Chart.js.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Chart.js", "Bootstrap", "CSS3"],
      category: "frontend",
      github: "https://github.com",
      live: "https://example.com",
      featured: true
    },
    {
      id: 4,
      title: "REST API Service",
      description: "Scalable REST API with authentication, rate limiting, and comprehensive documentation. Built with Express and MongoDB.",
      image: "/api/placeholder/400/250",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      category: "backend",
      github: "https://github.com",
      live: null,
      featured: false
    },
    {
      id: 5,
      title: "Weather App",
      description: "Beautiful weather application with location-based forecasts and interactive maps. Responsive design for all devices.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Weather API", "CSS3", "Geolocation"],
      category: "frontend",
      github: "https://github.com",
      live: "https://example.com",
      featured: false
    },
    {
      id: 6,
      title: "Chat Application",
      description: "Real-time chat application with private messaging, group chats, and file sharing. Built with Socket.io and React.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Socket.io", "Node.js", "Express"],
      category: "fullstack",
      github: "https://github.com",
      live: "https://example.com",
      featured: true
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="projects" className="projects-section section-padding">
      <Container>
        <Row>
          <Col lg={12} className="text-center mb-5">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">
                My <span className="futuristic-text">Projects</span>
              </h2>
              <div className="title-underline"></div>
              <p className="section-subtitle">
                Explore my latest work and creative solutions
              </p>
            </motion.div>
          </Col>
        </Row>

        {/* Filter Buttons */}
        <Row className="mb-5">
          <Col lg={12}>
            <motion.div 
              className="filter-container"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.key}
                  className={`filter-btn ${filter === category.key ? 'active' : ''}`}
                  onClick={() => setFilter(category.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </motion.div>
          </Col>
        </Row>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Row>
              {filteredProjects.map((project) => (
                <Col lg={4} md={6} key={project.id} className="mb-4">
                  <motion.div
                    variants={projectVariants}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                  >
                    <Card className="project-card glass-effect h-100">
                      <div className="project-image-container">
                        <div className="project-image-placeholder">
                          <FaCode className="placeholder-icon" />
                        </div>
                        {project.featured && (
                          <Badge className="featured-badge">Featured</Badge>
                        )}
                        <div className={`project-overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                          <div className="overlay-content">
                            <Button 
                              variant="outline-light" 
                              size="sm" 
                              className="overlay-btn me-2"
                              href={project.github}
                              target="_blank"
                            >
                              <FaGithub />
                            </Button>
                            {project.live && (
                              <Button 
                                variant="outline-light" 
                                size="sm" 
                                className="overlay-btn"
                                href={project.live}
                                target="_blank"
                              >
                                <FaExternalLinkAlt />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Card.Body className="project-content">
                        <Card.Title className="project-title">
                          {project.title}
                        </Card.Title>
                        <Card.Text className="project-description">
                          {project.description}
                        </Card.Text>
                        
                        <div className="project-technologies">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="tech-badge">
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="project-actions">
                          <Button 
                            className="action-btn me-2"
                            href={project.github}
                            target="_blank"
                          >
                            <FaGithub className="me-1" />
                            Code
                          </Button>
                          {project.live && (
                            <Button 
                              variant="outline-primary"
                              className="action-btn-outline"
                              href={project.live}
                              target="_blank"
                            >
                              <FaEye className="me-1" />
                              Live
                            </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <Row className="mt-5">
          <Col lg={12} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="projects-cta glass-effect"
            >
              <h3 className="cta-title">Interested in working together?</h3>
              <p className="cta-text">
                I'm always open to discussing new opportunities and exciting projects.
              </p>
              <Button 
                className="futuristic-btn"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Projects;