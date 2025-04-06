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
    subtitle: string;
    title1: string;
    description1: string;
    title2: string;
    description2: string;
    title3: string;
    description3: string;
    title4: string;
    description4: string;
    title5: string;
    description5: string;
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
  es,
  en
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