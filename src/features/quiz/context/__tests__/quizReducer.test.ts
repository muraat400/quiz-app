import { quizReducer, quizInitialState } from '../QuizReducer';
import type { QuizQuestion } from '../../models/QuizQuestion';
import type { QuizState } from '../QuizReducer';

const mockQuestions: QuizQuestion[] = [
    {
        word: {
            Id: 1,
            English: 'book',
            Turkish: ['kitap'],
            Sentence: [],
            Pronunciation: 'book',
            Notes: [],
        },
        options: ['kitap', 'araba', 'ev', 'ağaç'],
        correctAnswer: 'kitap',
    },
    {
        word: {
            Id: 2,
            English: 'car',
            Turkish: ['araba'],
            Sentence: [],
            Pronunciation: 'car',
            Notes: [],
        },
        options: ['kitap', 'araba', 'ev', 'ağaç'],
        correctAnswer: 'araba',
    },
];

describe('quizReducer', () => {
    it('should reset state with new questions', () => {
        const state = quizReducer(quizInitialState, {
            type: 'RESET',
            payload: mockQuestions,
        });

        expect(state.questions).toEqual(mockQuestions);
        expect(state.correctAnswers).toBe(0);
        expect(state.wrongAnswers).toBe(0);
        expect(state.currentIndex).toBe(0);
        expect(state.completed).toBe(false);
    });

    it('should handle correct answer', () => {
        const initial: QuizState = {
            ...quizInitialState,
            questions: mockQuestions,
        };

        const state = quizReducer(initial, { type: 'ANSWER_CORRECT' });

        expect(state.correctAnswers).toBe(1);
        expect(state.currentIndex).toBe(1);
        expect(state.completed).toBe(false);
    });

    it('should handle wrong answer', () => {
        const initial: QuizState = {
            ...quizInitialState,
            questions: mockQuestions,
        };

        const state = quizReducer(initial, { type: 'ANSWER_WRONG' });

        expect(state.wrongAnswers).toBe(1);
        expect(state.currentIndex).toBe(1);
        expect(state.completed).toBe(false);
    });

    it('should set completed to true when last question answered', () => {
        const initial: QuizState = {
            ...quizInitialState,
            questions: mockQuestions,
            currentIndex: 1,
        };

        const state = quizReducer(initial, { type: 'ANSWER_CORRECT' });

        expect(state.currentIndex).toBe(2);
        expect(state.completed).toBe(true);
    });
});