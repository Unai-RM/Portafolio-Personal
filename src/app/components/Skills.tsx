import React from 'react';
import styles from '../styles.module.css';
import { getTranslation } from '../../translations';

interface Skill {
  title?: string;
  technologies: string[];
  description?: string;
}

interface SkillsProps {
  locale: 'es' | 'en';
  isMobileDevice: boolean;
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({
  locale,
  isMobileDevice,
  skills,
}) => {
  const [expandedSkill, setExpandedSkill] = React.useState<string | null>(null);

  const toggleSkill = (title: string) => {
    setExpandedSkill(prev => prev === title ? null : title);
  };
  return (
    <section className={styles.section} id="skills">
      <h2 className={styles.sectionTitle}>{getTranslation('skills.title', locale)}</h2>
      <div className={styles.skillsGrid}>
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className={styles.skillCard}
            onClick={() => toggleSkill(skill.title || '')}
          >
            <div className={styles.skillHeader}>
              <h3>{skill.title}</h3>
              <div className={styles.technologies}>
                {skill.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
            {isMobileDevice ? (
              expandedSkill !== null && (
                <div className={styles.skillContent}>
                  <p>{skill.description}</p>
                </div>
              )
            ) : (
              <div className={styles.skillContent}>
                <p>{skill.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
