import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, BarChart3, RotateCcw, Info, Home } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import type { Language } from '../types';
import { t } from '../utils/i18n';

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onResetProgress: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onResetProgress }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isGamePage = location.pathname.startsWith('/game/');
  const showBackButton = location.pathname !== '/';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={t('back', language)}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        <button
          onClick={() => navigate('/')}
          className="font-bold text-xl text-orange-600 hover:text-orange-700 transition-colors"
        >
          {t('appName', language)}
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <LanguageSwitcher
          language={language}
          onLanguageChange={onLanguageChange}
          compact
        />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
          >
            <User className="w-4 h-4 text-orange-600" />
          </button>

          {showMenu && (
            <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[200px]">
              <button
                onClick={() => {
                  navigate('/');
                  setShowMenu(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl transition-colors"
              >
                <Home className="w-4 h-4 text-gray-600" />
                <span className="text-gray-800">{t('home', language)}</span>
              </button>
              
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setShowMenu(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-gray-600" />
                <span className="text-gray-800">{t('dashboard', language)}</span>
              </button>
              
              <button
                onClick={() => {
                  onResetProgress();
                  setShowMenu(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-red-600"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('resetProgress', language)}</span>
              </button>
              
              <button
                onClick={() => setShowMenu(false)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 last:rounded-b-xl transition-colors"
              >
                <Info className="w-4 h-4 text-gray-600" />
                <span className="text-gray-800">{t('about', language)}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;