import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizQuestion from '../QuizQuestion';
import { QuizContext } from '../../context/QuizContext';
import type { QuizState } from '../../context/QuizReducer';

const mockDispatch = jest.fn();

const defaultState: QuizState = {
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
  letter: '',
  limit: 100,
  answers: {},
};

const renderWithContext = (override?: Partial<QuizState>) => {
  const state = { ...defaultState, ...override };
  return render(
    <QuizContext.Provider value={{ state, dispatch: mockDispatch }}>
      <QuizQuestion />
    </QuizContext.Provider>
  );
};

describe('QuizQuestion component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders question and options', () => {
    renderWithContext();

    expect(screen.getByText(/Question 1 of 2/i)).toBeInTheDocument();
    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('elma')).toBeInTheDocument();
    expect(screen.getByText('araba')).toBeInTheDocument();
    expect(screen.getByText('kitap')).toBeInTheDocument();
    expect(screen.getByText('masa')).toBeInTheDocument();
  });

  it('dispatches ANSWER_CORRECT when correct option is clicked', async () => {
    renderWithContext();
    const user = userEvent.setup();

    await user.click(screen.getByText('elma'));

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SELECT_ANSWER', questionIndex: 0, answer: 'elma' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'ANSWER_CORRECT' });
  });

  it('dispatches ANSWER_WRONG when incorrect option is clicked', async () => {
    renderWithContext();
    const user = userEvent.setup();

    await user.click(screen.getByText('araba'));

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SELECT_ANSWER', questionIndex: 0, answer: 'araba' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'ANSWER_WRONG' });
  });

  it('dispatches PREV_QUESTION when Previous button is clicked', async () => {
    renderWithContext({ currentIndex: 1 }); // ensure button is not disabled
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /Previous/i }));

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'PREV_QUESTION' });
  });

  it('dispatches COMPLETE_QUIZ when Next is clicked on last question', async () => {
    renderWithContext({ currentIndex: 1 }); // last question
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /Next/i }));

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'COMPLETE_QUIZ' });
  });
});