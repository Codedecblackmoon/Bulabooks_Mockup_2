import React, { useState, useEffect } from 'react';
import { GameLayout } from './GameLayout';
import { useProgress } from '../../hooks/useProgress';
import { useLanguage } from '../../hooks/useLanguage';
import { fillBlank } from '../../content';

export const FillBlank: React.FC = () => {
  const { language } = useLanguage();
  const { getCurrentLevel, getCurrentItem } = useProgress();
  
  const currentLevel = getCurrentLevel('fillBlank');
  const currentItemIndex = getCurrentItem('fillBlank', currentLevel);
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const items = fillBlank[language] || fillBlank.en;
  const currentItem = items[Math.min(currentItemIndex, items.length - 1)];

  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowHint(false);
  }, [currentItemIndex, currentLevel]);

  const handleCheck = () => {
    const correct = selectedOption === currentItem.answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    return correct;
  };

  const handleHint = () => {
    setShowHint(true);
  };

  const renderSentence = () => {
    const parts = currentItem.sentence.split('___');
    
    return (
      <div className="text-xl leading-relaxed mb-8 text-center">
        {parts[0]}
        <span className={`inline-block min-w-20 px-3 py-1 mx-1 rounded transition-all duration-200 border-b-2 ${
          selectedOption
            ? showFeedback
              ? isCorrect
                ? 'bg-green-100 border-green-400 text-green-800'
                : 'bg-red-100 border-red-400 text-red-800'
              : 'bg-orange-100 border-orange-400 text-orange-800'
            : 'border-gray-300 bg-gray-50'
        }`}>
          {selectedOption || '___'}
        </span>
        {parts[1]}
      </div>
    );
  };

  const canCheck = selectedOption !== null && !showFeedback;

  return (
    <GameLayout
      gameKey="fillBlank"
      onCheck={handleCheck}
      onSkip={() => {}}
      onHint={handleHint}
      canCheck={canCheck}
      showHint={!showFeedback && !selectedOption}
    >
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Choose the correct word to complete the sentence
          </h2>

          {showHint && currentItem.hint && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-blue-800 text-sm">
                💡 {currentItem.hint}
              </p>
            </div>
          )}

          {renderSentence()}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            {currentItem.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && setSelectedOption(option)}
                disabled={showFeedback}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === option
                    ? showFeedback
                      ? option === currentItem.answer
                        ? 'border-green-400 bg-green-50 text-green-800'
                        : 'border-red-400 bg-red-50 text-red-800'
                      : 'border-orange-400 bg-orange-50 text-orange-800'
                    : showFeedback && option === currentItem.answer
                    ? 'border-green-400 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-white hover:border-orange-400 hover:bg-orange-50'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`p-4 rounded-xl ${
              isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✅ Great!' : '❌ Try again'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-red-600 mt-1">
                  The correct answer is: {currentItem.answer}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  );
};