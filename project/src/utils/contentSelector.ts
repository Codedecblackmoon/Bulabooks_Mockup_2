import { Language, Grade } from '../types';
import { wordHunt, readAloud, fillBlank, wordBuilder } from '../content';

// Helper function to get grade-appropriate content
export function getGradeContent<T>(
  content: Record<Language, T[]>,
  language: Language,
  grade: Grade
): T[] {
  const languageContent = content[language] || content.en;
  
  // For now, we'll use the existing content structure
  // In the future, this can be expanded to have grade-specific content
  const itemsPerGrade = Math.ceil(languageContent.length / 5); // Distribute across grades 3-7
  const startIndex = (grade - 3) * itemsPerGrade;
  const endIndex = Math.min(startIndex + itemsPerGrade, languageContent.length);
  
  // Ensure we always have at least some content
  if (startIndex >= languageContent.length) {
    return languageContent.slice(0, Math.min(5, languageContent.length));
  }
  
  const gradeContent = languageContent.slice(startIndex, endIndex);
  
  // Ensure we have enough content for 3 levels with 5 items each
  while (gradeContent.length < 15) {
    gradeContent.push(...languageContent.slice(0, Math.min(15 - gradeContent.length, languageContent.length)));
  }
  
  return gradeContent.slice(0, 15); // 3 levels × 5 items
}

// Specific content getters for each game type
export const getWordHuntContent = (language: Language, grade: Grade) => 
  getGradeContent(wordHunt, language, grade);

export const getReadAloudContent = (language: Language, grade: Grade) => 
  getGradeContent(readAloud, language, grade);

export const getFillBlankContent = (language: Language, grade: Grade) => 
  getGradeContent(fillBlank, language, grade);

export const getWordBuilderContent = (language: Language, grade: Grade) => 
  getGradeContent(wordBuilder, language, grade);