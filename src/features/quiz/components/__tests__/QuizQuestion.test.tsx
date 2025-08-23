import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizQuestion from '../QuizQuestion';
import { QuizContext } from '../../context/QuizContext';
import type { QuizState } from '../../context/QuizReducer';
import type { QuizQuestion as QuizQ } from '../../models/QuizQuestion';

// Mock question
const mockQuestion: QuizQ = {
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
};

// Helper to render component with context
const renderWithContext = (state: Partial<QuizState> = {}) => {
    const mockDispatch = jest.fn(); // use jest.fn() if using Jest
    const defaultState: QuizState = {
        currentIndex: 0,
        questions: [mockQuestion],
        correctAnswers: 0,
        wrongAnswers: 0,
        completed: false,
        ...state,
    };

    render(
        <QuizContext.Provider value={{ state: defaultState, dispatch: mockDispatch }}>
            <QuizQuestion />
        </QuizContext.Provider>
    );

    return { mockDispatch };
};

describe('QuizQuestion component', () => {
    it('renders question and options', () => {
        renderWithContext();

        expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
        expect(screen.getByText('book')).toBeInTheDocument();
        expect(screen.getByText('kitap')).toBeInTheDocument();
        expect(screen.getByText('araba')).toBeInTheDocument();
    });

    it('dispatches correct action when answer is clicked', async () => {
        const user = userEvent.setup();
        const { mockDispatch } = renderWithContext();

        const btn = screen.getByText('kitap'); // correct option
        await user.click(btn);

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'ANSWER_CORRECT' });
    });

    it('shows complete message if quiz is completed', () => {
        renderWithContext({ completed: true });

        expect(screen.getByText(/Quiz complete/i)).toBeInTheDocument();
    });
});