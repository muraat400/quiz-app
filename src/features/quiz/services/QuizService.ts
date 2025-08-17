import type { Word } from "../models/Word";

export interface QuizQuestion {
  word: Word;
  options: string[];        // all possible answers (shuffled)
  correctAnswer: string;    // correct Turkish translation
}

export class QuizService {
  private rawWords: Word[];
  private questions: QuizQuestion[];

  constructor(words: Word[]) {
    this.rawWords = words;
    this.questions = this.generateQuizQuestions(words);
  }

  // Generate quiz questions with mixed options
  private generateQuizQuestions(words: Word[]): QuizQuestion[] {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return shuffled.map((word) => {
      const correct = word.Turkish[0];
      const wrongOptions = this.getRandomWrongOptions(correct, 3);
      const options = this.shuffle([correct, ...wrongOptions]);
      return {
        word,
        options,
        correctAnswer: correct,
      };
    });
  }

  // Get random wrong translations from other words
  private getRandomWrongOptions(correct: string, count: number): string[] {
    const pool = this.rawWords
      .map((w) => w.Turkish[0])
      .filter((t) => t !== correct);
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Shuffle utility
  private shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getQuestions(): QuizQuestion[] {
    return this.questions;
  }

  static isAnswerCorrect(selected: string, correct: string): boolean {
    return selected === correct;
  }
}