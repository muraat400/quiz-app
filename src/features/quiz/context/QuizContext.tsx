import { createContext, useContext, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';
import { quizReducer, quizInitialState } from './QuizReducer';
import type { QuizState, QuizAction } from './QuizReducer';

interface QuizContextType {
    state: QuizState;
    dispatch: Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(quizReducer, quizInitialState);

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
};