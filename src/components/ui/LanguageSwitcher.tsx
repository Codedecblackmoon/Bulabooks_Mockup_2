import React from 'react';
import { Globe } from 'lucide-react';
import type { Language } from '../../types';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  compact?: boolean;
}

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  zu: { name: 'isiZulu', flag: '🇿🇦' },
  af: { name: 'Afrikaans', flag: '🇿🇦' },
  tn: { name: 'Setswana', flag: '🇧🇼' }
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLanguage, 
  onLanguageChange, 
  compact = false 
}) => {
  return (
    <div className="relative group">
      <button className={`flex items-center gap-2 ${compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'} bg-white border border-gray-300 rounded-xl hover:border-orange-500 transition-colors`}>
        <Globe className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-gray-600`} />
        <span className="hidden sm:inline">
          {languages[currentLanguage].name}
        </span>
        <span className="sm:hidden text-lg">
          {languages[currentLanguage].flag}
        </span>
      </button>
      
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-32">
        {Object.entries(languages).map(([code, lang]) => (
          <button
            key={code}
            onClick={() => onLanguageChange(code as Language)}
            className={`w-full px-4 py-2 text-left hover:bg-orange-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
              currentLanguage === code ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};