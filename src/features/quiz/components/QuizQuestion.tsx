import { useQuiz } from '../context/useQuiz';
import { QuizService } from '../services/QuizService';

const QuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const current = state.questions[state.currentIndex];

  // If quiz is completed, show the result message
  if (state.completed) return <p>🎉 Quiz complete!</p>;

  // If current question is not available, show loading state
  if (!current) return <p>Loading question...</p>;

  // Handle answer selection and update state accordingly
  const handleAnswer = (selected: string) => {
    const isCorrect = QuizService.isAnswerCorrect(
      selected,
      current.correctAnswer
    );
    dispatch({ type: isCorrect ? 'ANSWER_CORRECT' : 'ANSWER_WRONG' });
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Question {state.currentIndex + 1}</h2>
      <h3>{current.word.English}</h3>

      <div style={{ marginTop: '1rem' }}>
        {current.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            style={{
              margin: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#eee',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;