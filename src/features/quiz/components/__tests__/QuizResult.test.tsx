import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizResult from '../QuizResult';
import { QuizContext } from '../../context/QuizContext';
import type { QuizState } from '../../context/QuizReducer';

const dummyQuestion = {
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
};

const defaultState: QuizState = {
  currentIndex: 0,
  questions: Array.from({ length: 10 }, () => dummyQuestion),
  correctAnswers: 8,
  wrongAnswers: 2,
  completed: true,
  letter: 'A',
  limit: 100,
  answers: {},
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

    expect(screen.getByText(/Correct Answers/i)).toHaveTextContent(/8/);
    expect(screen.getByText(/Wrong Answers/i)).toHaveTextContent(/2/);
    expect(screen.getByText(/Score/i)).toHaveTextContent(/80\s*%/i);
  });

  it('dispatches RESET action on restart button click', () => {
    const mockDispatch = jest.fn();

    render(
      <QuizContext.Provider
        value={{ state: defaultState, dispatch: mockDispatch }}
      >
        <QuizResult />
      </QuizContext.Provider>
    );

    const button = screen.getByRole('button', { name: /Restart Quiz/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalled();
  });
});