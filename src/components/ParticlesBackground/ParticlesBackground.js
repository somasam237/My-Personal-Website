import React, { useEffect, useRef } from 'react';
import './ParticlesBackground.css';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `rgba(255, 20, 147, ${this.opacity})`;
        this.glowColor = `rgba(255, 105, 180, ${this.opacity * 0.5})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1;
        }

        // Keep particles within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        // Pulsing effect
        this.opacity = 0.2 + Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.3;
        this.color = `rgba(255, 20, 147, ${this.opacity})`;
        this.glowColor = `rgba(255, 105, 180, ${this.opacity * 0.5})`;
      }

      draw() {
        ctx.save();
        
        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.glowColor;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Connect particles with lines
    const connectParticles = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle1 = particlesRef.current[i];
          const particle2 = particlesRef.current[j];
          
          const distance = Math.sqrt(
            Math.pow(particle1.x - particle2.x, 2) + 
            Math.pow(particle1.y - particle2.y, 2)
          );
          
          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.2;
            ctx.strokeStyle = `rgba(255, 20, 147, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect particles
      connectParticles();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Add attraction effect to nearby particles
      particlesRef.current.forEach(particle => {
        const distance = Math.sqrt(
          Math.pow(particle.x - mouseX, 2) + 
          Math.pow(particle.y - mouseY, 2)
        );

        if (distance < 100) {
          const force = (100 - distance) / 100;
          const angle = Math.atan2(mouseY - particle.y, mouseX - particle.x);
          particle.speedX += Math.cos(angle) * force * 0.01;
          particle.speedY += Math.sin(angle) * force * 0.01;
        }
      });
    };

    // Initialize
    createParticles();
    animate();

    // Add mouse interaction
    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="particles-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)'
      }}
    />
  );
};

export default ParticlesBackground;