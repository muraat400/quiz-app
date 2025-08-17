import { createContext } from 'react';
import type { QuizState, QuizAction } from './QuizReducer';
import type { Dispatch } from 'react';

export interface QuizContextType {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);