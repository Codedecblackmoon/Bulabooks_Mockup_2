import React, { useState, useEffect } from 'react';
import { Play, Mic, Volume2 } from 'lucide-react';
import { GameLayout } from './GameLayout';
import { useProgress } from '../../hooks/useProgress';
import { useLanguage } from '../../hooks/useLanguage';
import { readAloud } from '../../content';

export const ReadAloud: React.FC = () => {
  const { language } = useLanguage();
  const { getCurrentLevel, getCurrentItem } = useProgress();
  
  const currentLevel = getCurrentLevel('readAloud');
  const currentItemIndex = getCurrentItem('readAloud', currentLevel);
  
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<'perfect' | 'okay' | 'tryagain' | null>(null);
  const [showSyllables, setShowSyllables] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);

  const items = readAloud[language] || readAloud.en;
  const currentItem = items[Math.min(currentItemIndex, items.length - 1)];

  useEffect(() => {
    setFeedback(null);
    setIsRecording(false);
    setHighlightedWords([]);
  }, [currentItemIndex, currentLevel]);

  const handlePlay = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentItem.text);
      utterance.lang = language === 'en' ? 'en-US' : 'en-US'; // Fallback to English
      speechSynthesis.speak(utterance);
    }
  };

  const handleRecord = () => {
    setIsRecording(true);
    // Simulate recording for 2 seconds
    setTimeout(() => {
      setIsRecording(false);
    }, 2000);
  };

  const simulateFeedback = (type: 'perfect' | 'okay' | 'tryagain') => {
    setFeedback(type);
    
    // Set highlighted words based on feedback
    const words = currentItem.text.split(' ');
    if (type === 'perfect') {
      setHighlightedWords(words);
    } else if (type === 'okay') {
      // Highlight some words as needing work
      setHighlightedWords([words[Math.floor(words.length / 2)]]);
    } else {
      // Highlight problematic words
      setHighlightedWords([words[0], words[words.length - 1]]);
    }
  };

  const handleCheck = () => {
    return feedback === 'perfect';
  };

  const renderText = () => {
    const text = showSyllables ? currentItem.syllables || currentItem.text : currentItem.text;
    const words = text.split(' ');

    return (
      <div className="text-2xl leading-relaxed text-center mb-8">
        {words.map((word, index) => {
          const isHighlighted = highlightedWords.some(hw => word.includes(hw.replace(/[.,!?]/g, '')));
          const highlightColor = feedback === 'perfect' 
            ? 'bg-green-200 text-green-800'
            : feedback === 'okay'
            ? 'bg-yellow-200 text-yellow-800'
            : 'bg-red-200 text-red-800';

          return (
            <span
              key={index}
              className={`px-1 py-0.5 rounded transition-all duration-300 ${
                isHighlighted ? highlightColor : ''
              }`}
            >
              {word}
              {index < words.length - 1 && ' '}
            </span>
          );
        })}
      </div>
    );
  };

  const getFeedbackMessage = () => {
    switch (feedback) {
      case 'perfect':
        return { text: 'Great reading! ⭐⭐⭐', color: 'text-green-600' };
      case 'okay':
        return { text: 'Almost there. ⭐⭐', color: 'text-yellow-600' };
      case 'tryagain':
        return { text: "Let's try once more.", color: 'text-red-600' };
      default:
        return null;
    }
  };

  const canCheck = feedback === 'perfect';

  return (
    <GameLayout
      gameKey="readAloud"
      onCheck={handleCheck}
      onSkip={() => {}}
      canCheck={canCheck}
    >
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Read the sentence aloud
          </h2>

          {renderText()}

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handlePlay}
              disabled={'speechSynthesis' in window === false}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl transition-colors"
            >
              <Volume2 className="w-5 h-5" />
              Play
            </button>

            <button
              onClick={handleRecord}
              disabled={isRecording}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              <Mic className="w-5 h-5" />
              {isRecording ? 'Recording...' : 'Record'}
            </button>

            <button
              onClick={() => setShowSyllables(!showSyllables)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors"
            >
              {showSyllables ? 'Normal' : 'Syllables'}
            </button>
          </div>

          {/* Simulation buttons (for demo) */}
          {!isRecording && !feedback && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-3">Demo controls:</p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => simulateFeedback('perfect')}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm"
                >
                  Perfect
                </button>
                <button
                  onClick={() => simulateFeedback('okay')}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm"
                >
                  Okay
                </button>
                <button
                  onClick={() => simulateFeedback('tryagain')}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {feedback && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className={`font-medium ${getFeedbackMessage()?.color}`}>
                {getFeedbackMessage()?.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  );
};