import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye, FaPlay, FaStar, FaCalendar, FaUsers, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Projects.css';

// Images du dossier projectImages (chemins corrects depuis public)
const ecommerceImg = '/images/projectImages/ecommerce.png';
const airtrackImg = '/images/projectImages/airtrack.png';
const spotifyImg = '/images/projectImages/spotify.png';
const daweImg = '/images/projectImages/dawe.png';

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      subtitle: "Full-Stack Enterprise Solution",
      description: "A comprehensive e-commerce platform built with modern technologies, featuring advanced user authentication, secure payment processing, real-time inventory management, and a powerful admin dashboard.",
      image: ecommerceImg,
      technologies: ["React.js", "Node.js", "MongoDB", "Express", "Stripe", "JWT", "Socket.io"],
      category: "fullstack",
      github: "https://github.com/somasam237/e-commerce-Website.git",
      live: "https://example.com",
      featured: true,
      year: "2024",
      duration: "3 months",
      team: "Solo Project",
      highlights: [
        "🚀 Real-time inventory updates",
        "💳 Secure payment integration",
        "📊 Advanced analytics dashboard",
        "🔐 Multi-role authentication"
      ],
      challenges: "Implemented complex state management and real-time features",
      results: "Increased user engagement by 40% and reduced cart abandonment by 25%"
    },
    {
      id: 2,
      title: "AirTrack Management System",
      subtitle: "Real-Time Flight Tracking Solution",
      description: "An advanced flight tracking system utilizing OpenSky Network API for live flight data. Features include real-time monitoring, route optimization, and comprehensive flight analytics with PostgreSQL database integration.",
      image: airtrackImg,
      technologies: ["Python", "Flask", "PostgreSQL", "OpenSky API", "Pandas", "Chart.js"],
      category: "fullstack",
      github: "https://github.com/somasam237/airtrack_new.git",
      live: "https://example.com",
      featured: true,
      year: "2024",
      duration: "2 months",
      team: "Solo Project",
      highlights: [
        "✈️ Live flight data integration",
        "📍 Real-time tracking",
        "📈 Advanced analytics",
        "🗄️ Optimized database queries"
      ],
      challenges: "Handling large datasets and API rate limiting",
      results: "Processing 10,000+ flight records with 99.9% accuracy"
    },
    {
      id: 3,
      title: "Spotify Clone",
      subtitle: "Music Streaming Application",
      description: "A feature-rich Spotify clone built with React and Spotify Web API. Includes music streaming, playlist management, search functionality, and responsive design for all devices.",
      image: spotifyImg,
      technologies: ["React.js", "Spotify API", "CSS3", "JavaScript", "Context API"],
      category: "frontend",
      github: "https://github.com/somasam237/spotify-clone.git",
      live: "https://example.com",
      featured: false,
      year: "2024",
      duration: "1 month",
      team: "Solo Project",
      highlights: [
        "🎵 Music streaming integration",
        "🎨 Pixel-perfect UI recreation",
        "📱 Fully responsive design",
        "🔍 Advanced search functionality"
      ],
      challenges: "API authentication and state management",
      results: "Achieved 98% UI similarity to original Spotify"
    },
    {
      id: 4,
      title: "Protein Datawarehouse",
      subtitle: "Bioinformatics Data Management",
      description: "A modern, interactive data warehouse for protein structure data with a user-friendly web interface. Features authentication, comprehensive documentation, and advanced querying capabilities.",
      image: daweImg,
      technologies: ["React.js", "Node.js", "Express", "PostgreSQL", "JWT", "D3.js"],
      category: "fullstack",
      github: "https://github.com/somasam237/DatawarehouseSS2025.git",
      live: null,
      featured: true,
      year: "2024",
      duration: "4 months",
      team: "Academic Project",
      highlights: [
        "🧬 Complex data visualization",
        "🔬 Scientific data processing",
        "📊 Interactive charts",
        "🔒 Secure data access"
      ],
      challenges: "Managing complex biological data relationships",
      results: "Reduced data query time by 60% with optimized indexing"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects', icon: '🚀' },
    { key: 'fullstack', label: 'Full Stack', icon: '💻' },
    { key: 'frontend', label: 'Frontend', icon: '🎨' },
    { key: 'backend', label: 'Backend', icon: '⚙️' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotateY: 5,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="projects-section section-padding" ref={ref}>
      <Container>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="projects-header text-center mb-5"
        >
          <h2 className="section-title">
            Featured <span className="futuristic-text">Projects</span>
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Showcasing my expertise in modern web development through innovative solutions
          </p>
          <div className="expertise-badges">
            <motion.span 
              className="expertise-badge"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 20, 147, 0.4)" }}
            >
              Full-Stack Developer
            </motion.span>
            <motion.span 
              className="expertise-badge"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 20, 147, 0.4)" }}
            >
              3+ Years Experience
            </motion.span>
            <motion.span 
              className="expertise-badge"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 20, 147, 0.4)" }}
            >
              10+ Technologies
            </motion.span>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="filter-container mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              className={`filter-btn ${filter === category.key ? 'active' : ''}`}
              onClick={() => setFilter(category.key)}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(255, 20, 147, 0.4)",
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Row>
              {filteredProjects.map((project, index) => (
                <Col lg={6} xl={4} key={project.id} className="mb-5">
                  <motion.div
                    variants={projectVariants}
                    whileHover={{ 
                      y: -15,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    className="project-card-container"
                  >
                    <Card className="project-card glass-effect h-100">
                      {/* Project Image */}
                      <div className="project-image-wrapper">
                        <motion.div
                          className="project-image-container"
                          variants={imageVariants}
                          whileHover="hover"
                        >
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="project-image"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="image-fallback" style={{display: 'none'}}>
                            <FaCode className="fallback-icon" />
                            <span>Project Preview</span>
                          </div>
                        </motion.div>
                        
                        {project.featured && (
                          <motion.div
                            className="featured-badge"
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                          >
                            <FaStar />
                            Featured
                          </motion.div>
                        )}

                        <motion.div 
                          className={`project-overlay ${hoveredProject === project.id ? 'active' : ''}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="overlay-content">
                            <motion.button
                              className="overlay-btn primary"
                              onClick={() => openModal(project)}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaEye />
                              View Details
                            </motion.button>
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="overlay-btn secondary"
                              whileHover={{ scale: 1.1, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaGithub />
                              Code
                            </motion.a>
                          </div>
                        </motion.div>
                      </div>

                      {/* Project Content */}
                      <Card.Body className="project-content">
                        <div className="project-meta">
                          <span className="project-year">
                            <FaCalendar /> {project.year}
                          </span>
                          <span className="project-category">{project.category}</span>
                        </div>

                        <Card.Title className="project-title">
                          {project.title}
                        </Card.Title>
                        
                        <Card.Subtitle className="project-subtitle mb-3">
                          {project.subtitle}
                        </Card.Subtitle>

                        <Card.Text className="project-description">
                          {project.description.substring(0, 120)}...
                        </Card.Text>

                        {/* Technologies */}
                        <div className="project-technologies">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className="tech-badge"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                delay: index * 0.1 + techIndex * 0.05 + 0.7,
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="tech-badge more">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="project-actions">
                          <motion.button
                            className="action-btn primary"
                            onClick={() => openModal(project)}
                            whileHover={{ scale: 1.05, boxShadow: "0 5px 20px rgba(255, 20, 147, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaPlay />
                            View Project
                          </motion.button>
                          
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn secondary"
                            whileHover={{ scale: 1.05, boxShadow: "0 5px 20px rgba(255, 20, 147, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaCode />
                            Source Code
                          </motion.a>
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
        <motion.div
          className="projects-cta text-center mt-5"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="cta-title">Ready to Work Together?</h3>
          <p className="cta-description">
            Let's discuss your next project and bring your ideas to life with cutting-edge technology.
          </p>
          <motion.button
            className="cta-button futuristic-btn"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 40px rgba(255, 20, 147, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUsers />
            Let's Collaborate
          </motion.button>
        </motion.div>
      </Container>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <Modal 
            show={showModal} 
            onHide={closeModal}
            size="xl"
            centered
            className="project-modal"
            backdrop="static"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateX: 15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Modal.Header className="modal-header-custom">
                <div className="modal-title-section">
                  <Modal.Title>{selectedProject.title}</Modal.Title>
                  <p className="modal-subtitle">{selectedProject.subtitle}</p>
                </div>
                <motion.button 
                  className="close-btn"
                  onClick={closeModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </Modal.Header>
              
              <Modal.Body className="modal-body-custom">
                <Row>
                  <Col lg={6}>
                    <div className="modal-image-container">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="modal-image"
                      />
                    </div>
                  </Col>
                  
                  <Col lg={6}>
                    <div className="modal-content">
                      <div className="project-details">
                        <div className="detail-item">
                          <FaCalendar className="detail-icon" />
                          <div>
                            <strong>Year:</strong> {selectedProject.year}
                          </div>
                        </div>
                        <div className="detail-item">
                          <FaUsers className="detail-icon" />
                          <div>
                            <strong>Team:</strong> {selectedProject.team}
                          </div>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">⏱️</span>
                          <div>
                            <strong>Duration:</strong> {selectedProject.duration}
                          </div>
                        </div>
                      </div>

                      <div className="project-description-full">
                        <h5>Project Overview</h5>
                        <p>{selectedProject.description}</p>
                      </div>

                      <div className="project-highlights">
                        <h5>Key Features</h5>
                        <ul>
                          {selectedProject.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="project-tech-stack">
                        <h5>Technology Stack</h5>
                        <div className="tech-list">
                          {selectedProject.technologies.map((tech, index) => (
                            <span key={index} className="tech-item">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="project-results">
                        <h5>Results & Impact</h5>
                        <p>{selectedProject.results}</p>
                      </div>

                      <div className="modal-actions">
                        <motion.a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="modal-btn primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub />
                          View Source Code
                        </motion.a>
                        
                        {selectedProject.live && (
                          <motion.a
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="modal-btn secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaExternalLinkAlt />
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;