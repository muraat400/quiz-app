import type { QuizQuestion } from '../models/QuizQuestion';

export interface QuizState {
  currentIndex: number;
  questions: QuizQuestion[];
  correctAnswers: number;
  wrongAnswers: number;
  completed: boolean;
  letter?: string;
  limit?: number;
  answers: { [index: number]: string };
}

export type QuizAction =
  | { type: 'ANSWER_CORRECT' }
  | { type: 'ANSWER_WRONG' }
  | { type: 'PREV_QUESTION' }
  | { type: 'SKIP_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'SELECT_ANSWER'; questionIndex: number; answer: string }
  | { type: 'RESET'; payload: QuizQuestion[]; letter?: string; limit?: number };

// Initial state
export const quizInitialState: QuizState = {
  currentIndex: 0,
  questions: [],
  correctAnswers: 0,
  wrongAnswers: 0,
  completed: false,
  letter: undefined,
  limit: undefined,
  answers: {}
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER_CORRECT':
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        correctAnswers: state.correctAnswers + 1,
        completed: state.currentIndex + 1 >= state.questions.length,
      };
    case 'ANSWER_WRONG':
      return {
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
      };
    case 'PREV_QUESTION':
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
      };
    case 'SKIP_QUESTION':
      return {
        ...state,
        currentIndex: Math.min(state.questions.length - 1, state.currentIndex + 1),
      };
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        completed: true,
      };
    case 'SELECT_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionIndex]: action.answer,
        },
      };
    case 'RESET':
      return {
        ...quizInitialState,
        questions: action.payload,
        letter: action.letter,
        limit: action.limit
      };
    default:
      return state;
  }
}