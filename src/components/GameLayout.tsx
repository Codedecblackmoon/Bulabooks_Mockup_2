import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, HelpCircle, SkipForward, Star } from 'lucide-react';
import LevelProgressBar from './LevelProgressBar';
import LevelSummaryModal from './LevelSummaryModal';
import { useProgress } from '../hooks/useProgress';
import { GameKey, LevelKey, Language } from '../types';
import { t } from '../utils/i18n';

interface GameLayoutProps {
  children: React.ReactNode;
  gameKey: GameKey;
  gameTitle: string;
  language: Language;
  currentItemIndex: number;
  totalItems: number;
  currentLevel: LevelKey;
  onLevelChange: (level: LevelKey) => void;
  onItemComplete: (stars: number) => void;
  onNext: () => void;
  onSkip: () => void;
  onHint?: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  gameKey,
  gameTitle,
  language,
  currentItemIndex,
  totalItems,
  currentLevel,
  onLevelChange,
  onItemComplete,
  onNext,
  onSkip,
  onHint,
  showToast
}) => {
  const navigate = useNavigate();
  const { progress, getGameProgress } = useProgress();
  const [showLevelSummary, setShowLevelSummary] = useState(false);
  const [levelSummaryData, setLevelSummaryData] = useState<{
    level: number;
    stars: number;
    maxStars: number;
    timeSpent?: number;
  } | null>(null);

  const currentLevelProgress = progress[gameKey][currentLevel];
  const completedItems = currentLevelProgress.items.filter(item => item.answered).length;

  // Check if level is completed after each item
  useEffect(() => {
    if (currentLevelProgress.completed && completedItems === totalItems) {
      const levelStars = currentLevelProgress.items.reduce((sum, item) => sum + item.stars, 0);
      const timeSpent = currentLevelProgress.startedAt 
        ? Math.floor((Date.now() - currentLevelProgress.startedAt) / 1000)
        : undefined;

      setLevelSummaryData({
        level: currentLevel,
        stars: levelStars,
        maxStars: totalItems * 3,
        timeSpent
      });
      setShowLevelSummary(true);
    }
  }, [currentLevelProgress.completed, completedItems, totalItems, currentLevel, currentLevelProgress.startedAt]);

  const handleNextLevel = () => {
    if (currentLevel < 3) {
      const nextLevel = (currentLevel + 1) as LevelKey;
      onLevelChange(nextLevel);
      setShowLevelSummary(false);
      setLevelSummaryData(null);
    } else {
      navigate('/');
    }
  };

  const handleReplay = () => {
    // Reset current level progress
    setShowLevelSummary(false);
    setLevelSummaryData(null);
    // This would need to be implemented in the game components
  };

  const handleCloseSummary = () => {
    setShowLevelSummary(false);
    setLevelSummaryData(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={t('back', language)}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h1 className="font-bold text-lg text-gray-800">{gameTitle}</h1>
          </div>

          {/* Level Selector */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map(level => (
              <button
                key={level}
                onClick={() => onLevelChange(level as LevelKey)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  level === currentLevel
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-4">
          <LevelProgressBar
            completed={currentItemIndex + 1}
            total={totalItems}
          />
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onHint && (
              <button
                onClick={onHint}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm">{t('hint', language)}</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onSkip}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              <span className="text-sm">{t('skip', language)}</span>
            </button>

            <button
              onClick={onNext}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
            >
              {t('next', language)}
            </button>
          </div>
        </div>
      </div>

      {/* Level Summary Modal */}
      {showLevelSummary && levelSummaryData && (
        <LevelSummaryModal
          isOpen={showLevelSummary}
          level={levelSummaryData.level}
          stars={levelSummaryData.stars}
          maxStars={levelSummaryData.maxStars}
          timeSpent={levelSummaryData.timeSpent}
          onClose={handleCloseSummary}
          onNextLevel={currentLevel < 3 ? handleNextLevel : undefined}
          onReplay={handleReplay}
          language={language}
        />
      )}
    </div>
  );
};

export default GameLayout;