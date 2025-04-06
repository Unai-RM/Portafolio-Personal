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

  // Effect to initialize the map
  React.useEffect(() => {
    let map: any = null;
    let isMapInitialized = false;

    const initMap = async () => {
      if (typeof window === 'undefined' || isMapInitialized) return;

      try {
        const L = await import('leaflet');
        const mapContainer = document.getElementById('map');
        
        if (!mapContainer) return;

        // Coordinates of the Sagrada Familia
        const lat = 41.39682507564281;
        const lng = 2.1665245082363622;

        // Initialize the map
        map = L.map('map').setView([lat, lng], 15);
        isMapInitialized = true;

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
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (map && isMapInitialized) {
        map.remove();
        isMapInitialized = false;
      }
    };
  }, []);

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

  const projects = [
    {
      title: getTranslation('projects.title1', locale),
      description: getTranslation('projects.description1', locale),
      technologies: ['Laravel', 'Angular', 'Vue.js', 'SaaS']
    },
    {
      title: getTranslation('projects.title2', locale),
      description: getTranslation('projects.description2', locale),
      technologies: ['WebSockets', 'Backend', 'Frontend', 'CRON']
    },
    {
      title: getTranslation('projects.title3', locale),
      description: getTranslation('projects.description3', locale),
      technologies: ['REST APIs', 'Geolocation', 'Integration']
    },
    {
      title: getTranslation('projects.title4', locale),
      description: getTranslation('projects.description4', locale),
      technologies: ['Docker', 'Git', 'GitHub Actions', 'CI/CD']
    },
    {
      title: getTranslation('projects.title5', locale),
      description: getTranslation('projects.description5', locale),
      technologies: ['CodeIgniter', 'SQL', 'REST APIs']
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
        <LanguageSwitcher />
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
        </section>

        {/* Projects Section */}
        <section className={styles.section} id="projects">
          <h2 className={styles.sectionTitle}>{getTranslation('projects.title', locale)}</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <article key={index} className={styles.projectCard}>
                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.techTags}>
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className={styles.section} id="skills">
          <h2 className={styles.sectionTitle}>{getTranslation('skills.title', locale)}</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCard}>
              <h3>{getTranslation('skills.problemSolving', locale)}</h3>
              <p>{getTranslation('skills.problemSolvingDescription', locale)}</p>
            </div>
            <div className={styles.skillCard}>
              <h3>{getTranslation('skills.adaptability', locale)}</h3>
              <p>{getTranslation('skills.adaptabilityDescription', locale)}</p>
            </div>
            <div className={styles.skillCard}>
              <h3>{getTranslation('skills.timeManagement', locale)}</h3>
              <p>{getTranslation('skills.timeManagementDescription', locale)}</p>
            </div>
            <div className={styles.skillCard}>
              <h3>{getTranslation('skills.attentionToDetail', locale)}</h3>
              <p>{getTranslation('skills.attentionToDetailDescription', locale)}</p>
            </div>
            <div className={styles.skillCard}>
              <h3>{getTranslation('skills.teamwork', locale)}</h3>
              <p>{getTranslation('skills.teamworkDescription', locale)}</p>
            </div>
            <div className={styles.skillCard}>
              <h3>{getTranslation('skills.effectiveCommunication', locale)}</h3>
              <p>{getTranslation('skills.effectiveCommunicationDescription', locale)}</p>
            </div>
            <div className={styles.skillCard}>
              <h3>{getTranslation('skills.criticalThinking', locale)}</h3>
              <p>{getTranslation('skills.criticalThinkingDescription', locale)}</p>
            </div>
            <div className={styles.skillCard}>
              <h3>{getTranslation('skills.continuousLearning', locale)}</h3>
              <p>{getTranslation('skills.continuousLearningDescription', locale)}</p>
            </div>
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
            <div className={styles.mapDetails}>
              <p className={styles.locationText}>{getTranslation('contact.location', locale)}</p>
              <div className={styles.mapColumn}>
                <div className={styles.mapContainer} id="map" />
              </div>
            </div>
          </div>
        </div>
        <p className={styles.copyright}> Unai Ricco {new Date().getFullYear()}</p>
      </section>
    </div>
  );
}
