import type { Word } from "../models/Word";

export interface QuizState {
    currentIndex: number;
    questions: Word[];
    correctAnswers: number;
    wrongAnswers: number;
    completed: boolean;
}

export type QuizAction =
    | { type: 'ANSWER_CORRECT' }
    | { type: 'ANSWER_WRONG' }
    | { type: 'RESET', payload: Word[] };

export const quizInitialState: QuizState = {
    currentIndex: 0,
    questions: [],
    correctAnswers: 0,
    wrongAnswers: 0,
    completed: false
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
    switch (action.type) {
        case 'ANSWER_CORRECT':
            return {
                ...state,
                currentIndex: state.currentIndex + 1,
                correctAnswers: state.correctAnswers + 1,
                completed: state.currentIndex + 1 >= state.questions.length
            };
        case 'ANSWER_WRONG':
            return {
                ...state,
                currentIndex: state.currentIndex + 1,
                wrongAnswers: state.wrongAnswers + 1,
                completed: state.currentIndex + 1 >= state.questions.length
            };
        case 'RESET':
            return {
                ...quizInitialState,
                questions: action.payload
            };
        default:
            return state;
    }
}