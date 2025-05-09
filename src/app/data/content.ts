import { getTranslation } from '../../translations';

interface Technology {
  name: string;
  icon: string;
  color: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
}

interface Skill {
  title: string;
  description: string;
  technologies: string[];
}

export const technologies: Technology[] = [
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
  }
];

export const frontendTechnologies = technologies.filter(tech => 
  ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Next.js', 'Angular'].includes(tech.name)
);

export const backendTechnologies = technologies.filter(tech => 
  ['PHP', 'Node.js', 'Laravel', 'CodeIgniter', 'SQL', 'REST APIs', 'Docker', 'GitHub'].includes(tech.name)
);

export const toolsAndExtras = technologies.filter(tech => 
  ['SQL', 'REST APIs', 'Docker', 'GitHub'].includes(tech.name)
);

export const projects = (locale: string): Project[] => [
  {
    title: 'projects.title1',
    description: 'projects.title1Description',
    technologies: ['Laravel', 'Angular', 'Vue.js', 'SaaS']
  },
  {
    title: 'projects.title2',
    description: 'projects.title2Description',
    technologies: ['WebSockets', 'Backend', 'Frontend', 'CRON']
  },
  {
    title: 'projects.title3',
    description: 'projects.title3Description',
    technologies: ['REST APIs', 'Geolocation', 'Integration']
  },
  {
    title: 'projects.title4',
    description: 'projects.title4Description',
    technologies: ['Docker', 'Git', 'GitHub Actions', 'CI/CD']
  },
  {
    title: 'projects.title5',
    description: 'projects.title5Description',
    technologies: ['CodeIgniter', 'SQL', 'REST APIs']
  }
];

export const skills = (locale: string): Skill[] => [
  {
    title: 'skills.problemSolving',
    description: 'skills.problemSolvingDescription',
    technologies: ['Problem Solving', 'Critical Thinking', 'Decision Making']
  },
  {
    title: 'skills.adaptability',
    description: 'skills.adaptabilityDescription',
    technologies: ['Adaptability', 'Learning', 'Flexibility']
  },
  {
    title: 'skills.timeManagement',
    description: 'skills.timeManagementDescription',
    technologies: ['Time Management', 'Organization', 'Prioritization']
  },
  {
    title: 'skills.attentionToDetail',
    description: 'skills.attentionToDetailDescription',
    technologies: ['Attention to Detail', 'Accuracy', 'Precision']
  },
  {
    title: 'skills.teamwork',
    description: 'skills.teamworkDescription',
    technologies: ['Teamwork', 'Collaboration', 'Communication']
  },
  {
    title: 'skills.effectiveCommunication',
    description: 'skills.effectiveCommunicationDescription',
    technologies: ['Communication', 'Presentation', 'Listening']
  },
  {
    title: 'skills.criticalThinking',
    description: 'skills.criticalThinkingDescription',
    technologies: ['Critical Thinking', 'Analysis', 'Problem Solving']
  },
  {
    title: 'skills.continuousLearning',
    description: 'skills.continuousLearningDescription',
    technologies: ['Learning', 'Development', 'Growth']
  }
];

export const socialLinks = {
  linkedin: {
    url: 'https://linkedin.com/in/unairicco',
    title: '/in/unairicco'
  },
  whatsapp: {
    url: 'https://wa.me/34639635256',
    title: '(+34) 639 635 256'
  }
};
