import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import './i18n/i18n';

// Components
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import ImageGallery from './components/ImageGallery/ImageGallery';

import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <div className="App">
      <ParticlesBackground />
      <Header />
      <Hero />
       
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
