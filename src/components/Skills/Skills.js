import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaGitAlt, 
  FaDatabase, 
  FaServer 
} from 'react-icons/fa';
import { 
  SiExpress, 
  SiMongodb, 
  SiPostgresql, 
  SiBootstrap, 
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiDocker
} from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import './Skills.css';

const Skills = () => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (percentage) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  const skills = [
    {
      category: t('skills.categories.frontend'),
      items: [
        { name: "React.js", icon: <FaReact />, percentage: 95, color: "#61DAFB" },
        { name: "JavaScript", icon: <FaJs />, percentage: 90, color: "#F7DF1E" },
        { name: "TypeScript", icon: <SiTypescript />, percentage: 85, color: "#3178C6" },
        { name: "HTML5", icon: <FaHtml5 />, percentage: 95, color: "#E34F26" },
        { name: "CSS3", icon: <FaCss3Alt />, percentage: 90, color: "#1572B6" },
        { name: "Bootstrap", icon: <SiBootstrap />, percentage: 88, color: "#7952B3" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, percentage: 85, color: "#38B2AC" },
        { name: "Next.js", icon: <SiNextdotjs />, percentage: 80, color: "#000000" }
      ]
    },
    {
      category: t('skills.categories.backend'),
      items: [
        { name: "Node.js", icon: <FaNodeJs />, percentage: 90, color: "#339933" },
        { name: "Express.js", icon: <SiExpress />, percentage: 88, color: "#000000" },
        { name: "MongoDB", icon: <SiMongodb />, percentage: 85, color: "#47A248" },
        { name: "PostgreSQL", icon: <SiPostgresql />, percentage: 80, color: "#336791" },
        { name: "REST APIs", icon: <FaServer />, percentage: 92, color: "#FF6B6B" },
        { name: "Database Design", icon: <FaDatabase />, percentage: 85, color: "#4ECDC4" }
      ]
    },
    {
      category: t('skills.categories.tools'),
      items: [
        { name: "Git", icon: <FaGitAlt />, percentage: 90, color: "#F05032" },
        { name: "Docker", icon: <SiDocker />, percentage: 75, color: "#2496ED" }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section section-padding">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Row>
            <Col lg={12} className="text-center mb-5">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title">
                  {t('skills.title')} <span className="futuristic-text">{t('skills.skills')}</span>
                </h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">
                  {t('skills.subtitle')}
                </p>
              </motion.div>
            </Col>
          </Row>

          {skills.map((skillCategory, categoryIndex) => (
            <Row key={categoryIndex} className="mb-5">
              <Col lg={12}>
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
                  className="skill-category"
                >
                  <h3 className="category-title">{skillCategory.category}</h3>
                  
                  <Row>
                    {skillCategory.items.map((skill, skillIndex) => (
                      <Col lg={6} xl={4} key={skillIndex} className="mb-4">
                        <motion.div
                          variants={skillVariants}
                          whileHover={{ 
                            scale: 1.05,
                            rotateY: 10,
                            transition: { duration: 0.3 }
                          }}
                          className="skill-item glass-effect"
                        >
                          <div className="skill-header">
                            <div className="skill-icon" style={{ color: skill.color }}>
                              {skill.icon}
                            </div>
                            <div className="skill-info">
                              <h4 className="skill-name">{skill.name}</h4>
                              <span className="skill-percentage">{skill.percentage}%</span>
                            </div>
                          </div>
                          
                          <div className="skill-progress-container">
                            <motion.div
                              className="skill-progress"
                              custom={skill.percentage}
                              variants={progressVariants}
                              style={{
                                background: `linear-gradient(90deg, ${skill.color}20, ${skill.color})`
                              }}
                            >
                              <div 
                                className="progress-glow"
                                style={{ backgroundColor: skill.color }}
                              ></div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </motion.div>
              </Col>
            </Row>
          ))}

          <Row className="mt-5">
            <Col lg={12} className="text-center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="skills-summary glass-effect"
              >
                <h3 className="summary-title">{t('skills.summary.title')}</h3>
                <p className="summary-text">
                  {t('skills.summary.description')}
                </p>
                <div className="learning-indicators">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="learning-icon"
                  >
                    ⚡
                  </motion.div>
                  <span className="learning-text">{t('skills.summary.learning')}</span>
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Skills;