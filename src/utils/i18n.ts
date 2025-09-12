import { Language } from '../types';
import { uiStrings } from '../content';

export function t(key: string, language: Language): string {
  const keys = key.split('.');
  let value: any = uiStrings[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  // Fallback to English if translation not found
  if (!value && language !== 'en') {
    value = uiStrings.en;
    for (const k of keys) {
      value = value?.[k];
    }
  }
  
  return value || key;
}