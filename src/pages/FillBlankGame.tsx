// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
// import GameLayout from '../components/GameLayout';
// import { useProgress } from '../hooks/useProgress';
// import { Language, LevelKey, FillBlankItem, Grade } from '../types';
// import { getFillBlankContent } from '../utils/contentSelector';
// import { t } from '../utils/i18n';

// interface FillBlankGameProps {
//   language: Language;
//   grade: Grade;
//   showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
// }

// const FillBlankGame: React.FC<FillBlankGameProps> = ({ language, grade, showToast }) => {
//   const navigate = useNavigate();
//   const { progress, updateItemProgress, getCurrentLevel } = useProgress();
  
//   const [currentLevel, setCurrentLevel] = useState<LevelKey>(getCurrentLevel('fillBlank'));
//   const [currentItemIndex, setCurrentItemIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [attempts, setAttempts] = useState(0);
//   const [showHint, setShowHint] = useState(false);

//   // Get content for current level
//   const levelContent = getFillBlankContent(language, grade);
//   const itemsPerLevel = 5;
//   const startIndex = (currentLevel - 1) * itemsPerLevel;
//   const levelItems = levelContent.slice(startIndex, startIndex + itemsPerLevel);
//   const currentItem: FillBlankItem = levelItems[currentItemIndex] || levelContent[currentItemIndex % levelContent.length];

//   // Reset state when item changes
//   useEffect(() => {
//     setSelectedOption(null);
//     setShowFeedback(false);
//     setIsCorrect(false);
//     setAttempts(0);
//     setShowHint(false);
//   }, [currentItemIndex, currentLevel, grade]);

//   const handleOptionClick = (option: string) => {
//     if (showFeedback) return;
    
//     setSelectedOption(option);
//     const correct = option === currentItem.answer;
//     setIsCorrect(correct);
//     setShowFeedback(true);
//     setAttempts(prev => prev + 1);

//     if (correct) {
//       showToast(t('great', language), 'success');
//     } else {
//       showToast(t('tryAgain', language), 'error');
//       if (!showHint && currentItem.hint) {
//         setShowHint(true);
//       }
//     }
//   };

//   const handleNext = () => {
//     if (!showFeedback) return;

//     const stars = isCorrect ? (attempts === 1 ? 3 : attempts === 2 ? 2 : 1) : 0;
//     updateItemProgress('fillBlank', currentLevel, currentItemIndex, stars as any, isCorrect);
    
//     if (isCorrect) {
//       showToast(t('progressSaved', language), 'success');
//     }

//     if (currentItemIndex < itemsPerLevel - 1) {
//       setCurrentItemIndex(prev => prev + 1);
//     } else {
//       navigate('/');
//     }
//   };

//   const handleSkip = () => {
//     updateItemProgress('fillBlank', currentLevel, currentItemIndex, 0, false);
//     showToast(t('progressSaved', language), 'info');

//     if (currentItemIndex < itemsPerLevel - 1) {
//       setCurrentItemIndex(prev => prev + 1);
//     } else {
//       navigate('/');
//     }
//   };

//   const handleLevelChange = (level: LevelKey) => {
//     setCurrentLevel(level);
//     setCurrentItemIndex(0);
//   };

//   const handleHint = () => {
//     setShowHint(true);
//   };

//   const renderSentenceWithBlank = () => {
//     const parts = currentItem.sentence.split('___');
    
//     return (
//       <div className="text-xl leading-relaxed text-center">
//         <span className="text-gray-800">{parts[0]}</span>
//         <span className={`inline-block min-w-[120px] border-b-4 border-dashed px-2 py-1 mx-1 transition-all duration-300 ${
//           selectedOption
//             ? isCorrect
//               ? 'border-green-500 bg-green-50 text-green-800 font-bold'
//               : 'border-red-500 bg-red-50 text-red-800'
//             : 'border-orange-300'
//         }`}>
//           {selectedOption || ''}
//         </span>
//         <span className="text-gray-800">{parts[1]}</span>
//       </div>
//     );
//   };

//   return (
//     <GameLayout
//       gameKey="fillBlank"
//       gameTitle="Fill-in-the-Blank Quest"
//       language={language}
//       currentItemIndex={currentItemIndex}
//       totalItems={itemsPerLevel}
//       currentLevel={currentLevel}
//       onLevelChange={handleLevelChange}
//       onItemComplete={(stars) => {}}
//       onNext={handleNext}
//       onSkip={handleSkip}
//       onHint={handleHint}
//       showToast={showToast}
//     >
//       <div className="bg-white rounded-2xl p-8 shadow-lg">
//         {/* Instructions */}
//         <div className="text-center mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-2">
//             Complete the sentence
//           </h2>
//           <p className="text-gray-600">
//             Choose the word that best fits in the blank
//           </p>
//         </div>

//         {/* Sentence with blank */}
//         <div className="bg-gray-50 rounded-xl p-8 mb-8">
//           {renderSentenceWithBlank()}
//         </div>

//         {/* Options */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {currentItem.options.map((option, index) => {
//             const isSelected = selectedOption === option;
//             const isCorrectOption = option === currentItem.answer;
//             const showCorrect = showFeedback && isCorrectOption;
//             const showIncorrect = showFeedback && isSelected && !isCorrect;
            
