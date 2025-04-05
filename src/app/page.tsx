"use client";

import styles from './styles.module.css';
import React from 'react';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  // Función para actualizar las anclas activas
  const updateActiveAnchor = () => {
    if (typeof window === 'undefined') return; // Verificar que estamos en el cliente

    const sections = ['header', 'technologies', 'projects', 'skills', 'contact'];
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    let activeSection = sections[0]; // Por defecto, la primera sección

    // Actualizar el estado de scroll del header
    const header = document.getElementById('header');
    if (header) {
      header.setAttribute('data-scrolled', (scrollPosition > 50).toString());
    }

    // Encontrar la sección activa
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        
        // Si el centro de la sección está en el viewport
        if (elementCenter > 0 && elementCenter < windowHeight) {
          activeSection = section;
        }
      }
    });

    // Actualizar todas las anclas
    const anchors = document.querySelectorAll(`.${styles.anchor}`);
    anchors.forEach(anchor => {
      const href = anchor.getAttribute('href');
      if (href) {
        const section = href.replace('#', '');
        anchor.classList.toggle(styles.active, section === activeSection);
      }
    });
  };

  // Efecto para inicializar el mapa
  React.useEffect(() => {
    let map: any = null;
    let isMapInitialized = false;

    const initMap = async () => {
      if (typeof window === 'undefined' || isMapInitialized) return;

      try {
        const L = await import('leaflet');
        const mapContainer = document.getElementById('map');
        
        if (!mapContainer) return;

        // Coordenadas de la Sagrada Familia
        const lat = 41.39682507564281;
        const lng = 2.1665245082363622;

        // Inicializar el mapa
        map = L.map('map').setView([lat, lng], 15);
        isMapInitialized = true;

        // Añadir capa del mapa
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        // Crear icono personalizado
        const customIcon = L.icon({
          iconUrl: '/location-pin.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        });

        // Añadir marcador
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

  // Efecto para manejar el scroll y clicks
  React.useEffect(() => {
    if (typeof window === 'undefined') return; // Verificar que estamos en el cliente

    // Manejar scroll con throttle para mejor rendimiento
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

    // Manejar clicks en las anclas
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

    // Actualizar ancla inicial después de que el contenido se haya cargado
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
    // Herramientas y Extras
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
      title: 'Desarrollo de Aplicaciones Web',
      description: 'Desarrollo y mantenimiento de aplicaciones web con Laravel, Angular y Vue.js. Escalado de aplicación a SaaS con arquitectura optimizada para múltiples clientes.',
      technologies: ['Laravel', 'Angular', 'Vue.js', 'SaaS']
    },
    {
      title: 'Optimización y Rendimiento',
      description: 'Mejora significativa en tiempos de respuesta y consumo de recursos. Implementación de WebSockets para aplicaciones en tiempo real y automatización con CRON Jobs.',
      technologies: ['WebSockets', 'Backend', 'Frontend', 'CRON']
    },
    {
      title: 'Integración y APIs',
      description: 'Desarrollo de APIs REST con enfoque en seguridad y escalabilidad. Integración de servicios de geolocalización y sistemas externos.',
      technologies: ['REST APIs', 'Geolocalización', 'Integración']
    },
    {
      title: 'DevOps y Automatización',
      description: 'Automatización de despliegues utilizando Git, Docker y GitHub Actions. Implementación de metodologías ágiles y mejores prácticas de desarrollo.',
      technologies: ['Docker', 'Git', 'GitHub Actions', 'CI/CD']
    },
    {
      title: 'Sistema de Gestión de Datos',
      description: 'Diseño e implementación de una arquitectura escalable para la gestión eficiente de datos empresariales, con sincronización en tiempo real y alta disponibilidad.',
      technologies: ['CodeIgniter', 'SQL', 'REST APIs']
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
  
      if (response.ok) {
        e.currentTarget.reset();
        alert('Mensaje enviado con éxito!');
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.sectionAnchors}>
        <a href="#header" className={styles.anchor} title="Inicio"></a>
        <a href="#technologies" className={styles.anchor} title="Tecnologías"></a>
        <a href="#projects" className={styles.anchor} title="Logros"></a>
        <a href="#skills" className={styles.anchor} title="Aptitudes"></a>
        <a href="#contact" className={styles.anchor} title="Contacto"></a>
      </nav>
      {/* Hero Section */}
      <header className={styles.header} id="header">
        <div className={styles.headerContent}>
          <h1 className={styles.name}>Unai Ricco</h1>
          <h2 className={styles.role}>Desarrollador Full-Stack</h2>
          <p className={styles.description}>
            Desarrollador Full-Stack con más de 2 años de experiencia, enfocado en crear aplicaciones escalables y
            optimizadas en rendimiento. Mi pasión es la arquitectura de software y la mejora continua, siempre buscando
            nuevos retos para innovar y aportar soluciones eficientes.
          </p>
          <div className={styles.socialLinks}>
            <a href="https://github.com/Unai-Ricco" className={styles.socialLink} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/unairicco" className={styles.socialLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:unai.ricco.moyano@gmail.com" className={styles.socialLink}>Email</a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* Technologies Section */}
        <section className={styles.section} id="technologies">
          <h2 className={styles.sectionTitle}>Tecnologías</h2>
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
          <h2 className={styles.sectionTitle}>Logros Destacados</h2>
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
          <h2 className={styles.sectionTitle}>Aptitudes</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCard}>
              <h3>Resolución de problemas</h3>
              <p>Capacidad para identificar y resolver problemas técnicos de manera eficiente.</p>
            </div>
            <div className={styles.skillCard}>
              <h3>Capacidad de adaptación</h3>
              <p>Flexibilidad para adaptarme a nuevas tecnologías y entornos de trabajo.</p>
            </div>
            <div className={styles.skillCard}>
              <h3>Gestión de tiempo</h3>
              <p>Habilidad para priorizar tareas y cumplir con los plazos establecidos.</p>
            </div>
            <div className={styles.skillCard}>
              <h3>Atención al detalle</h3>
              <p>Enfoque meticuloso en la calidad y precisión del trabajo realizado.</p>
            </div>
            <div className={styles.skillCard}>
              <h3>Trabajo en equipo</h3>
              <p>Experiencia en entornos ágiles y colaboración efectiva en equipos multidisciplinarios.</p>
            </div>
            <div className={styles.skillCard}>
              <h3>Comunicación efectiva</h3>
              <p>Habilidad para comunicar ideas técnicas de manera clara y concisa.</p>
            </div>
          </div>
        </section>
      </main>
      {/* Contact Section */}
      <section className={styles.footer} id="contact">
        <div className={styles.footerContent}>
          <h2 className={styles.sectionTitle}>¡Trabajemos juntos!</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactColumn}>
              <div className={styles.contactDetails}>
                <p>Contáctame y hagamos algo increíble</p>
                <div className={styles.contactLinks}>
                  <div>
                    <a href="https://linkedin.com/in/unairicco" className={styles.contactLink} target="_blank" rel="noopener noreferrer" title="/in/unairicco">
                      <img src="/linkedin.svg" alt="LinkedIn" className={styles.socialIcon} />
                    </a>
                  </div>
                  <div>
                    <div>
                      <a href="https://wa.me/34639835256" className={styles.contactLink} target="_blank" rel="noopener noreferrer" title="(+34) 639 635 256">
                        <img src="/whatsapp.svg" alt="WhatsApp" className={styles.socialIcon} />
                      </a>
                    </div>
                  </div>
                </div>  
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Nombre" 
                    className={styles.formInput} 
                    required 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    className={styles.formInput} 
                    required 
                  />
                  <textarea 
                    name="message" 
                    placeholder="Mensaje" 
                    className={styles.formInput} 
                    required
                  />
                  <button type="submit" className={styles.submitButton}>Enviar mensaje</button>
                </form>
              </div>
            </div>
            <div className={styles.mapDetails}>
              <div className={styles.mapColumn}>
                <div className={styles.mapContainer} id="map" />
                <p className={styles.locationText}>Ubicado en Barcelona, España</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
