import { useQuiz } from '../context/useQuiz';
import data from '../../../data/quiz-data.json';
import { QuizService } from '../services/QuizService';

const QuizStart = () => {
  const { dispatch } = useQuiz();

  const startQuiz = () => {
    const service = new QuizService(data);
    const questions = service.getQuestions(); // ✅ already QuizQuestion[]
    dispatch({ type: 'RESET', payload: questions }); // ✅ no `as any`
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>📚 Welcome To Quiz App!</h2>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizStart;