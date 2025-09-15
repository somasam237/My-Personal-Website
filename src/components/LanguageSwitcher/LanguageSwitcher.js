import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="language-switcher"
    >
      <Dropdown align="end">
        <Dropdown.Toggle 
          variant="outline-primary" 
          id="language-dropdown"
          className="language-toggle"
        >
          <FaGlobe className="globe-icon" />
          <span className="current-lang">
            {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu className="language-menu">
          {languages.map((language) => (
            <Dropdown.Item
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`language-item ${i18n.language === language.code ? 'active' : ''}`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="language-option"
              >
                <span className="flag">{language.flag}</span>
                <span className="name">{language.name}</span>
                {i18n.language === language.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="check-mark"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </motion.div>
  );
};

export default LanguageSwitcher;
