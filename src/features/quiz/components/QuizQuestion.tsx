import { useQuiz } from '../context/useQuiz';

const QuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const current = state.questions[state.currentIndex];

  if (state.completed) return <p>🎉 Quiz complete!</p>;
  if (!current) return <p>Loading question...</p>;

  const handleAnswer = (isCorrect: boolean) => {
    dispatch({ type: isCorrect ? 'ANSWER_CORRECT' : 'ANSWER_WRONG' });
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Question {state.currentIndex + 1}</h2>
      <h3>{current.English}</h3>

      <div style={{ marginTop: '1rem' }}>
        {current.Turkish.map((answer, idx) => (
          <button
            key={idx}
            style={{
              margin: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#eee',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleAnswer(true)}
          >
            {answer}
          </button>
        ))}

        {}
        <button
          style={{
            margin: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#eee',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => handleAnswer(false)}
        >
          Yanlış Cevap
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;