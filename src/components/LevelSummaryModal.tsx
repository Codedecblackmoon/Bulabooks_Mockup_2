import React from 'react';
import { Star, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import { t } from '../utils/i18n';
import { Language } from '../types';

interface LevelSummaryModalProps {
  isOpen: boolean;
  level: number;
  stars: number;
  maxStars: number;
  timeSpent?: number;
  onClose: () => void;
  onNextLevel?: () => void;
  onReplay?: () => void;
  language: Language;
}

const LevelSummaryModal: React.FC<LevelSummaryModalProps> = ({
  isOpen,
  level,
  stars,
  maxStars,
  timeSpent,
  onClose,
  onNextLevel,
  onReplay,
  language
}) => {
  if (!isOpen) return null;

  const percentage = Math.round((stars / maxStars) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-scale-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-orange-600 fill-current" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('levelComplete', language)}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {t('level', language)} {level}
          </p>

          <div className="flex justify-center items-center space-x-1 mb-6">
            {Array.from({ length: maxStars }, (_, i) => (
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

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{t('stars', language)}</span>
              <span className="font-bold text-orange-600">{stars}/{maxStars}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            {timeSpent && (
              <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>

          <div className="space-y-3">
            {onNextLevel && (
              <button
                onClick={onNextLevel}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>{t('next', language)} {t('level', language)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            
            <div className="flex space-x-3">
              {onReplay && (
                <button
                  onClick={onReplay}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay</span>
                </button>
              )}
              
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
              >
                {t('home', language)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSummaryModal;