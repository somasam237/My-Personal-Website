import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye, FaPlay, FaStar, FaCalendar, FaUsers, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Projects.css';

// Images du dossier projectImages (chemins corrects depuis public)
const ecommerceImg = '/images/projectImages/ecommerce.png';
const airtrackImg = '/images/projectImages/airtrack.png';
const spotifyImg = '/images/projectImages/spotify.png';
const daweImg = '/images/projectImages/dawe.png';

// Images additionnelles pour les galeries (placeholders pour maintenant)
const createProjectGallery = (mainImage, projectName) => [
  mainImage,
  `/images/projectImages/${projectName}1.png`,
  `/images/projectImages/${projectName}2.png`,
  `/images/projectImages/${projectName}3.png`,
  `/images/projectImages/${projectName}4.png`,
  `/images/projectImages/${projectName}5.png`
];

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      id: 1,
      titleKey: "projects.ecommerce.title",
      subtitleKey: "projects.ecommerce.subtitle",
      descriptionKey: "projects.ecommerce.description",
      image: ecommerceImg,
      gallery: createProjectGallery(ecommerceImg, 'ecommerce'),
      technologies: ["Html","Css","JavaScript", "Node.js", "MongoDB", "Express", "JWT"],
      category: "fullstack",
      github: "https://github.com/somasam237/e-commerce-Website.git",
      live: "https://example.com",
      featured: true,
      year: "2024",
      durationKey: "projects.ecommerce.duration",
      teamKey: "projects.ecommerce.team",
      highlightsKey: "projects.ecommerce.highlights",
      challengesKey: "projects.ecommerce.challenges",
      resultsKey: "projects.ecommerce.results"
    },
    {
      id: 2,
      titleKey: "projects.airtrack.title",
      subtitleKey: "projects.airtrack.subtitle",
      descriptionKey: "projects.airtrack.description",
      image: airtrackImg,
      gallery: createProjectGallery(airtrackImg, 'airtrack'),
      technologies: ["Python", "Flask", "PostgreSQL", "OpenSky API", "Chart.js"],
      category: "fullstack",
      github: "https://github.com/somasam237/airtrack_new.git",
      live: "https://example.com",
      featured: true,
      year: "2025",
      durationKey: "projects.airtrack.duration",
      teamKey: "projects.airtrack.team",
      highlightsKey: "projects.airtrack.highlights",
      challengesKey: "projects.airtrack.challenges",
      resultsKey: "projects.airtrack.results"
    },
    {
      id: 3,
      titleKey: "projects.spotify.title",
      subtitleKey: "projects.spotify.subtitle",
      descriptionKey: "projects.spotify.description",
      image: spotifyImg,
      gallery: createProjectGallery(spotifyImg, 'spotify'),
      technologies: ["React.js", "Spotify API", "CSS3", "JavaScript", "Context API"],
      category: "frontend",
      github: "https://github.com/somasam237/spotify-clone.git",
      live: "https://example.com",
      featured: false,
      year: "2024",
      durationKey: "projects.spotify.duration",
      teamKey: "projects.spotify.team",
      highlightsKey: "projects.spotify.highlights",
      challengesKey: "projects.spotify.challenges",
      resultsKey: "projects.spotify.results"
    },
    {
      id: 4,
      titleKey: "projects.datawarehouse.title",
      subtitleKey: "projects.datawarehouse.subtitle",
      descriptionKey: "projects.datawarehouse.description",
      image: daweImg,
      gallery: createProjectGallery(daweImg, 'dawe'),
      technologies: ["React.js", "Node.js", "Express", "PostgreSQL", "JWT", "D3.js"],
      category: "fullstack",
      github: "https://github.com/somasam237/DatawarehouseSS2025.git",
      live: null,
      featured: true,
      year: "2025",
      durationKey: "projects.datawarehouse.duration",
      teamKey: "projects.datawarehouse.team",
      highlightsKey: "projects.datawarehouse.highlights",
      challengesKey: "projects.datawarehouse.challenges",
      resultsKey: "projects.datawarehouse.results"
    }
  ];

  const categories = [
    { key: 'all', labelKey: 'projects.categories.all', icon: '🚀' },
    { key: 'fullstack', labelKey: 'projects.categories.fullstack', icon: '💻' },
    { key: 'frontend', labelKey: 'projects.categories.frontend', icon: '🎨' },
    { key: 'backend', labelKey: 'projects.categories.backend', icon: '⚙️' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
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
            {t('projects.title')} <span className="futuristic-text">{t('projects.titleHighlight')}</span>
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            {t('projects.subtitle')}
          </p>
          <div className="expertise-badges">
            <motion.span 
              className="expertise-badge"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 20, 147, 0.4)" }}
            >
              {t('projects.badges.developer')}
            </motion.span>
            <motion.span 
              className="expertise-badge"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 20, 147, 0.4)" }}
            >
              {t('projects.badges.experience')}
            </motion.span>
            <motion.span 
              className="expertise-badge"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 20, 147, 0.4)" }}
            >
              {t('projects.badges.technologies')}
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
              {t(category.labelKey)}
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
                          {t(project.titleKey)}
                        </Card.Title>
                        
                        <Card.Subtitle className="project-subtitle mb-3">
                          {t(project.subtitleKey)}
                        </Card.Subtitle>

                        <Card.Text className="project-description">
                          {t(project.descriptionKey).substring(0, 120)}...
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
                            {t('projects.buttons.viewProject')}
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
                            {t('projects.buttons.sourceCode')}
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
          <h3 className="cta-title">{t('projects.cta.title')}</h3>
          <p className="cta-description">
            {t('projects.cta.description')}
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
            {t('projects.cta.button')}
          </motion.button>
        </motion.div>
      </Container>

      {/* Project Detail Modal with Gallery */}
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
                  <Modal.Title>{t(selectedProject.titleKey)}</Modal.Title>
                  <p className="modal-subtitle">{t(selectedProject.subtitleKey)}</p>
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
                  <Col lg={7}>
                    {/* Image Gallery */}
                    <div className="modal-gallery">
                      <div className="main-image-container">
                        <motion.img 
                          key={currentImageIndex}
                          src={selectedProject.gallery[currentImageIndex]} 
                          alt={`${t(selectedProject.titleKey)} - Image ${currentImageIndex + 1}`}
                          className="main-modal-image"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          onError={(e) => {
                            e.target.src = selectedProject.image;
                          }}
                        />
                        
                        {/* Navigation Arrows */}
                        <motion.button 
                          className="gallery-nav prev"
                          onClick={prevImage}
                          whileHover={{ scale: 1.1, x: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaChevronLeft />
                        </motion.button>
                        
                        <motion.button 
                          className="gallery-nav next"
                          onClick={nextImage}
                          whileHover={{ scale: 1.1, x: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaChevronRight />
                        </motion.button>
                        
                        {/* Image Counter */}
                        <div className="image-counter">
                          {currentImageIndex + 1} / {selectedProject.gallery.length}
                        </div>
                      </div>
                      
                      {/* Thumbnail Gallery */}
                      <div className="thumbnail-gallery">
                        {selectedProject.gallery.map((image, index) => (
                          <motion.div
                            key={index}
                            className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={() => selectImage(index)}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img 
                              src={image} 
                              alt={`Thumbnail ${index + 1}`}
                              onError={(e) => {
                                e.target.src = selectedProject.image;
                              }}
                            />
                            <div className="thumbnail-overlay"></div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Col>
                  
                  <Col lg={5}>
                    <div className="modal-content">
                      <div className="project-details">
                        <div className="detail-item">
                          <FaCalendar className="detail-icon" />
                          <div>
                            <strong>{t('projects.modal.year')}:</strong> {selectedProject.year}
                          </div>
                        </div>
                        <div className="detail-item">
                          <FaUsers className="detail-icon" />
                          <div>
                            <strong>{t('projects.modal.team')}:</strong> {t(selectedProject.teamKey)}
                          </div>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">⏱️</span>
                          <div>
                            <strong>{t('projects.modal.duration')}:</strong> {t(selectedProject.durationKey)}
                          </div>
                        </div>
                      </div>

                      <div className="project-description-full">
                        <h5>{t('projects.modal.overview')}</h5>
                        <p>{t(selectedProject.descriptionKey)}</p>
                      </div>

                      <div className="project-highlights">
                        <h5>{t('projects.modal.keyFeatures')}</h5>
                        <ul>
                          {t(selectedProject.highlightsKey, { returnObjects: true }).map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="project-tech-stack">
                        <h5>{t('projects.modal.techStack')}</h5>
                        <div className="tech-list">
                          {selectedProject.technologies.map((tech, index) => (
                            <span key={index} className="tech-item">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="project-results">
                        <h5>{t('projects.modal.results')}</h5>
                        <p>{t(selectedProject.resultsKey)}</p>
                      </div>

                      <div className="project-challenges">
                        <h5>{t('projects.modal.challenges')}</h5>
                        <p>{t(selectedProject.challengesKey)}</p>
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
                          {t('projects.modal.viewCode')}
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
                            {t('projects.modal.liveDemo')}
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