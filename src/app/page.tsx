'use client';

import styles from './styles.module.css';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { getTranslation } from '../translations';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  const [locale, setLocale] = React.useState<'es' | 'en'>('es');

  // Listen for locale change events
  React.useEffect(() => {
    const handleLocaleChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setLocale(customEvent.detail);
    };

    window.addEventListener('localeChange', handleLocaleChange);
    return () => window.removeEventListener('localeChange', handleLocaleChange);
  }, []);

  // Function to update active anchors
  const updateActiveAnchor = () => {
    if (typeof window === 'undefined') return;

    const sections = ['header', 'technologies', 'projects', 'skills', 'contact'];
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    let activeSection = sections[0];

    // Update header scroll state
    const header = document.getElementById('header');
    if (header) {
      header.setAttribute('data-scrolled', (scrollPosition > 50).toString());
    }

    // Find active section
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        
        // If the section center is in the viewport
        if (elementCenter > 0 && elementCenter < windowHeight) {
          activeSection = section;
        }
      }
    });

    // Update all anchors
    const anchors = document.querySelectorAll(`.${styles.anchor}`);
    anchors.forEach(anchor => {
      const href = anchor.getAttribute('href');
      if (href) {
        const section = href.replace('#', '');
        anchor.classList.toggle(styles.active, section === activeSection);
      }
    });
  };

  const [isMobileDevice, setIsMobileDevice] = React.useState(false);
  const [isMapInitialized, setIsMapInitialized] = React.useState(false);

  // Initialize mobile state and map on client side
  React.useEffect(() => {
    setIsMobileDevice(window.innerWidth <= 768);
    const handleResize = () => setIsMobileDevice(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map initialization
  React.useEffect(() => {
    if (isMobileDevice || isMapInitialized) return;

    const initMap = async () => {
      try {
        const L = await import('leaflet');
        const mapContainer = document.getElementById('map');
        
        if (!mapContainer) return;

        // Coordinates of the Sagrada Familia
        const lat = 41.39682507564281;
        const lng = 2.1665245082363622;

        // Initialize the map
        const map = L.map('map').setView([lat, lng], 15);
        setIsMapInitialized(true);

        // Add map layer
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: 'OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        // Create custom icon
        const customIcon = L.icon({
          iconUrl: '/location-pin.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        });

        // Add marker
        L.marker([lat, lng], { icon: customIcon }).addTo(map);

        // Cleanup
        return () => {
          if (map) {
            map.remove();
          }
        };
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, [isMobileDevice]);

  const [expandedSkill, setExpandedSkill] = React.useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    if (isMobileDevice) {
      setExpandedSkill(prev => prev === null ? skill : null);
    }
  };

  const [expandedProject, setExpandedProject] = React.useState<string | null>(null);

  const toggleProject = (project: string) => {
    if (isMobileDevice) {
      setExpandedProject(prev => prev === null ? project : null);
    }
  };

  const technologies = [
    // Frontend
    {
      name: 'HTML',
      icon: '/icons/html.svg',
      color: '#E34F26'
    },
    {
      name: 'CSS',
      icon: '/icons/css.svg',
      color: '#1572B6'
    },
    {
      name: 'JavaScript',
      icon: '/icons/javascript.svg',
      color: '#F7DF1E'
    },
    {
      name: 'TypeScript',
      icon: '/icons/typescript.svg',
      color: '#3178C6'
    },
    {
      name: 'React',
      icon: '/icons/react.svg',
      color: '#61DAFB'
    },
    {
      name: 'Vue',
      icon: '/icons/vue.svg',
      color: '#4FC08D'
    },
    {
      name: 'Next.js',
      icon: '/icons/nextjs.svg',
      color: '#000000'
    },
    {
      name: 'Angular',
      icon: '/icons/angular.svg',
      color: '#DD0031'
    },
    // Backend
    {
      name: 'PHP',
      icon: '/icons/php.svg',
      color: '#777BB4'
    },
    {
      name: 'Node.js',
      icon: '/icons/nodejs.svg',
      color: '#339933'
    },
    {
      name: 'Laravel',
      icon: '/icons/laravel.svg',
      color: '#FF2D20'
    },
    {
      name: 'CodeIgniter',
      icon: '/icons/codeigniter.svg',
      color: '#EE4323'
    },
    // Tools and Extras
    {
      name: 'SQL',
      icon: '/icons/database.svg',
      color: '#4479A1'
    },
    {
      name: 'REST APIs',
      icon: '/icons/api.svg',
      color: '#009688'
    },
    {
      name: 'Docker',
      icon: '/icons/docker.svg',
      color: '#2496ED'
    },
    {
      name: 'GitHub',
      icon: '/icons/github.svg',
      color: '#181717'
    },
  ];

  const frontendTechnologies = technologies.filter(tech => ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Next.js', 'Angular'].includes(tech.name));
  const backendTechnologies = technologies.filter(tech => ['PHP', 'Node.js', 'Laravel', 'CodeIgniter', 'SQL', 'REST APIs', 'Docker', 'GitHub'].includes(tech.name));
  const toolsAndExtras = technologies.filter(tech => ['SQL', 'REST APIs', 'Docker', 'GitHub'].includes(tech.name));

  const [showMore, setShowMore] = React.useState(false);

  const projects = [
    {
      title: getTranslation('projects.title1', locale),
      description: getTranslation('projects.title1Description', locale),
      technologies: ['Laravel', 'Angular', 'Vue.js', 'SaaS']
    },
    {
      title: getTranslation('projects.title2', locale),
      description: getTranslation('projects.title2Description', locale),
      technologies: ['WebSockets', 'Backend', 'Frontend', 'CRON']
    },
    {
      title: getTranslation('projects.title3', locale),
      description: getTranslation('projects.title3Description', locale),
      technologies: ['REST APIs', 'Geolocation', 'Integration']
    },
    {
      title: getTranslation('projects.title4', locale),
      description: getTranslation('projects.title4Description', locale),
      technologies: ['Docker', 'Git', 'GitHub Actions', 'CI/CD']
    },
    {
      title: getTranslation('projects.title5', locale),
      description: getTranslation('projects.title5Description', locale),
      technologies: ['CodeIgniter', 'SQL', 'REST APIs']
    }
  ];

  const skills = [
    {
      title: getTranslation('skills.problemSolving', locale),
      description: getTranslation('skills.problemSolvingDescription', locale),
      technologies: ['Problem Solving', 'Critical Thinking', 'Decision Making']
    },
    {
      title: getTranslation('skills.adaptability', locale),
      description: getTranslation('skills.adaptabilityDescription', locale),
      technologies: ['Adaptability', 'Learning', 'Flexibility']
    },
    {
      title: getTranslation('skills.timeManagement', locale),
      description: getTranslation('skills.timeManagementDescription', locale),
      technologies: ['Time Management', 'Organization', 'Prioritization']
    },
    {
      title: getTranslation('skills.attentionToDetail', locale),
      description: getTranslation('skills.attentionToDetailDescription', locale),
      technologies: ['Attention to Detail', 'Accuracy', 'Precision']
    },
    {
      title: getTranslation('skills.teamwork', locale),
      description: getTranslation('skills.teamworkDescription', locale),
      technologies: ['Teamwork', 'Collaboration', 'Communication']
    },
    {
      title: getTranslation('skills.effectiveCommunication', locale),
      description: getTranslation('skills.effectiveCommunicationDescription', locale),
      technologies: ['Communication', 'Presentation', 'Listening']
    },
    {
      title: getTranslation('skills.criticalThinking', locale),
      description: getTranslation('skills.criticalThinkingDescription', locale),
      technologies: ['Critical Thinking', 'Analysis', 'Problem Solving']
    },
    {
      title: getTranslation('skills.continuousLearning', locale),
      description: getTranslation('skills.continuousLearningDescription', locale),
      technologies: ['Learning', 'Development', 'Growth']
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form) {
      console.error('Form element not found');
      toast.error(getTranslation('contact.error', locale) + ': Form element not found');
      return;
    }

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        form.reset();
        toast.success(getTranslation('contact.success', locale) || 'Message sent successfully');
      } else {
        throw new Error(result.error || 'Error sending message');
      }
    } catch (error: any) {
      toast.error(getTranslation('contact.error', locale) || 'Error sending message');
    }
  };

  // Effect to handle scroll and clicks
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Handle scroll with throttle for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveAnchor();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Handle clicks on anchors
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest(`.${styles.anchor}`)) {
        e.preventDefault();
        const anchor = target.closest(`.${styles.anchor}`) as HTMLElement;
        const href = anchor.getAttribute('href');
        if (href) {
          const section = document.querySelector(href);
          section?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Update initial anchor after content has loaded
    window.requestAnimationFrame(updateActiveAnchor);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      />
      {/* Navigation */}
      <nav className={styles.sectionAnchors}>
        <a href="#header" className={styles.anchor} title={getTranslation('hero.title', locale)}></a>
        <a href="#technologies" className={styles.anchor} title={getTranslation('technologies.title', locale)}></a>
        <a href="#projects" className={styles.anchor} title={getTranslation('projects.title', locale)}></a>
        <a href="#skills" className={styles.anchor} title={getTranslation('skills.title', locale)}></a>
        <a href="#contact" className={styles.anchor} title={getTranslation('contact.title', locale)}></a>
      </nav>
      
      <div className={styles.languageSwitcherContainer}>
        <LanguageSwitcher locale={locale} setLocale={setLocale} />
      </div>

      {/* Hero Section */}
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

      {/* Main Content */}
      <main className={styles.main}>
        {/* Technologies Section */}
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

        {/* Experience area */}
        {isMobileDevice ? (
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
                  <h3>{project.title}</h3>
                  <div className={styles.technologies}>
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
                {isMobileDevice ? (
                  expandedProject !== null && (
                    <div className={styles.skillContent}>
                      <p>{project.description}</p>
                    </div>
                  )
                ) : (
                  <div className={styles.skillContent}>
                    <p>{project.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        ):(
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
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.projectTechnologies}>
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={styles.projectTechTag}>{tech}</span>
                    ))}
                  </div>
                  {!isMobileDevice ? (
                    <p className={styles.projectDescription}>{project.description}</p>
                  ) : null}
                </div>
                {isMobileDevice && (
                  expandedProject !== null && (
                    <p className={styles.projectDescription}>{project.description}</p>
                  )
                )}
              </article>
            ))}
          </div>
        </section>
        )}

        {/* Skills Section */}
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
      </main>

      {/* Contact Section */}
      <section className={styles.footer} id="contact">
        <div className={styles.footerContent}>
          <h2 className={styles.footerTitle}>{getTranslation('contact.title', locale)}</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactColumn}>
              <div className={styles.contactDetails}>
                <p>{getTranslation('contact.message', locale)}</p>
                <div className={styles.contactLinks}>
                  <div>
                    <a href="https://linkedin.com/in/unairicco" className={styles.contactLink} target="_blank" rel="noopener noreferrer" title="/in/unairicco">
                      <img src="/linkedin.svg" alt="LinkedIn" className={styles.socialIcon} />
                    </a>
                  </div>
                  <div>
                    <div>
                      <a href="https://wa.me/34639635256" className={styles.contactLink} target="_blank" rel="noopener noreferrer" title="(+34) 639 635 256">
                        <img src="/whatsapp.svg" alt="WhatsApp" className={styles.socialIcon} />
                      </a>
                    </div>
                  </div>
                </div>  
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder={getTranslation('contact.name', locale)} 
                    className={styles.formInput} 
                    required 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder={getTranslation('contact.email', locale)} 
                    className={styles.formInput} 
                    required 
                  />
                  <textarea 
                    name="message" 
                    placeholder={getTranslation('contact.message', locale)} 
                    className={styles.formInput} 
                    required
                  />
                  <button type="submit" className={styles.submitButton}>{getTranslation('contact.send', locale)}</button>
                </form>
              </div>
            </div>
            {!isMobileDevice && (
              <div className={styles.mapDetails}>
                <p className={styles.locationText}>{getTranslation('contact.location', locale)}</p>
                <div className={styles.mapColumn}>
                  <div className={styles.mapContainer} id="map">
                    {!isMapInitialized && (
                      <div className="map-placeholder">Loading map...</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className={styles.copyright}> &copy; Unai Ricco {new Date().getFullYear()}</p>
      </section>
    </div>
  );
}
