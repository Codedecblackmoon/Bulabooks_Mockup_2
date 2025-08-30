import { useState, useEffect } from 'react';
import type { ProgressState, GameKey, LevelKey, ItemProgress } from '../types';

const STORAGE_KEY = 'bulabooks.progress';

const createInitialItemProgress = (): ItemProgress => ({
  answered: false,
  stars: 0,
  attempts: 0
});

const createInitialLevelProgress = () => ({
  items: Array.from({ length: 5 }, () => createInitialItemProgress()),
  completed: false,
  startedAt: undefined,
  completedAt: undefined
});

const createInitialGameProgress = () => ({
  1: createInitialLevelProgress(),
  2: createInitialLevelProgress(),
  3: createInitialLevelProgress()
});

const createInitialProgressState = (): ProgressState => ({
  wordHunt: createInitialGameProgress(),
  readAloud: createInitialGameProgress(),
  fillBlank: createInitialGameProgress(),
  wordBuilder: createInitialGameProgress()
});

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : createInitialProgressState();
    } catch {
      return createInitialProgressState();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [progress]);

  const updateItemProgress = (
    gameKey: GameKey,
    level: LevelKey,
    itemIndex: number,
    stars: number,
    attempts: number = 1
  ) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      const gameProgress = { ...newProgress[gameKey] };
      const levelProgress = { ...gameProgress[level] };
      const items = [...levelProgress.items];
      
      items[itemIndex] = {
        answered: true,
        stars: stars as 0 | 1 | 2 | 3,
        attempts
      };
      
      levelProgress.items = items;
      
      // Check if level is completed
      const completedItems = items.filter(item => item.answered).length;
      if (completedItems === 5) {
        levelProgress.completed = true;
        levelProgress.completedAt = Date.now();
      }
      
      if (!levelProgress.startedAt && completedItems > 0) {
        levelProgress.startedAt = Date.now();
      }
      
      gameProgress[level] = levelProgress;
      newProgress[gameKey] = gameProgress;
      
      return newProgress;
    });
  };

  const resetProgress = () => {
    const initialState = createInitialProgressState();
    setProgress(initialState);
  };

  const getGameProgress = (gameKey: GameKey) => {
    const gameProgress = progress[gameKey];
    let totalCompleted = 0;
    let totalItems = 0;
    let totalStars = 0;
    
    Object.values(gameProgress).forEach(levelProgress => {
      levelProgress.items.forEach(item => {
        totalItems++;
        if (item.answered) {
          totalCompleted++;
          totalStars += item.stars;
        }
      });
    });
    
    return {
      completedItems: totalCompleted,
      totalItems,
      totalStars,
      percentage: totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0
    };
  };

  const getCurrentLevel = (gameKey: GameKey): LevelKey => {
    const gameProgress = progress[gameKey];
    
    // Find the first incomplete level
    for (let level = 1; level <= 3; level++) {
      const levelProgress = gameProgress[level as LevelKey];
      if (!levelProgress.completed) {
        return level as LevelKey;
      }
    }
    
    // All levels completed, return last level
    return 3;
  };

  const getCurrentItem = (gameKey: GameKey, level: LevelKey): number => {
    const levelProgress = progress[gameKey][level];
    
    // Find the first unanswered item
    for (let i = 0; i < levelProgress.items.length; i++) {
      if (!levelProgress.items[i].answered) {
        return i;
      }
    }
    
    // All items answered, return last item
    return 4;
  };

  return {
    progress,
    updateItemProgress,
    resetProgress,
    getGameProgress,
    getCurrentLevel,
    getCurrentItem
  };
};