//             return (
//               <button
//                 key={index}
//                 onClick={() => handleOptionClick(option)}
//                 disabled={showFeedback}
//                 className={`p-4 rounded-xl border-2 font-medium transition-all duration-300 ${
//                   showCorrect
//                     ? 'border-green-500 bg-green-50 text-green-800'
//                     : showIncorrect
//                       ? 'border-red-500 bg-red-50 text-red-800'
//                       : isSelected
//                         ? 'border-[#FF8000] bg-orange-50 text-orange-800'
//                         : 'border-gray-200 bg-white text-gray-800 hover:border-orange-300 hover:bg-orange-50'
//                 } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
//               >
//                 {option}
//                 {showCorrect && <CheckCircle className="w-5 h-5 ml-2 inline" />}
//                 {showIncorrect && <XCircle className="w-5 h-5 ml-2 inline" />}
//               </button>
//             );
//           })}
//         </div>

//         {/* Hint */}
//         {showHint && currentItem.hint && (
//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
//             <div className="flex items-start space-x-2">
//               <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//               <p className="text-blue-800 text-sm">
//                 {currentItem.hint}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Feedback */}
//         {showFeedback && (
//           <div className={`flex items-center justify-center p-4 rounded-xl mb-4 ${
//             isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
//           }`}>
//             {isCorrect ? (
//               <CheckCircle className="w-5 h-5 mr-2" />
//             ) : (
//               <XCircle className="w-5 h-5 mr-2" />
//             )}
//             <span className="font-medium">
//               {isCorrect ? t('great', language) : t('tryAgain', language)}
//             </span>
//           </div>
//         )}

//         {/* Progress indicator */}
//         <div className="text-center text-sm text-gray-500">
//           Question {currentItemIndex + 1} of {itemsPerLevel}
//         </div>
//       </div>
//     </GameLayout>
//   );
// };

// export default FillBlankGame;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import GameLayout from '../components/GameLayout';
import { useProgress } from '../hooks/useProgress';
import { Language, LevelKey, FillBlankItem, Grade } from '../types';
import { getFillBlankContent } from '../utils/contentSelector';
import { t } from '../utils/i18n';

interface FillBlankGameProps {
  language: Language;
  grade: Grade;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const FillBlankGame: React.FC<FillBlankGameProps> = ({ language, grade, showToast }) => {
  const navigate = useNavigate();
  const { progress, updateItemProgress, getCurrentLevel } = useProgress();

  const [currentLevel, setCurrentLevel] = useState<LevelKey>(getCurrentLevel('fillBlank'));
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Get content for current level
  const levelContent = getFillBlankContent(language, grade);
  const itemsPerLevel = 5;
  const startIndex = (currentLevel - 1) * itemsPerLevel;
  const levelItems = levelContent.slice(startIndex, startIndex + itemsPerLevel);
  const currentItem: FillBlankItem = levelItems[currentItemIndex] || levelContent[currentItemIndex % levelContent.length];

  // Reset state when item changes
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
    setShowHint(false);
  }, [currentItemIndex, currentLevel, grade]);

  const handleCheck = () => {
    if (!selectedOption) return;

    const correct = selectedOption === currentItem.answer;
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

  const handleTryAgain = () => {
    // Reset only the state needed for another attempt
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowHint(false);
    // Keep attempts count
  };

  const handleNext = () => {
    if (!showFeedback) return;

    const stars = isCorrect ? (attempts === 1 ? 3 : attempts === 2 ? 2 : 1) : 0;
    updateItemProgress('fillBlank', currentLevel, currentItemIndex, stars as any, isCorrect);

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
    updateItemProgress('fillBlank', currentLevel, currentItemIndex, 0, false);
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

  return (
    <GameLayout
      gameKey="fillBlank"
      gameTitle="Fill in the Blank"
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
            Fill in the blank
          </h2>
          <p className="text-gray-600 mb-4">
            Choose the correct word to complete the sentence
          </p>
        </div>

        {/* Question */}
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-700 mb-4 text-center">
            {currentItem.sentence.replace('___', '______')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {currentItem.options.map((option, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                  selectedOption === option
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 hover:bg-orange-100 text-gray-800'
                }`}
                onClick={() => setSelectedOption(option)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          {!showFeedback ? (
            <button
              onClick={handleCheck}
              disabled={!selectedOption}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-medium transition-colors"
            >
              {t('check', language)}
            </button>
          ) : (
            <>
              {isCorrect ? (
                <button
                  onClick={handleNext}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleTryAgain}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  Try Again
                </button>
              )}
            </>
          )}
        </div>

        {/* Hint */}
        {showHint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 text-center">
            <Lightbulb className="w-5 h-5 inline mr-2 text-yellow-600" />
            <span className="text-yellow-800 text-sm">
              💡 The correct answer is: <strong>{currentItem.answer}</strong>
            </span>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`flex items-center justify-center p-4 rounded-xl mb-4 ${
              isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <XCircle className="w-5 h-5 mr-2" />
            )}
            <span className="font-medium">
              {isCorrect ? t('great', language) : t('wrong', language)}
            </span>
          </div>
        )}

        {/* Progress indicator */}
        <div className="text-center text-sm text-gray-500">
          Question {currentItemIndex + 1} of {itemsPerLevel}
        </div>
      </div>
    </GameLayout>
  );
};

export default FillBlankGame;
