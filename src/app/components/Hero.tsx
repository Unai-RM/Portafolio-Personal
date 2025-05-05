import React from 'react';
import styles from '../styles.module.css';
import { getTranslation } from '../../translations';

interface HeroProps {
  locale: 'es' | 'en';
}

export default function Hero({ locale }: HeroProps) {
  return (
    <header className={styles.header} id="header">
      <div className={styles.headerContent}>
        <h1 className={styles.name}>Unai Ricco</h1>
        <h2 className={styles.role}>{getTranslation('hero.role', locale)}</h2>
        <p className={styles.description}>
          {getTranslation('hero.description', locale)}
        </p>
        <div className={styles.socialLinks}>
          <a href="https://github.com/Unai-RM" className={styles.socialLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/unairicco" className={styles.socialLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:unai.ricco.moyano@gmail.com" className={styles.socialLink}>Email</a>
        </div>
      </div>
    </header>
  );
}
