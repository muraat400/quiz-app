import QuizStart from '../components/QuizStart';
import QuizQuestion from '../components/QuizQuestion';
import QuizResult from '../components/QuizResult';
import { useQuiz } from '../context/useQuiz';

const QuizLayout = () => {
  const { state } = useQuiz();

  if (state.completed) return <QuizResult />;
  if (state.questions.length > 0) return <QuizQuestion />;
  return <QuizStart />;
};

export default QuizLayout;