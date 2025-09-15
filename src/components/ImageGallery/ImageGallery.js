import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './ImageGallery.css';

const ImageGallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Ajoutez vos images ici
  const images = [
    {
      id: 1,
      src: '/public/images/gallery/im1.jpg',
      alt: 'Project Screenshot 1',
      title: 'E-Commerce Dashboard'
    },
    {
      id: 2,
      src: '/public/images/gallery/im2.jpg',
      alt: 'Project Screenshot 2',
      title: 'Mobile App Design'
    },
    {
      id: 3,
      src: '/public/images/gallery/im3.jpg',
      alt: 'Project Screenshot 3',
      title: 'Web Application'
    },
    {
        id: 3,
        src: '/public/images/gallery/im4.jpg',
        alt: 'Project Screenshot 3',
        title: 'Web Application'
      },
      {
        id: 3,
        src: '.././public/images/gallery/im5.jpg',
        alt: 'Project Screenshot 3',
        title: 'Web Application'
      },
      {
        id: 3,
        src: '/public/images/gallery/im6.jpg',
        alt: 'Project Screenshot 3',
        title: 'Web Application'
      },
   
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <section className="image-gallery-section">
      <Container>
        <Row>
          <Col lg={12} className="text-center mb-5">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="gallery-title">
                My <span className="futuristic-text">Work</span>
              </h2>
              <div className="title-underline"></div>
              <p className="gallery-subtitle">
                A glimpse into my creative projects and achievements
              </p>
            </motion.div>
          </Col>
        </Row>

        <Row>
          {images.map((image, index) => (
            <Col lg={4} md={6} key={image.id} className="mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="gallery-item"
                onClick={() => openModal(image)}
              >
                <div className="image-container">
                  <img src={image.src} alt={image.alt} className="gallery-image" />
                  <div className="image-overlay">
                    <h4 className="image-title">{image.title}</h4>
                    <p className="image-action">Click to view</p>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal pour affichage en grand */}
      <AnimatePresence>
        {showModal && (
          <Modal 
            show={showModal} 
            onHide={closeModal} 
            centered 
            size="lg"
            className="gallery-modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header className="modal-header-custom">
                <Modal.Title>{selectedImage?.title}</Modal.Title>
                <button className="close-btn" onClick={closeModal}>
                  <FaTimes />
                </button>
              </Modal.Header>
              <Modal.Body className="modal-body-custom">
                <div className="modal-image-container">
                  <button className="nav-btn prev-btn" onClick={prevImage}>
                    <FaChevronLeft />
                  </button>
                  <img 
                    src={selectedImage?.src} 
                    alt={selectedImage?.alt} 
                    className="modal-image" 
                  />
                  <button className="nav-btn next-btn" onClick={nextImage}>
                    <FaChevronRight />
                  </button>
                </div>
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageGallery;