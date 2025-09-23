import { useState, useEffect } from 'react';
import { Grade } from '../types';

const STORAGE_KEY = 'bulabooks.grade';

export function useGrade() {
  const [grade, setGrade] = useState<Grade>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return (saved ? parseInt(saved) as Grade : 3);
    } catch {
      return 3;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, grade.toString());
  }, [grade]);

  return { grade, setGrade };
}