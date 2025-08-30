import React, { useState } from 'react';
import { User, Settings, BarChart3, RotateCcw, Info } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Language } from '../../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onResetProgress: () => void;
  onNavigateDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onResetProgress,
  onNavigateDashboard
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900">BulaBooks</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher 
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
            compact
          />
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 bg-orange-100 rounded-full text-orange-600 hover:bg-orange-200 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-48 z-10">
                <button
                  onClick={() => {
                    onNavigateDashboard();
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all progress?')) {
                      onResetProgress();
                    }
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Progress
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};