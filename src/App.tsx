import './App.css'
import { QuizProvider } from './features/quiz/context/QuizProvider';
import QuizStart from './features/quiz/components/QuizStart';
import QuizQuestion from './features/quiz/components/QuizQuestion';
import { useQuiz } from './features/quiz/context/useQuiz';

const QuizAppContent = () => {
  const { state } = useQuiz();

  if (state.questions.length === 0) {
    return <QuizStart />;
  }

  return <QuizQuestion />;
};

function App() {
  return (
    <QuizProvider>
      <QuizAppContent />
    </QuizProvider>
  );
}

export default App;