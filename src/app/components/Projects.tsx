import React from 'react';
import styles from '../styles.module.css';
import { getTranslation } from '../../translations';

interface Project {
  title?: string;
  technologies: string[];
  description?: string;
}

interface ProjectsProps {
  locale: 'es' | 'en';
  isMobileDevice: boolean;
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({
  locale,
  isMobileDevice,
  projects,
}) => {
  const [expandedProject, setExpandedProject] = React.useState<string | null>(null);

  const toggleProject = (title: string) => {
    setExpandedProject(prev => prev === title ? null : title);
  };
  if (isMobileDevice) {
    return (
      <section className={styles.section} id="projects">
        <h2 className={styles.sectionTitle}>{getTranslation('projects.title', locale)}</h2>
        <div className={styles.skillsGrid}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={styles.skillCard}
              onClick={() => toggleProject(project.title || '')}
            >
              <div className={styles.skillHeader}>
                <h3>{getTranslation(project.title || '', locale)}</h3>
                <div className={styles.technologies}>
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
              {isMobileDevice && expandedProject !== null && (
                <div className={styles.skillContent}>
                  <p>{getTranslation(project.description || '', locale)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="projects">
      <h2 className={styles.sectionTitle}>{getTranslation('projects.title', locale)}</h2>
      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <article 
            key={index} 
            className={styles.projectCard}
            onClick={() => toggleProject(project.title || '')}
          >
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{getTranslation(project.title || '', locale)}</h3>
              <div className={styles.projectTechnologies}>
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.projectTechTag}>{tech}</span>
                ))}
              </div>
              {!isMobileDevice && (
                <p className={styles.projectDescription}>{getTranslation(project.description || '', locale)}</p>
              )}
            </div>
            {isMobileDevice && expandedProject !== null && (
              <p className={styles.projectDescription}>{getTranslation(project.description || '', locale)}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
