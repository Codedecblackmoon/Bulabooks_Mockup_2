import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, SkipForward, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { t } from '../utils/i18n';

interface TutorialStep {
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  offset?: { x: number; y: number };
}

interface TutorialProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
  language: Language;
}

const tutorialSteps: TutorialStep[] = [
  {
    target: 'welcome',
    title: 'Welcome to BulaBooks!',
    description: 'Let\'s take a quick tour to help you get started with our reading comprehension games.',
    position: 'center'
  },
  {
    target: '[data-tutorial="grade-selector"]',
    title: 'Select Your Grade',
    description: 'Choose your grade level (3-7) to get age-appropriate content and difficulty.',
    position: 'bottom',
    offset: { x: 0, y: 10 }
  },
  {
    target: '[data-tutorial="language-selector"]',
    title: 'Choose Your Language',
    description: 'Select from English, Zulu, Afrikaans, or Setswana to learn in your preferred language.',
    position: 'bottom',
    offset: { x: 0, y: 10 }
  },
  {
    target: '[data-tutorial="game-cards"]',
    title: 'Mini-Games',
    description: 'These are your learning games! Each one helps improve different reading skills.',
    position: 'top',
    offset: { x: 0, y: -10 }
  },
  {
    target: '[data-tutorial="progress-ring"]',
    title: 'Track Your Progress',
    description: 'See how much of each game you\'ve completed. Earn stars by doing well!',
    position: 'left',
    offset: { x: -10, y: 0 }
  },
  {
    target: '[data-tutorial="dashboard-link"]',
    title: 'Teacher Dashboard',
    description: 'Teachers and parents can view detailed progress reports and send updates.',
    position: 'top',
    offset: { x: 0, y: -10 }
  }
];

const Tutorial: React.FC<TutorialProps> = ({ isOpen, onComplete, onSkip, language }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  const currentStepData = tutorialSteps[currentStep];

  useEffect(() => {
    if (!isOpen) return;

    const updatePositions = () => {
      if (currentStepData.target === 'welcome') {
        // Center position for welcome step
        setHighlightPosition({ x: 0, y: 0, width: 0, height: 0 });
        setTooltipPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        return;
      }

      const targetElement = document.querySelector(currentStepData.target);
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const padding = 8;

      setHighlightPosition({
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2
      });

      // Calculate tooltip position
      let tooltipX = rect.left + rect.width / 2;
      let tooltipY = rect.top + rect.height / 2;

      const offset = currentStepData.offset || { x: 0, y: 0 };

      switch (currentStepData.position) {
        case 'top':
          tooltipY = rect.top - 20 + offset.y;
          break;
        case 'bottom':
          tooltipY = rect.bottom + 20 + offset.y;
          break;
        case 'left':
          tooltipX = rect.left - 20 + offset.x;
          break;
        case 'right':
          tooltipX = rect.right + 20 + offset.x;
          break;
        case 'center':
          // Already centered
          break;
      }

      tooltipX += offset.x;
      tooltipY += offset.y;

      setTooltipPosition({ x: tooltipX, y: tooltipY });
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions);

    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [currentStep, isOpen, currentStepData]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  const isWelcomeStep = currentStepData.target === 'welcome';
  const isLastStep = currentStep === tutorialSteps.length - 1;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 transition-opacity duration-300"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Highlight spotlight */}
      {!isWelcomeStep && (
        <div
          className="absolute border-4 border-orange-400 rounded-lg shadow-lg transition-all duration-300 pointer-events-none"
          style={{
            left: highlightPosition.x,
            top: highlightPosition.y,
            width: highlightPosition.width,
            height: highlightPosition.height,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 122, 0, 0.8)'
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className={`absolute bg-white rounded-2xl shadow-2xl p-6 max-w-sm transition-all duration-300 ${
          isWelcomeStep ? 'transform -translate-x-1/2 -translate-y-1/2' : ''
        }`}
        style={{
          left: isWelcomeStep ? tooltipPosition.x : tooltipPosition.x - 150,
          top: isWelcomeStep ? tooltipPosition.y : tooltipPosition.y - 50,
          zIndex: 51
        }}
      >
        {/* Close button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close tutorial"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Content */}
        <div className="pr-8">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {currentStepData.description}
          </p>

          {/* Progress indicator */}
          <div className="flex items-center space-x-2 mb-4">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-orange-500' : 
                  index < currentStep ? 'bg-orange-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={onSkip}
                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <SkipForward className="w-4 h-4" />
                <span>Skip Tour</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
              >
                <span>{isLastStep ? 'Get Started!' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;