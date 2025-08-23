import { useQuiz } from '../context/useQuiz';
import data from '../../../data/quiz-data.json';
import { QuizService } from '../services/QuizService';

const QuizResult = () => {
  const { state, dispatch } = useQuiz();

  const total = state.correctAnswers + state.wrongAnswers;
  const scorePercent = Math.round((state.correctAnswers / total) * 100);

  const restartQuiz = () => {
    const questions = new QuizService(data).getQuestions();
    dispatch({ type: 'RESET', payload: questions }); // ✅ QuizQuestion[]
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>🎉 Quiz Completed!</h2>
      <p>✅ Correct Answers: {state.correctAnswers}</p>
      <p>❌ Wrong Answers: {state.wrongAnswers}</p>
      <p>📊 Score: {scorePercent}%</p>

      <button
        onClick={restartQuiz}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizResult;