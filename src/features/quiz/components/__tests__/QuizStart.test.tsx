import { render, screen } from '@testing-library/react';
import QuizStart from '../QuizStart';
import { QuizContext } from '../../context/QuizContext';
import { QuizState } from '../../context/QuizReducer';

// Minimal mock state
const mockState: QuizState = {
    currentIndex: 0,
    questions: [],
    correctAnswers: 0,
    wrongAnswers: 0,
    completed: false,
};

describe('QuizStart component', () => {
    it('renders welcome message and button', () => {
        render(
            <QuizContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
                <QuizStart />
            </QuizContext.Provider>
        );

        expect(screen.getByText(/Welcome To Quiz App/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Start Quiz/i })).toBeInTheDocument();
    });

    it('dispatches RESET action when Start Quiz button is clicked', () => {
        const mockDispatch = jest.fn();

        render(
            <QuizContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
                <QuizStart />
            </QuizContext.Provider>
        );

        const button = screen.getByRole('button', { name: /Start Quiz/i });
        button.click();

        expect(mockDispatch).toHaveBeenCalled();
    });
});