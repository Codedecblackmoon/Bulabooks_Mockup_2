import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Lightbulb, RefreshCw } from 'lucide-react';
import GameLayout from '../components/GameLayout';
import { useProgress } from '../hooks/useProgress';
import { Language, LevelKey, WordBuilderItem, Grade } from '../types';
import { getWordBuilderContent } from '../utils/contentSelector';
import { t } from '../utils/i18n';

interface WordBuilderGameProps {
  language: Language;
  grade: Grade;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const WordBuilderGame: React.FC<WordBuilderGameProps> = ({ language, grade, showToast }) => {
  const navigate = useNavigate();
  const { progress, updateItemProgress, getCurrentLevel } = useProgress();
  
  const [currentLevel, setCurrentLevel] = useState<LevelKey>(getCurrentLevel('wordBuilder'));
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [availableTiles, setAvailableTiles] = useState<string[]>([]);
  const [answerSlots, setAnswerSlots] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [draggedTile, setDraggedTile] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Get content for current level
  const levelContent = getWordBuilderContent(language, grade);
  const itemsPerLevel = 5;
  const startIndex = (currentLevel - 1) * itemsPerLevel;
  const levelItems = levelContent.slice(startIndex, startIndex + itemsPerLevel);
  const currentItem: WordBuilderItem = levelItems[currentItemIndex] || levelContent[currentItemIndex % levelContent.length];

  // Reset state when item changes
  useEffect(() => {
    const shuffledTiles = [...currentItem.tiles].sort(() => Math.random() - 0.5);
    setAvailableTiles(shuffledTiles);
    setAnswerSlots([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
    setShowHint(false);
  }, [currentItemIndex, currentLevel, grade, currentItem.tiles]);

  const handleTileClick = (tile: string, isFromAnswer: boolean = false) => {
    if (showFeedback) return;

    if (isFromAnswer) {
      // Move tile back to available
      setAnswerSlots(prev => prev.filter(t => t !== tile));
      setAvailableTiles(prev => [...prev, tile]);
    } else {
      // Move tile to answer
      setAvailableTiles(prev => prev.filter(t => t !== tile));
      setAnswerSlots(prev => [...prev, tile]);
    }
  };

  const handleCheck = () => {
    if (answerSlots.length === 0) return;

    const userAnswer = answerSlots.join('');
    const correct = userAnswer === currentItem.answer;
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

  const handleReset = () => {
    if (showFeedback) return;
    
    const shuffledTiles = [...currentItem.tiles].sort(() => Math.random() - 0.5);
    setAvailableTiles(shuffledTiles);
    setAnswerSlots([]);
  };

  const handleNext = () => {
    if (!showFeedback) return;

    const stars = isCorrect ? (attempts === 1 ? 3 : attempts === 2 ? 2 : 1) : 0;
    updateItemProgress('wordBuilder', currentLevel, currentItemIndex, stars as any, isCorrect);
    
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
    updateItemProgress('wordBuilder', currentLevel, currentItemIndex, 0, false);
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

  const handleHint = () => {
    setShowHint(true);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, tile: string) => {
    setDraggedTile(tile);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnAnswer = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedTile && availableTiles.includes(draggedTile) && !showFeedback) {
      handleTileClick(draggedTile, false);
    }
    setDraggedTile(null);
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedTile && answerSlots.includes(draggedTile) && !showFeedback) {
      handleTileClick(draggedTile, true);
    }
    setDraggedTile(null);
  };

  return (
    <GameLayout
      gameKey="wordBuilder"
      gameTitle="Word Builder"
      language={language}
      currentItemIndex={currentItemIndex}
      totalItems={itemsPerLevel}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onItemComplete={(stars) => {}}
      onNext={handleNext}
      onSkip={handleSkip}
      onHint={handleHint}
      showToast={showToast}
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        {/* Instructions */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Build the word
          </h2>
          <p className="text-gray-600 mb-4">
            Drag the tiles to form the correct word
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-center space-x-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                {currentItem.hint}
              </span>
            </div>
          </div>
        </div>

        {/* Answer Area */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Your Answer:
          </h3>
          <div
            className="flex flex-wrap justify-center gap-2 min-h-[60px] p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDropOnAnswer}
          >
            {answerSlots.length === 0 ? (
              <p className="text-gray-400 self-center">Drop tiles here</p>
            ) : (
              answerSlots.map((tile, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 bg-orange-100 border-2 border-orange-300 rounded-lg cursor-pointer hover:bg-orange-200 transition-all duration-200 ${
                    showFeedback
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-red-100 border-red-500 text-red-800'
                      : 'text-orange-800'
                  }`}
                  onClick={() => handleTileClick(tile, true)}
                  draggable={!showFeedback}
                  onDragStart={(e) => handleDragStart(e, tile)}
                >
                  <span className="font-semibold">{tile}</span>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-500">
              Word: <span className="font-mono text-lg">{answerSlots.join('')}</span>
            </span>
          </div>
        </div>

        {/* Available Tiles */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Available Tiles:
          </h3>
          <div
            className="flex flex-wrap justify-center gap-3"
            onDragOver={handleDragOver}
            onDrop={handleDropOnAvailable}
          >
            {availableTiles.map((tile, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 text-gray-800 font-semibold hover:scale-105"
                onClick={() => handleTileClick(tile, false)}
                draggable={!showFeedback}
                onDragStart={(e) => handleDragStart(e, tile)}
              >
                {tile}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleCheck}
            disabled={answerSlots.length === 0 || showFeedback}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            {t('check', language)}
          </button>
          
          <button
            onClick={handleReset}
            disabled={showFeedback}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Hint */}
        {showHint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <p className="text-yellow-800 text-sm text-center">
              💡 The correct word is: <span className="font-bold">{currentItem.answer}</span>
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
          Word {currentItemIndex + 1} of {itemsPerLevel}
        </div>
      </div>
    </GameLayout>
  );
};

export default WordBuilderGame;