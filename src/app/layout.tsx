import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getTranslation } from '../translations';
import LanguageSwitcher from './components/LanguageSwitcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Unai Ricco - Desarrollador Full Stack',
  description: 'Portafolio de Unai Ricco - Desarrollador Full Stack con experiencia en tecnologías modernas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}