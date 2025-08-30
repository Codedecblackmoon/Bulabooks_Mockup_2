import React from 'react';
import { X, Star } from 'lucide-react';

interface LevelSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  timeSpent: string;
  onContinue: () => void;
  onReplay: () => void;
  isLastLevel: boolean;
}

export const LevelSummaryModal: React.FC<LevelSummaryModalProps> = ({
  isOpen,
  onClose,
  stars,
  timeSpent,
  onContinue,
  onReplay,
  isLastLevel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Level Complete!</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: 3 }, (_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < stars 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {stars}/3 Stars
          </p>
          <p className="text-gray-600">Time: {timeSpent}</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onReplay}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Replay
          </button>
          <button
            onClick={onContinue}
            className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
          >
            {isLastLevel ? 'Complete' : 'Next Level'}
          </button>
        </div>
      </div>
    </div>
  );
};