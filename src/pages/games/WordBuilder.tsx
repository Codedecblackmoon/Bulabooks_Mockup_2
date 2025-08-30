import React, { useState, useEffect, useRef } from 'react';
import { GameLayout } from './GameLayout';
import { useProgress } from '../../hooks/useProgress';
import { useLanguage } from '../../hooks/useLanguage';
import { wordBuilder } from '../../content';

interface DragItem {
  id: string;
  content: string;
  originalIndex: number;
}

export const WordBuilder: React.FC = () => {
  const { language } = useLanguage();
  const { getCurrentLevel, getCurrentItem } = useProgress();
  
  const currentLevel = getCurrentLevel('wordBuilder');
  const currentItemIndex = getCurrentItem('wordBuilder', currentLevel);
  
  const [tiles, setTiles] = useState<DragItem[]>([]);
  const [arrangedTiles, setArrangedTiles] = useState<DragItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const items = wordBuilder[language] || wordBuilder.en;
  const currentItem = items[Math.min(currentItemIndex, items.length - 1)];

  useEffect(() => {
    // Shuffle tiles
    const shuffledTiles = currentItem.tiles
      .map((tile, index) => ({
        id: `tile-${index}`,
        content: tile,
        originalIndex: index
      }))
      .sort(() => Math.random() - 0.5);
    
    setTiles(shuffledTiles);
    setArrangedTiles([]);
    setShowFeedback(false);
    setIsCorrect(false);
  }, [currentItemIndex, currentLevel, currentItem]);

  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && showFeedback === false) {
      // Move tile to arranged area
      setTiles(tiles.filter(t => t.id !== draggedItem.id));
      setArrangedTiles([...arrangedTiles, draggedItem]);
      setDraggedItem(null);
    }
  };

  const handleTileClick = (tile: DragItem, fromArranged: boolean) => {
    if (showFeedback) return;
    
    if (fromArranged) {
      // Move back to tiles area
      setArrangedTiles(arrangedTiles.filter(t => t.id !== tile.id));
      setTiles([...tiles, tile]);
    } else {
      // Move to arranged area
      setTiles(tiles.filter(t => t.id !== tile.id));
      setArrangedTiles([...arrangedTiles, tile]);
    }
  };

  const handleCheck = () => {
    const builtWord = arrangedTiles.map(t => t.content).join('');
    const correct = builtWord.toLowerCase() === currentItem.answer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    return correct;
  };

  const canCheck = arrangedTiles.length > 0 && !showFeedback;

  const renderTile = (tile: DragItem, fromArranged: boolean) => (
    <div
      key={tile.id}
      draggable={!showFeedback}
      onDragStart={(e) => handleDragStart(e, tile)}
      onClick={() => handleTileClick(tile, fromArranged)}
      className={`px-4 py-3 bg-orange-100 border-2 border-orange-300 rounded-xl text-center font-medium cursor-pointer transition-all duration-200 hover:scale-105 select-none ${
        showFeedback && fromArranged
          ? isCorrect
            ? 'bg-green-100 border-green-300 text-green-800'
            : 'bg-red-100 border-red-300 text-red-800'
          : 'hover:bg-orange-200 hover:border-orange-400'
      } ${showFeedback ? 'cursor-default' : 'cursor-move'}`}
    >
      {tile.content}
    </div>
  );

  return (
    <GameLayout
      gameKey="wordBuilder"
      onCheck={handleCheck}
      onSkip={() => {}}
      canCheck={canCheck}
    >
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Build the word that matches the hint
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-blue-800 font-medium">
              💡 {currentItem.hint}
            </p>
          </div>

          {/* Drop Zone */}
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`min-h-16 border-2 border-dashed rounded-xl p-4 mb-6 transition-all duration-200 ${
              arrangedTiles.length > 0
                ? 'border-orange-400 bg-orange-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <p className="text-sm text-gray-600 mb-2">Drop tiles here or tap to arrange</p>
            <div className="flex flex-wrap gap-2 justify-center min-h-12 items-center">
              {arrangedTiles.length === 0 ? (
                <span className="text-gray-400 text-lg">___</span>
              ) : (
                arrangedTiles.map(tile => renderTile(tile, true))
              )}
            </div>
            {arrangedTiles.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Built word: <span className="font-bold">{arrangedTiles.map(t => t.content).join('')}</span>
              </p>
            )}
          </div>

          {/* Available Tiles */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Available tiles:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {tiles.map(tile => renderTile(tile, false))}
            </div>
          </div>

          {showFeedback && (
            <div className={`p-4 rounded-xl ${
              isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✅ Perfect!' : '❌ Not quite right'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-red-600 mt-1">
                  The correct word is: <span className="font-bold">{currentItem.answer}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  );
};