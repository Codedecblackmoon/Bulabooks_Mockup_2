import React, { useState, useEffect } from 'react';
import { GameLayout } from './GameLayout';
import { useProgress } from '../../hooks/useProgress';
import { useLanguage } from '../../hooks/useLanguage';
import { wordHunt } from '../../content';

export const WordHunt: React.FC = () => {
  const { language } = useLanguage();
  const { getCurrentLevel, getCurrentItem } = useProgress();
  
  const currentLevel = getCurrentLevel('wordHunt');
  const currentItemIndex = getCurrentItem('wordHunt', currentLevel);
  
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const items = wordHunt[language] || wordHunt.en;
  const currentItem = items[Math.min(currentItemIndex, items.length - 1)];

  useEffect(() => {
    setSelectedWords([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowHint(false);
  }, [currentItemIndex, currentLevel]);

  const handleWordClick = (word: string) => {
    if (showFeedback) return;
    
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleCheck = (correct: boolean) => {
    const correctWords = currentItem.answers;
    const isAnswerCorrect = correctWords.every(word => selectedWords.includes(word)) && 
                           selectedWords.length === correctWords.length;
    
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    
    return isAnswerCorrect;
  };

  const handleHint = () => {
    setShowHint(true);
  };

  const renderPassage = () => {
    const words = currentItem.passage.split(' ');
    
    return (
      <div className="text-lg leading-relaxed mb-8">
        {words.map((word, index) => {
          const cleanWord = word.replace(/[.,!?]/g, '');
          const punctuation = word.match(/[.,!?]/)?.[0] || '';
          const isAnswer = currentItem.answers.includes(cleanWord);
          const isSelected = selectedWords.includes(cleanWord);
          const isDistractor = currentItem.distractors.includes(cleanWord);
          
          return (
            <span key={index}>
              <button
                onClick={() => handleWordClick(cleanWord)}
                disabled={showFeedback}
                className={`px-1 py-0.5 rounded transition-all duration-200 ${
                  isSelected
                    ? showFeedback && isAnswer
                      ? 'bg-green-200 text-green-800'
                      : showFeedback && !isAnswer
                      ? 'bg-red-200 text-red-800'
                      : 'bg-orange-200 text-orange-800'
                    : showFeedback && isAnswer
                    ? 'bg-green-100 text-green-700'
                    : (isAnswer || isDistractor)
                    ? 'hover:bg-orange-100 cursor-pointer'
                    : 'cursor-default'
                }`}
              >
                {cleanWord}
              </button>
              {punctuation}
              {index < words.length - 1 && ' '}
            </span>
          );
        })}
      </div>
    );
  };

  const canCheck = selectedWords.length > 0 && !showFeedback;

  return (
    <GameLayout
      gameKey="wordHunt"
      onCheck={handleCheck}
      onSkip={() => {}}
      onHint={handleHint}
      canCheck={canCheck}
      showHint={!showFeedback && selectedWords.length === 0}
    >
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {currentItem.prompt}
          </h2>
          
          {showHint && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <p className="text-blue-800 text-sm">
                💡 Look for words that have similar meanings to what's being asked.
              </p>
            </div>
          )}
        </div>

        {renderPassage()}

        {showFeedback && (
          <div className={`p-4 rounded-xl ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '✅ Great!' : '❌ Try again'}
            </p>
            {!isCorrect && (
              <p className="text-sm text-red-600 mt-1">
                Look for: {currentItem.answers.join(', ')}
              </p>
            )}
          </div>
        )}
      </div>
    </GameLayout>
  );
};