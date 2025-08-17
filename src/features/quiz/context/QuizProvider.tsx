import { quizReducer, quizInitialState } from './QuizReducer';
import { QuizContext } from './QuizContext';
import { useReducer } from 'react';
import type { ReactNode } from 'react';

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, quizInitialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};