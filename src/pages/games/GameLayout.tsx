import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, SkipForward } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LevelSummaryModal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { useLanguage } from '../../hooks/useLanguage';
import { useProgress } from '../../hooks/useProgress';
import { uiStrings } from '../../content';
import type { GameKey, LevelKey } from '../../types';

interface GameLayoutProps {
  gameKey: GameKey;
  children: React.ReactNode;
  onHint?: () => void;
  onCheck: (correct: boolean, attempts: number) => void;
  onSkip: () => void;
  canCheck: boolean;
  showHint?: boolean;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  gameKey,
  children,
  onHint,
  onCheck,
  onSkip,
  canCheck,
  showHint = false
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { progress, updateItemProgress, getCurrentLevel, getCurrentItem } = useProgress();
  
  const [currentLevel, setCurrentLevel] = useState<LevelKey>(getCurrentLevel(gameKey));
  const [currentItem, setCurrentItem] = useState(0);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(1);

  const strings = uiStrings[language] || uiStrings.en;
  
  const levelProgress = progress[gameKey][currentLevel];
  const completedItems = levelProgress.items.filter(item => item.answered).length;
  
  useEffect(() => {
    setCurrentItem(getCurrentItem(gameKey, currentLevel));
  }, [gameKey, currentLevel, getCurrentItem]);

  const handleCheck = (correct: boolean) => {
    const stars = correct ? (attempts === 1 ? 3 : attempts === 2 ? 2 : 1) : 0;
    
    updateItemProgress(gameKey, currentLevel, currentItem, stars, attempts);
    
    if (correct) {
      setToast(strings.feedback.progressSaved);
      
      // Move to next item or show summary
      if (currentItem < 4) {
        setTimeout(() => {
          setCurrentItem(currentItem + 1);
          setAttempts(1);
        }, 1000);
      } else {
        setTimeout(() => {
          setShowSummaryModal(true);
        }, 1000);
      }
    } else {
      setAttempts(attempts + 1);
    }
    
    onCheck(correct, attempts);
  };

  const handleSkip = () => {
    updateItemProgress(gameKey, currentLevel, currentItem, 0, attempts);
    
    if (currentItem < 4) {
      setCurrentItem(currentItem + 1);
      setAttempts(1);
    } else {
      setShowSummaryModal(true);
    }
    
    onSkip();
  };

  const handleContinue = () => {
    setShowSummaryModal(false);
    
    if (currentLevel < 3) {
      setCurrentLevel((currentLevel + 1) as LevelKey);
      setCurrentItem(0);
      setAttempts(1);
    } else {
      navigate('/');
    }
  };

  const handleReplay = () => {
    setShowSummaryModal(false);
    setCurrentItem(0);
    setAttempts(1);
  };

  const levelStars = levelProgress.items.reduce((sum, item) => sum + item.stars, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h1 className="text-lg font-semibold text-gray-900">
              {strings.games[gameKey]?.title || gameKey}
            </h1>
          </div>

          {/* Level Selector */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(level => (
              <button
                key={level}
                onClick={() => {
                  setCurrentLevel(level as LevelKey);
                  setCurrentItem(0);
                  setAttempts(1);
                }}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  currentLevel === level
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">{currentItem + 1}/5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentItem + 1) / 5) * 100}%` }}
            />
          </div>
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
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onHint && (
              <button
                onClick={onHint}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={!showHint}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm">{strings.buttons.hint}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSkip}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              {strings.buttons.skip}
            </button>
            
            <button
              onClick={() => handleCheck(canCheck)}
              disabled={!canCheck}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
            >
              {strings.buttons.check}
            </button>
          </div>
        </div>
      </div>

      {/* Level Summary Modal */}
      <LevelSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        stars={Math.floor(levelStars / 5)}
        timeSpent="2:30"
        onContinue={handleContinue}
        onReplay={handleReplay}
        isLastLevel={currentLevel === 3}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};