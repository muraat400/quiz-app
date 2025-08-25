import { useQuiz } from '../context/useQuiz';
import data from '../../../data/quiz-data.json';
import { QuizService } from '../services/QuizService';

const QuizResult = () => {
  const { state, dispatch } = useQuiz();

  const total = state.questions.length;
  const scorePercent = Math.round((state.correctAnswers / total) * 100);
  const answeredCount = Object.keys(state.answers).length;
  const skipped = state.questions.length - answeredCount;

  const restartQuiz = () => {
    const { letter, limit } = state;
    const questions = new QuizService(data).getQuestions(limit, letter);
    dispatch({ type: 'RESET', payload: questions, letter, limit }); // ✅ QuizQuestion[]
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>🎉 Quiz Completed!</h2>
      <p>✅ Correct Answers: {state.correctAnswers}</p>
      <p>❌ Wrong Answers: {state.wrongAnswers}</p>
      <p>🚫 Skipped Questions: {skipped}</p>
      <p>📊 Score: {scorePercent}%</p>

      <button
        onClick={restartQuiz}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Restart Quiz
      </button>
      <br />
      <button
        onClick={() => dispatch({ type: 'RESET', payload: [] })}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Return to Home
      </button>
    </div>
  );
};

export default QuizResult;