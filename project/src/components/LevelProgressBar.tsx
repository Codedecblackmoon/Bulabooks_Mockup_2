import React from 'react';

interface LevelProgressBarProps {
  completed: number;
  total: number;
  className?: string;
}

const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ 
  completed, 
  total, 
  className = "" 
}) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>{completed}/{total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-orange-500 h-2 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default LevelProgressBar;