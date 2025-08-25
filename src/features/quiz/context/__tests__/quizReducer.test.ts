import { quizReducer } from '../QuizReducer';
import type { QuizState } from '../QuizReducer';

const makeState = (override?: Partial<QuizState>): QuizState => ({
  currentIndex: 0,
  questions: [
    {
      word: {
        Id: 1,
        English: 'apple',
        Turkish: ['elma'],
        Sentence: [],
        Pronunciation: '',
        Notes: [],
      },
      options: ['elma', 'araba', 'kitap', 'masa'],
      correctAnswer: 'elma',
    },
    {
      word: {
        Id: 2,
        English: 'car',
        Turkish: ['araba'],
        Sentence: [],
        Pronunciation: '',
        Notes: [],
      },
      options: ['elma', 'araba', 'masa', 'kitap'],
      correctAnswer: 'araba',
    },
  ],
  correctAnswers: 0,
  wrongAnswers: 0,
  completed: false,
  letter: 'A',
  limit: 100,
  answers: {},
  ...override,
});

describe('quizReducer', () => {
  it('should handle correct answer', () => {
    let state = makeState();
    state = quizReducer(state, { type: 'ANSWER_CORRECT' });
    expect(state.correctAnswers).toBe(1);
    expect(state.wrongAnswers).toBe(0);
    expect(state.currentIndex).toBe(1);
  });

  it('should handle wrong answer (index artmaz)', () => {
    let state = makeState();
    state = quizReducer(state, { type: 'ANSWER_WRONG' });
    expect(state.wrongAnswers).toBe(1);
    expect(state.currentIndex).toBe(0);
    expect(state.completed).toBe(false);
  });

  it('should complete quiz when COMPLETE_QUIZ is dispatched', () => {
    let state = makeState({ currentIndex: 1, completed: false });
    state = quizReducer(state, { type: 'COMPLETE_QUIZ' });
    expect(state.completed).toBe(true);
  });
});