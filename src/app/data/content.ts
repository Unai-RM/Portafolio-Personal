interface Technology {
  name: string;
  icon: string;
  color: string;
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

export const skills = [
  {
    title: 'Frontend Development',
    technologies: ['React', 'Vue', 'TypeScript', 'HTML', 'CSS'],
    description: 'Desarrollo de interfaces modernas y responsivas'
  },
  {
    title: 'Backend Development',
    technologies: ['PHP', 'Node.js', 'Laravel', 'CodeIgniter'],
    description: 'Desarrollo de APIs y servicios backend'
  },
  {
    title: 'Database Management',
    technologies: ['SQL', 'MySQL', 'PostgreSQL'],
    description: 'Diseño y gestión de bases de datos'
  }
];

export const projects = [
  {
    title: 'Portfolio Personal',
    technologies: ['Next.js', 'React', 'TypeScript'],
    description: 'Portfolio personal con diseño moderno y responsivo'
  },
  {
    title: 'Sistema de Gestión',
    technologies: ['Laravel', 'Vue', 'MySQL'],
    description: 'Sistema de gestión empresarial'
  },
  {
    title: 'API REST',
    technologies: ['Node.js', 'Express', 'PostgreSQL'],
    description: 'API REST para aplicación móvil'
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
