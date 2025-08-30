import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, PenTool, Blocks } from 'lucide-react';
import { GameCard } from '../components/ui/GameCard';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { useProgress } from '../hooks/useProgress';
import { useLanguage } from '../hooks/useLanguage';
import { uiStrings } from '../content';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { getGameProgress, getCurrentLevel } = useProgress();
  
  const strings = uiStrings[language] || uiStrings.en;

  const games = [
    {
      key: 'wordHunt' as const,
      title: strings.games.wordHunt.title,
      description: strings.games.wordHunt.description,
      icon: <Search className="w-6 h-6" />,
      route: '/game/word-hunt'
    },
    {
      key: 'readAloud' as const,
      title: strings.games.readAloud.title,
      description: strings.games.readAloud.description,
      icon: <Mic className="w-6 h-6" />,
      route: '/game/read-aloud'
    },
    {
      key: 'fillBlank' as const,
      title: strings.games.fillBlank.title,
      description: strings.games.fillBlank.description,
      icon: <PenTool className="w-6 h-6" />,
      route: '/game/fill-blank'
    },
    {
      key: 'wordBuilder' as const,
      title: strings.games.wordBuilder.title,
      description: strings.games.wordBuilder.description,
      icon: <Blocks className="w-6 h-6" />,
      route: '/game/word-builder'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {strings.appTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {strings.tagline}
          </p>
          
          <div className="flex justify-center">
            <LanguageSwitcher 
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {games.map(game => {
            const progress = getGameProgress(game.key);
            const currentLevel = getCurrentLevel(game.key);
            const buttonText = progress.completedItems > 0 ? strings.buttons.continue : strings.buttons.start;

            return (
              <GameCard
                key={game.key}
                title={game.title}
                description={game.description}
                icon={game.icon}
                progress={progress}
                currentLevel={currentLevel}
                onClick={() => navigate(game.route)}
                buttonText={buttonText}
              />
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              {strings.buttons.dashboard}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};