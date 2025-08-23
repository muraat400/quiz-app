import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizResult from '../QuizResult';
import { QuizContext } from '../../context/QuizContext';
import { QuizState } from '../../context/QuizReducer';

// ✅ Mock QuizService to avoid actual logic running during test
jest.mock('../../services/QuizService', () => {
  return {
    QuizService: jest.fn().mockImplementation(() => ({
      getQuestions: () => [
        {
          word: {
            Id: 1,
            English: 'mocked',
            Turkish: ['mocked'],
            Sentence: [],
            Pronunciation: '',
            Notes: [],
          },
          options: ['mocked', 'other', 'dummy', 'fake'],
          correctAnswer: 'mocked',
        },
      ],
    })),
  };
});

// ✅ Dummy state
const defaultState: QuizState = {
  currentIndex: 0,
  questions: [],
  correctAnswers: 8,
  wrongAnswers: 2,
  completed: true,
};

describe('QuizResult component', () => {
  it('displays correct score and counts', () => {
    render(
      <QuizContext.Provider
        value={{ state: defaultState, dispatch: jest.fn() }}
      >
        <QuizResult />
      </QuizContext.Provider>
    );

    expect(screen.getByText(/Quiz Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Correct Answers: 8/i)).toBeInTheDocument();
    expect(screen.getByText(/Wrong Answers: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 80%/i)).toBeInTheDocument();
  });

  it('dispatches RESET action on restart button click', async () => {
    const mockDispatch = jest.fn();
    const user = userEvent.setup();

    render(
      <QuizContext.Provider
        value={{ state: defaultState, dispatch: mockDispatch }}
      >
        <QuizResult />
      </QuizContext.Provider>
    );

    const button = screen.getByRole('button', { name: /Restart Quiz/i });
    await user.click(button);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
