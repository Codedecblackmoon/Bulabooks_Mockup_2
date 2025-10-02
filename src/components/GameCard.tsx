import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Pickaxe, PenTool, Puzzle } from 'lucide-react';
import ProgressRing from './ProgressRing';
import LevelProgressBar from './LevelProgressBar';
import { GameKey } from '../types';
import { t } from '../utils/i18n';
import { Language } from '../types';

interface GameCardProps {
  gameKey: GameKey;
  title: string;
  description: string;
  progress: {
    completedItems: number;
    totalItems: number;
    percentage: number;
  };
  currentLevel: number;
  language: Language;
}

const icons = {
  wordHunt: BookOpen,
  readAloud: Pickaxe,
  fillBlank: PenTool,
  wordBuilder: Puzzle
};

const GameCard: React.FC<GameCardProps> = ({
  gameKey,
  title,
  description,
  progress,
  currentLevel,
  language
}) => {
  const navigate = useNavigate();
  const Icon = icons[gameKey];
  const hasProgress = progress.completedItems > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-100"
         data-tutorial="game-cards"
         onClick={() => navigate(`/game/${gameKey.replace(/([A-Z])/g, '-$1').toLowerCase()}`)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <ProgressRing percent={progress.percentage} size={56} strokeWidth={4} data-tutorial="progress-ring" />
      </div>

      <div className="space-y-3">
        <LevelProgressBar
          completed={progress.completedItems}
          total={progress.totalItems}
          className="mb-3"
        />
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {t('level', language)} {currentLevel}
          </span>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200">
            {hasProgress ? t('continueGame', language) : t('startGame', language)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;