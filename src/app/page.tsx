'use client';

import styles from './styles.module.css';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { getTranslation } from '../translations';
import LanguageSwitcher from './components/LanguageSwitcher';
import Hero from './components/Hero';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { Toaster, toast } from 'react-hot-toast';
import { technologies, frontendTechnologies, backendTechnologies, toolsAndExtras, projects, skills } from './data/content';

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
      <Hero locale={locale} />

      {/* Main Content */}
      <main className={styles.main}>
        <Technologies
          locale={locale}
          isMobileDevice={isMobileDevice}
          frontendTechnologies={frontendTechnologies}
          backendTechnologies={backendTechnologies}
          toolsAndExtras={toolsAndExtras}
          technologies={technologies}
        />

        <Projects
          locale={locale}
          isMobileDevice={isMobileDevice}
          projects={projects}
        />

        <Skills
          locale={locale}
          isMobileDevice={isMobileDevice}
          skills={skills}
        />
      </main>

      <Contact
        locale={locale}
        isMobileDevice={isMobileDevice}
        isMapInitialized={isMapInitialized}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
