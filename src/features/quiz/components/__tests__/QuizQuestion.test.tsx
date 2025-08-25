import { render, screen } from '@testing-library/react';
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
  ],
  correctAnswers: 0,
  wrongAnswers: 0,
  completed: false,
  letter: '',
  limit: 10,
  answers: {},
};

const renderWithContext = () =>
  render(
    <QuizContext.Provider value={{ state: defaultState, dispatch: mockDispatch }}>
      <QuizQuestion />
    </QuizContext.Provider>
  );

describe('QuizQuestion component', () => {
  it('renders question and options', () => {
    renderWithContext();

    expect(screen.getByText(/Question 1 of 1/i)).toBeInTheDocument();
    expect(screen.getByText('apple')).toBeInTheDocument(); // English kelime
    expect(screen.getByText('elma')).toBeInTheDocument();  // Şıklar
    expect(screen.getByText('araba')).toBeInTheDocument();
    expect(screen.getByText('kitap')).toBeInTheDocument();
    expect(screen.getByText('masa')).toBeInTheDocument();
  });
});