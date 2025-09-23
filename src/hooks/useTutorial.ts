import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bulabooks.tutorial.completed';

export function useTutorial() {
  const [tutorialCompleted, setTutorialCompleted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Show tutorial if not completed and after a short delay
    if (!tutorialCompleted) {
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [tutorialCompleted]);

  const completeTutorial = () => {
    setTutorialCompleted(true);
    setShowTutorial(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const skipTutorial = () => {
    completeTutorial();
  };

  const startTutorial = () => {
    setShowTutorial(true);
  };

  const resetTutorial = () => {
    setTutorialCompleted(false);
    setShowTutorial(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    tutorialCompleted,
    showTutorial,
    completeTutorial,
    skipTutorial,
    startTutorial,
    resetTutorial
  };
}