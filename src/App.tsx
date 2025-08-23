import './App.css'
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import QuizLayout from './features/quiz/layout/QuizLayout';
import { QuizProvider } from './features/quiz/context/QuizProvider';

function App() {
  return (
    <ErrorBoundary>
      <QuizProvider>
        <QuizLayout />
      </QuizProvider>
    </ErrorBoundary>
  );
}

export default App;