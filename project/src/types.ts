export type Language = 'en' | 'zu' | 'af' | 'tn';
export type Grade = 3 | 4 | 5 | 6 | 7;
export type GameKey = 'wordHunt' | 'readAloud' | 'fillBlank' | 'wordBuilder';
export type LevelKey = 1 | 2 | 3;

export interface ItemProgress {
  answered: boolean;
  stars: 0 | 1 | 2 | 3;
  attempts: number;
}

export interface LevelProgress {
  items: ItemProgress[];
  completed: boolean;
  startedAt?: number;
  completedAt?: number;
}

export type GameProgress = Record<LevelKey, LevelProgress>;
export type ProgressState = Record<GameKey, GameProgress>;

export interface User {
  name: string;
  avatarColor: string;
}

export interface WordHuntItem {
  passage: string;
  prompt: string;
  answers: string[];
  distractors?: string[];
}

export interface ReadAloudItem {
  text: string;
  syllables?: string;
}

export interface FillBlankItem {
  sentence: string;
  options: string[];
  answer: string;
  hint?: string;
}

export interface WordBuilderItem {
  hint: string;
  tiles: string[];
  answer: string;
}

export interface GameContent {
  en: any[];
  zu: any[];
  af: any[];
  tn: any[];
}