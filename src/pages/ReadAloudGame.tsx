import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Mic, Volume2, Eye, Star } from 'lucide-react';
import GameLayout from '../components/GameLayout';
import { useProgress } from '../hooks/useProgress';
import { Language, LevelKey, ReadAloudItem, Grade } from '../types';
import { getReadAloudContent } from '../utils/contentSelector';
import { t } from '../utils/i18n';

interface ReadAloudGameProps {
  language: Language;
  grade: Grade;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ReadAloudGame: React.FC<ReadAloudGameProps> = ({ language, grade, showToast }) => {
  const navigate = useNavigate();
  const { progress, updateItemProgress, getCurrentLevel } = useProgress();
  
  const [currentLevel, setCurrentLevel] = useState<LevelKey>(getCurrentLevel('readAloud'));
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<'perfect' | 'okay' | 'tryagain' | null>(null);
  const [showSyllables, setShowSyllables] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Get content for current level
  const levelContent = getReadAloudContent(language, grade);
  const itemsPerLevel = 5;
  const startIndex = (currentLevel - 1) * itemsPerLevel;
  const levelItems = levelContent.slice(startIndex, startIndex + itemsPerLevel);
  const currentItem: ReadAloudItem = levelItems[currentItemIndex] || levelContent[currentItemIndex % levelContent.length];

  // Reset state when item changes
  useEffect(() => {
    setFeedback(null);
    setIsRecording(false);
    setAttempts(0);
    setShowSyllables(false);
  }, [currentItemIndex, currentLevel, grade]);

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentItem.text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
      showToast('Audio played', 'info');
    } else {
      showToast('Text-to-speech not supported in this browser', 'error');
    }
  };

  const handleRecord = () => {
    setIsRecording(true);
    // Simulate recording for 2 seconds
    setTimeout(() => {
      setIsRecording(false);
      showToast('Recording complete! Use the simulate buttons to test feedback.', 'info');
    }, 2000);
  };

  const handleSimulateFeedback = (type: 'perfect' | 'okay' | 'tryagain') => {
    setFeedback(type);
    setAttempts(prev => prev + 1);
    
    const feedbackMessages = {
      perfect: `${t('perfect', language)}! ⭐⭐⭐`,
      okay: `${t('almostThere', language)} ⭐⭐`,
      tryagain: t('letsTryAgain', language)
    };
    
    showToast(feedbackMessages[type], type === 'perfect' ? 'success' : type === 'okay' ? 'info' : 'error');
  };

  const handleNext = () => {
    if (!feedback) return;

    const starsMap = { perfect: 3, okay: 2, tryagain: 1 };
    const stars = starsMap[feedback];
    updateItemProgress('readAloud', currentLevel, currentItemIndex, stars as any, true);
    
    showToast(t('progressSaved', language), 'success');

    if (currentItemIndex < itemsPerLevel - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else {
      navigate('/');
    }
  };

  const handleSkip = () => {
    updateItemProgress('readAloud', currentLevel, currentItemIndex, 0, false);
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

  const renderTextWithHighlights = () => {
    const text = showSyllables && currentItem.syllables ? currentItem.syllables : currentItem.text;
    const words = text.split(' ');
    
    if (!feedback || feedback === 'perfect') {
      return (
        <p className={`text-2xl leading-relaxed text-center ${
          feedback === 'perfect' ? 'text-green-800 underline decoration-green-300' : 'text-gray-800'
        }`}>
          {text}
        </p>
      );
    }
    
    // Simulate word-level feedback for 'okay' and 'tryagain'
    return (
      <p className="text-2xl leading-relaxed text-center">
        {words.map((word, index) => {
          const shouldHighlight = feedback === 'okay' ? index % 3 === 0 : index % 2 === 0;
          const highlightClass = feedback === 'okay' 
            ? 'bg-yellow-200 text-yellow-800' 
            : 'bg-red-200 text-red-800 underline';
            
          return (
            <span
              key={index}
              className={shouldHighlight ? highlightClass : 'text-gray-800'}
            >
              {word}{' '}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <GameLayout
      gameKey="readAloud"
      gameTitle="Read-Aloud Practice"
      language={language}
      currentItemIndex={currentItemIndex}
      totalItems={itemsPerLevel}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onItemComplete={(stars) => {}}
      onNext={handleNext}
      onSkip={handleSkip}
      showToast={showToast}
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        {/* Instructions */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Read the sentence aloud
          </h2>
          <p className="text-gray-600">
            Press play to hear it first, then record yourself reading it
          </p>
        </div>

        {/* Text Display */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          {renderTextWithHighlights()}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={handlePlayAudio}
            className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>{t('playAudio', language)}</span>
          </button>

          <button
            onClick={handleRecord}
            disabled={isRecording}
            className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              isRecording
                ? 'bg-red-500 text-white cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
            <span>{isRecording ? 'Recording...' : t('record', language)}</span>
          </button>

          <button
            onClick={() => setShowSyllables(!showSyllables)}
            className="flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Eye className="w-5 h-5" />
            <span>{t('syllableHelper', language)}</span>
          </button>
        </div>

        {/* Simulate Feedback Buttons (Developer Controls) */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 mb-3 text-center">
            Developer Controls (Simulate Feedback):
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleSimulateFeedback('perfect')}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {t('perfect', language)}
            </button>
            <button
              onClick={() => handleSimulateFeedback('okay')}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {t('okay', language)}
            </button>
            <button
              onClick={() => handleSimulateFeedback('tryagain')}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {t('tryAgain', language)}
            </button>
          </div>
        </div>

        {/* Feedback Display */}
        {feedback && (
          <div className={`p-4 rounded-xl mb-4 text-center ${
            feedback === 'perfect' ? 'bg-green-50 text-green-800' :
            feedback === 'okay' ? 'bg-yellow-50 text-yellow-800' :
            'bg-red-50 text-red-800'
          }`}>
            <div className="flex items-center justify-center space-x-2">
              {feedback === 'perfect' && (
                <>
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </>
              )}
              {feedback === 'okay' && (
                <>
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 text-gray-300" />
                </>
              )}
              {feedback === 'tryagain' && (
                <>
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 text-gray-300" />
                  <Star className="w-5 h-5 text-gray-300" />
                </>
              )}
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="text-center text-sm text-gray-500">
          Sentence {currentItemIndex + 1} of {itemsPerLevel}
        </div>
      </div>
    </GameLayout>
  );
};

export default ReadAloudGame;