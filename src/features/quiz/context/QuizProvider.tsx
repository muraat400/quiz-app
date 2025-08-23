import { useReducer, type ReactNode } from 'react';
import { quizReducer, quizInitialState } from './QuizReducer';
import { QuizContext } from './QuizContext';

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, quizInitialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};