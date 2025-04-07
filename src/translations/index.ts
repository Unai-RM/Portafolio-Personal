import es from './es.json';
import en from './en.json';

interface Translation {
  hero: {
    title: string;
    description: string;
  };
  contact: {
    button: string;
    location: string;
    success: string;
    error: string;
    name: string;
    email: string;
    message: string;
    send: string;
    title: string;
  };
  technologies: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    title1: string;
    title1Description: string;
    title2: string;
    title2Description: string;
    title3: string;
    title3Description: string;
    title4: string;
    title4Description: string;
    title5: string;
    title5Description: string;
  };
  skills: {
    title: string;
    subtitle: string;
    problemSolving: string;
    problemSolvingDescription: string;
    adaptability: string;
    adaptabilityDescription: string;
    timeManagement: string;
    timeManagementDescription: string;
    attentionToDetail: string;
    attentionToDetailDescription: string;
    teamwork: string;
    teamworkDescription: string;
    effectiveCommunication: string;
    effectiveCommunicationDescription: string;
  };
}

export const translations: Record<'es' | 'en', Translation> = {
  es: {
    hero: es.hero,
    contact: es.contact,
    technologies: es.technologies,
    projects: {
      title: "Áreas de Experiencia",
      title1: "Desarrollo de SaaS",
      title1Description: "Desarrollo de aplicaciones SaaS con Laravel y Angular. Integración de Vue.js para componentes reutilizables.",
      title2: "Sistema de Notificaciones en Tiempo Real",
      title2Description: "Implementación de WebSockets para notificaciones en tiempo real. Desarrollo de backend y frontend escalable.",
      title3: "APIs y Geolocalización",
      title3Description: "Desarrollo de APIs RESTful con integración de servicios de geolocalización. Optimización de rutas y cálculos de distancias.",
      title4: "Automatización y CI/CD",
      title4Description: "Implementación de Docker para contenerización. Configuración de pipelines CI/CD con GitHub Actions.",
      title5: "Sistema de Gestión de Proyectos",
      title5Description: "Desarrollo de sistema de gestión de proyectos con CodeIgniter. Integración de APIs REST para comunicación entre módulos.",
    },
    skills: es.skills,
  },
  en: {
    hero: en.hero,
    contact: en.contact,
    technologies: en.technologies,
    projects: {
      title: "Areas of Experience",
      title1: "SaaS Development",
      title1Description: "Development of SaaS applications with Laravel and Angular. Integration of Vue.js for reusable components.",
      title2: "Real-time Notification System",
      title2Description: "Implementation of WebSockets for real-time notifications. Development of scalable backend and frontend.",
      title3: "APIs & Geolocation",
      title3Description: "Development of RESTful APIs with geolocation service integration. Optimization of routes and distance calculations.",
      title4: "Automation & CI/CD",
      title4Description: "Implementation of Docker for containerization. Configuration of CI/CD pipelines with GitHub Actions.",
      title5: "Project Management System",
      title5Description: "Development of project management system with CodeIgniter. Integration of REST APIs for module communication.",
    },
    skills: en.skills,
  }
};

export const defaultLocale = 'es';

export function getTranslation(
  key: string,
  locale: keyof typeof translations = defaultLocale
): string | undefined {
  const translation = translations[locale];
  const result = key.split('.').reduce((obj, key) => (obj as any)?.[key], translation);
  return typeof result === 'string' ? result : undefined;
}