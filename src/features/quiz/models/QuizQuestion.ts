import type { Word } from './Word';

// Model for a quiz-ready question with options
export interface QuizQuestion {
  word: Word;
  options: string[];
  correctAnswer: string;
}