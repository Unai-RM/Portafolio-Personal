import React, { useState } from 'react';
import styles from '../styles.module.css';
import { getTranslation } from '../../translations';

interface TechnologyItem {
  name: string;
  icon: string;
  color?: string;
}

interface TechnologiesProps {
  locale: 'es' | 'en';
  isMobileDevice: boolean;
  frontendTechnologies: TechnologyItem[];
  backendTechnologies: TechnologyItem[];
  toolsAndExtras: TechnologyItem[];
  technologies: TechnologyItem[];
}

const Technologies: React.FC<TechnologiesProps> = ({
  locale,
  isMobileDevice,
  frontendTechnologies,
  backendTechnologies,
  toolsAndExtras,
  technologies,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className={styles.section} id="technologies">
      <h2 className={styles.sectionTitle}>{getTranslation('technologies.title', locale)}</h2>
      {isMobileDevice ? (
        <>
          <div className={styles.technologiesContainer}>
            <h2 className={styles.sectionTitle}>{getTranslation('technologies.frontend.title', locale)}</h2>
            <div className={styles.technologiesCarousel}>
              {frontendTechnologies.map((tech, index) => (
                <div key={index} className={styles.technologyItem}>
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className={styles.technologyIcon} 
                  />
                  <span className={styles.technologyName}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.technologiesContainer}>
            <h2 className={styles.sectionTitle}>{getTranslation('technologies.backend.title', locale)}</h2>
            <div className={styles.technologiesCarousel}>
              {backendTechnologies.map((tech, index) => (
                <div key={index} className={styles.technologyItem}>
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className={styles.technologyIcon} 
                  />
                  <span className={styles.technologyName}>{tech.name}</span>
                </div>
              ))}
            </div>
            <button className={styles.seeMoreButton} onClick={() => setShowMore(!showMore)}>
              {showMore ? getTranslation('common.hide', locale) : getTranslation('common.seeMore', locale)}
            </button>
            {showMore && (
              <div className={styles.technologiesContainer}>
                <h2 className={styles.sectionTitle}>{getTranslation('technologies.toolsAndExtras.title', locale)}</h2>
                <div className={styles.technologiesCarousel}>
                  {toolsAndExtras.map((tech, index) => (
                    <div key={index} className={styles.technologyItem}>
                      <img 
                        src={tech.icon} 
                        alt={tech.name} 
                        className={styles.technologyIcon} 
                      />
                      <span className={styles.technologyName}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.techGrid}>
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className={styles.techItem}
              style={{ borderColor: tech.color }}
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className={styles.techIcon} 
              />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Technologies;
