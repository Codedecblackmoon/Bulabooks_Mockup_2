import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import GameLayout from '../components/GameLayout';
import { useProgress } from '../hooks/useProgress';
import { wordHunt } from '../content';
import type { Language, LevelKey, WordHuntItem } from '../types';
import { t } from '../utils/i18n';

interface WordHuntGameProps {
  language: Language;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const WordHuntGame: React.FC<WordHuntGameProps> = ({ language, showToast }) => {
  const navigate = useNavigate();
  const { progress, updateItemProgress, getCurrentLevel } = useProgress();
  
  const [currentLevel, setCurrentLevel] = useState<LevelKey>(getCurrentLevel('wordHunt'));
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Get content for current level
  const levelContent = wordHunt[language] || wordHunt.en;
  const itemsPerLevel = 5;
  const startIndex = (currentLevel - 1) * itemsPerLevel;
  const levelItems = levelContent.slice(startIndex, startIndex + itemsPerLevel);
  const currentItem: WordHuntItem = levelItems[currentItemIndex] || levelContent[currentItemIndex % levelContent.length];

  // Reset state when item changes
  useEffect(() => {
    setSelectedWord(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
    setShowHint(false);
  }, [currentItemIndex, currentLevel]);

  const handleWordClick = (word: string) => {
    if (showFeedback) return;
    
    setSelectedWord(word);
    const correct = currentItem.answers.includes(word);
    setIsCorrect(correct);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);

    if (correct) {
      showToast(t('great', language), 'success');
    } else {
      showToast(t('tryAgain', language), 'error');
      setShowHint(true);
    }
  };

  const handleNext = () => {
    if (!showFeedback) return;

    const stars = isCorrect ? (attempts === 1 ? 3 : attempts === 2 ? 2 : 1) : 0;
    updateItemProgress('wordHunt', currentLevel, currentItemIndex, stars as any, isCorrect);
    
    if (isCorrect) {
      showToast(t('progressSaved', language), 'success');
    }

    if (currentItemIndex < itemsPerLevel - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else {
      navigate('/');
    }
  };

  const handleSkip = () => {
    updateItemProgress('wordHunt', currentLevel, currentItemIndex, 0, false);
    showToast(t('progressSaved', language), 'info');

    if (currentItemIndex < itemsPerLevel - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else {
      navigate('/');
    }
  };

  const handleLevelChange = (level: LevelKey) => {
    setCurrentLevel(level);
    setCurrentItemIndex(0);
  };

  const renderPassageWithClickableWords = () => {
    const words = currentItem.passage.split(' ');
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?]/g, '');
      const isAnswer = currentItem.answers.includes(cleanWord);
      const isSelected = selectedWord === cleanWord;
      const isDistractor = currentItem.distractors?.includes(cleanWord);
      
      return (
        <span
          key={index}
          className={`cursor-pointer p-1 rounded transition-all duration-200 ${
            isSelected
              ? isCorrect
                ? 'bg-green-100 text-green-800 font-bold'
                : 'bg-red-100 text-red-800'
              : (isAnswer || isDistractor)
                ? 'hover:bg-orange-100 border-b-2 border-orange-300 border-dashed'
                : 'hover:bg-gray-100'
          }`}
          onClick={() => handleWordClick(cleanWord)}
        >
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <GameLayout
      gameKey="wordHunt"
      gameTitle="Word Hunt Adventure"
      language={language}
      currentItemIndex={currentItemIndex}
      totalItems={itemsPerLevel}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onItemComplete={(stars) => {}}
      onNext={handleNext}
      onSkip={handleSkip}
      onHint={() => setShowHint(true)}
      showToast={showToast}
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        {/* Prompt */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {currentItem.prompt}
          </h2>
          <p className="text-gray-600">
            Tap the word in the passage below
          </p>
        </div>

        {/* Passage */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <p className="text-lg leading-relaxed text-gray-800">
            {renderPassageWithClickableWords()}
          </p>
        </div>

        {/* Hint */}
        {showHint && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-blue-800 text-sm">
              💡 Look for a word that means: {currentItem.answers.join(' or ')}
            </p>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`flex items-center justify-center p-4 rounded-xl mb-4 ${
            isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <XCircle className="w-5 h-5 mr-2" />
            )}
            <span className="font-medium">
              {isCorrect ? t('great', language) : t('tryAgain', language)}
            </span>
          </div>
        )}

        {/* Progress indicator */}
        <div className="text-center text-sm text-gray-500">
          Question {currentItemIndex + 1} of {itemsPerLevel}
        </div>
      </div>
    </GameLayout>
  );
};

export default WordHuntGame;