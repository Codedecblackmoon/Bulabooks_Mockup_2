export type Language = 'en' | 'zu' | 'af' | 'tn';
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

export interface GameProgress {
  1: LevelProgress;
  2: LevelProgress;
  3: LevelProgress;
}

export interface ProgressState {
  wordHunt: GameProgress;
  readAloud: GameProgress;
  fillBlank: GameProgress;
  wordBuilder: GameProgress;
}

export interface User {
  name: string;
  avatarColor: string;
}

export interface GameContent {
  title: string;
  description: string;
}

export interface WordHuntItem {
  passage: string;
  prompt: string;
  answers: string[];
  distractors: string[];
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