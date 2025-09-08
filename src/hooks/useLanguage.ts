import { useState, useEffect } from 'react';
import type { Language } from '../types';

const STORAGE_KEY = 'bulabooks.lang';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  return { language, setLanguage };
}