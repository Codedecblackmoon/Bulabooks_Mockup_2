import React from 'react';
import { BookOpen, Users, RotateCcw } from 'lucide-react';
import GameCard from '../components/GameCard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import GradeSelector from '../components/GradeSelector';
import Tutorial from '../components/Tutorial';
import { useProgress } from '../hooks/useProgress';
import { useTutorial } from '../hooks/useTutorial';
import { GameKey, Language, Grade } from '../types';
import { t } from '../utils/i18n';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  grade: Grade;
  onGradeChange: (grade: Grade) => void;
  onResetProgress: () => void;
  onStartTutorial?: () => void;
}

const games: { key: GameKey; titleKey: string; descKey: string }[] = [
  { key: 'wordHunt', titleKey: 'Word Hunt Adventure', descKey: 'gameDescriptions.wordHunt' },
  { key: 'readAloud', titleKey: 'Sentence Builder', descKey: 'gameDescriptions.readAloud' },
  { key: 'fillBlank', titleKey: 'Fill-in-the-Blank Quest', descKey: 'gameDescriptions.fillBlank' },
  { key: 'wordBuilder', titleKey: 'Word Builder', descKey: 'gameDescriptions.wordBuilder' }
];

const Home: React.FC<HomeProps> = ({ 
  language, 
  onLanguageChange, 
  grade, 
  onGradeChange, 
  onResetProgress,
  onStartTutorial
}) => {
  const { getGameProgress, getCurrentLevel } = useProgress();
  const { showTutorial, completeTutorial, skipTutorial } = useTutorial();
  const navigate = useNavigate();

  // Notify parent component about tutorial start function
  React.useEffect(() => {
    if (onStartTutorial) {
      // This allows the header to trigger the tutorial
    }
  }, [onStartTutorial]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#FF8000] text-[#f9fafb] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('appName', language)}
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8">
            {t('tagline', language)} - Grade {grade}
          </p>
          
          <div className="flex justify-center space-x-4">
            <GradeSelector
              grade={grade}
              onGradeChange={onGradeChange}
             data-tutorial="grade-selector"
            />
            <LanguageSwitcher
              language={language}
              onLanguageChange={onLanguageChange}
             data-tutorial="language-selector"
            />
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-tutorial="game-cards">
          {games.map(game => {
            const progress = getGameProgress(game.key);
            const currentLevel = getCurrentLevel(game.key);
            
            return (
              <GameCard
                key={game.key}
                gameKey={game.key}
                title={game.titleKey}
                description={t(game.descKey, language)}
                progress={progress}
                currentLevel={currentLevel}
                language={language}
              />
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f9fafb] border-t border-gray-200 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#FF8000] transition-colors"
           data-tutorial="dashboard-link"
          >
            <Users className="w-5 h-5" />
            <span>{t('dashboard', language)}</span>
          </button>
          
          <button
            onClick={onResetProgress}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#FF8000] transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t('resetProgress', language)}</span>
          </button>
        </div>
      </footer>

      {/* Tutorial */}
      <Tutorial
        isOpen={showTutorial}
        onComplete={completeTutorial}
        onSkip={skipTutorial}
        language={language}
      />
    </div>
  );
};

export default Home;