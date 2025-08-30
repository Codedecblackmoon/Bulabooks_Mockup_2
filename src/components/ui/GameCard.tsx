import React from 'react';
import { Play, Trophy } from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import { LevelProgressBar } from './LevelProgressBar';

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: {
    completedItems: number;
    totalItems: number;
    totalStars: number;
    percentage: number;
  };
  currentLevel: number;
  onClick: () => void;
  buttonText: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  progress,
  currentLevel,
  onClick,
  buttonText
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 hover:scale-105">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-orange-100 rounded-xl text-orange-600 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <ProgressRing percent={progress.percentage} size={48}>
          <span className="text-xs font-medium text-gray-700">
            {progress.percentage}%
          </span>
        </ProgressRing>
      </div>
      
      <div className="mb-4">
        <LevelProgressBar 
          completed={progress.completedItems} 
          total={progress.totalItems} 
          level={currentLevel} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span>{progress.totalStars}</span>
        </div>
        
        <button
          onClick={onClick}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
        >
          <Play className="w-4 h-4" />
          {buttonText}
        </button>
      </div>
    </div>
  );
};