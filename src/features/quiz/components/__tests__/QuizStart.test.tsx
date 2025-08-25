import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizStart from '../QuizStart';
import { QuizContext } from '../../context/QuizContext';
import type { QuizQuestion } from '../../models/QuizQuestion';

// QuizService named export ise:
jest.mock('../../services/QuizService', () => ({
  QuizService: jest.fn().mockImplementation(() => ({
    getQuestions: (): QuizQuestion[] => [
      {
        word: {
          Id: 1,
          English: 'test',
          Turkish: ['test'],
          Sentence: [],
          Pronunciation: '',
          Notes: [],
        },
        options: ['test', 'wrong1', 'wrong2', 'wrong3'],
        correctAnswer: 'test',
      },
    ],
  })),
}));

const mockDispatch = jest.fn();

const renderWithContext = () =>
  render(
    <QuizContext.Provider
      value={{
        state: {
          currentIndex: 0,
          questions: [],
          correctAnswers: 0,
          wrongAnswers: 0,
          completed: false,
          letter: 'A',
          limit: 100, // component default'u da 100
          answers: {},
        },
        dispatch: mockDispatch,
      }}
    >
      <QuizStart />
    </QuizContext.Provider>
  );

describe('QuizStart component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders UI elements correctly', () => {
    renderWithContext();

    expect(screen.getByText(/Welcome To Quiz App/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select a letter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of questions/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Start Quiz/i })
    ).toBeInTheDocument();
  });

  it('allows selecting a letter and number of questions (select)', () => {
    renderWithContext();

    const letterSelect = screen.getByLabelText(/Select a letter/i);
    fireEvent.change(letterSelect, { target: { value: 'B' } });
    expect((letterSelect as HTMLSelectElement).value).toBe('B');

    const limitSelect = screen.getByLabelText(/Number of questions/i);
    fireEvent.change(limitSelect, { target: { value: '50' } });
    expect((limitSelect as HTMLSelectElement).value).toBe('50');
  });

  it('dispatches RESET with chosen letter and limit on Start', () => {
    renderWithContext();

    const letterSelect = screen.getByLabelText(/Select a letter/i);
    fireEvent.change(letterSelect, { target: { value: 'A' } });

    const limitSelect = screen.getByLabelText(/Number of questions/i);
    fireEvent.change(limitSelect, { target: { value: '50' } });

    const startButton = screen.getByRole('button', { name: /Start Quiz/i });
    fireEvent.click(startButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'RESET',
        payload: expect.any(Array),
        letter: 'A',
        limit: 50, // ✅ artık select'ten gelen geçerli değer
      })
    );
  });
});