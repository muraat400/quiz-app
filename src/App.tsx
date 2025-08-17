import './App.css'
import { QuizProvider } from './features/quiz/context/QuizContext';
import QuizStart from './features/quiz/components/QuizStart';

function App() {
  return (
    <QuizProvider>
      <QuizStart />
    </QuizProvider>
  );
}

export default App

