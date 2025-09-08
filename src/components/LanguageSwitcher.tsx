import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  compact?: boolean;
}

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  zu: { name: 'Zulu', flag: '🇿🇦' },
  af: { name: 'Afrikaans', flag: '🇿🇦' },
  tn: { name: 'Setswana', flag: '🇧🇼' }
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  language,
  onLanguageChange,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 ${
          compact 
            ? 'p-2 rounded-lg hover:bg-gray-100' 
            : 'bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50'
        } transition-colors duration-200`}
      >
        {compact ? (
          <Globe className="w-5 h-5 text-gray-600" />
        ) : (
          <>
            <span className="text-2xl">{languages[language].flag}</span>
            <span className="font-medium text-gray-800">{languages[language].name}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[140px]">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => {
                onLanguageChange(code as Language);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                language === code ? 'bg-orange-50 text-orange-600' : 'text-gray-800'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;