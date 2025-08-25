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
    const wrongPool = this.rawWords
      .flatMap((w) => w.Turkish)
      .filter((opt) => opt !== correct);

    const shuffled = this.shuffle(wrongPool);
    return shuffled.slice(0, count);
  }

  // Shuffle utility
  private shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getQuestions(limit: number = 500, startsWithLetter?: string): QuizQuestion[] {
    let filtered = this.rawWords;

    if (startsWithLetter) {
      filtered = filtered.filter(word =>
        word.English.toLowerCase().startsWith(startsWithLetter.toLowerCase())
      );
    }

    const selected = limit ? this.shuffle(filtered).slice(0, limit) : this.shuffle(filtered);

    return selected.map((word) => {
      const correctAnswer = word.Turkish[0];
      const wrongOptions = this.getRandomWrongOptions(correctAnswer, 3);
      const options = this.shuffle([correctAnswer, ...wrongOptions]);

      return { word, options, correctAnswer };
    });
  }

  static isAnswerCorrect(selected: string, correct: string): boolean {
    return selected === correct;
  }
}