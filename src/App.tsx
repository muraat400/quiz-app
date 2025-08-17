import './App.css'
import { QuizProvider } from './features/quiz/context/QuizProvider';
import { useQuiz } from './features/quiz/context/useQuiz';
import QuizStart from './features/quiz/components/QuizStart';
import QuizQuestion from './features/quiz/components/QuizQuestion';
import QuizResult from './features/quiz/components/QuizResult';

const QuizAppContent = () => {
  const { state } = useQuiz();

  if (state.completed) {
    return <QuizResult />;
  }

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