// src/app/components/LanguageSwitcher.tsx
'use client';

import { useState } from 'react';
import styles from '../styles.module.css';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState('es');

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as 'es' | 'en';
    if (locale !== newLocale) {
      setLocale(newLocale);
      window.dispatchEvent(new CustomEvent('localeChange', { detail: newLocale }));
    }
  };

  return (
    <div className={styles.languageSwitcher}>
      <select 
        value={locale}
        onChange={handleLocaleChange}
        className={styles.languageSelect}
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}