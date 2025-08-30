import { useState, useEffect } from 'react';
import { ProgressState, GameKey, LevelKey } from '../types';

const STORAGE_KEY = 'bulabooks.progress';

const createInitialProgress = (): ProgressState => {
  const gameKeys: GameKey[] = ['wordHunt', 'readAloud', 'fillBlank', 'wordBuilder'];
  const levelKeys: LevelKey[] = [1, 2, 3];
  
  const progress: ProgressState = {} as ProgressState;
  
  gameKeys.forEach(gameKey => {
    progress[gameKey] = {} as any;
    levelKeys.forEach(levelKey => {
      progress[gameKey][levelKey] = {
        items: Array(5).fill(null).map(() => ({ answered: false, stars: 0, attempts: 0 })),
        completed: false
      };
    });
  });
  
  return progress;
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : createInitialProgress();
    } catch {
      return createInitialProgress();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateItemProgress = (
    game: GameKey, 
    level: LevelKey, 
    itemIndex: number, 
    stars: 0 | 1 | 2 | 3,
    answered: boolean = true
  ) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      newProgress[game][level].items[itemIndex] = {
        answered,
        stars,
        attempts: prev[game][level].items[itemIndex].attempts + 1
      };
      
      // Check if level is completed
      const allAnswered = newProgress[game][level].items.every(item => item.answered);
      if (allAnswered && !newProgress[game][level].completed) {
        newProgress[game][level].completed = true;
        newProgress[game][level].completedAt = Date.now();
      }
      
      return newProgress;
    });
  };

  const resetProgress = () => {
    const newProgress = createInitialProgress();
    setProgress(newProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getGameProgress = (game: GameKey) => {
    const gameData = progress[game];
    let totalItems = 0;
    let completedItems = 0;
    let totalStars = 0;
    
    Object.values(gameData).forEach(level => {
      totalItems += level.items.length;
      level.items.forEach(item => {
        if (item.answered) completedItems++;
        totalStars += item.stars;
      });
    });
    
    return {
      completedItems,
      totalItems,
      percentage: totalItems > 0 ? (completedItems / totalItems) * 100 : 0,
      totalStars,
      maxStars: totalItems * 3
    };
  };

  const getCurrentLevel = (game: GameKey): LevelKey => {
    // Find the first uncompleted level, default to 1
    for (let level: LevelKey = 1; level <= 3; level++) {
      if (!progress[game][level].completed) {
        return level;
      }
    }
    return 3; // All levels completed, return last level
  };

  return {
    progress,
    updateItemProgress,
    resetProgress,
    getGameProgress,
    getCurrentLevel
  };
}