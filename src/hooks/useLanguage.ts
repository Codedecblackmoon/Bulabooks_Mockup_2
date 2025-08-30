import { useState, useEffect } from 'react';
import type { Language } from '../types';

const STORAGE_KEY = 'bulabooks.lang';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      return saved && ['en', 'zu', 'af', 'tn'].includes(saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  }, [language]);

  return { language, setLanguage };
};