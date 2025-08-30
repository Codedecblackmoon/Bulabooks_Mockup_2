import React from 'react';

interface LevelProgressBarProps {
  completed: number;
  total: number;
  level: number;
}

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ 
  completed, 
  total, 
  level 
}) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Level {level}</span>
        <span className="text-gray-600">{completed}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};