import { useEffect, useState } from 'react';
import { useQuiz } from '../context/useQuiz';
import { Word } from '../models/Word';

const QuizQuestion = () => {
  const { state, dispatch } = useQuiz();
  const currentQuestion = state.questions[state.currentIndex];
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showDetailVisible, setShowDetailVisible] = useState(false);

  // Set selected option from global state (persisted answers)
  useEffect(() => {
    setSelectedOption(state.answers[state.currentIndex] || null);
    setAnswerRevealed(false);
    setShowDetailVisible(false);
  }, [state.currentIndex, state.answers]);

  const handleAnswer = (option: string) => {
    if (selectedOption || answerRevealed) return;

    setSelectedOption(option);
    dispatch({
      type: 'SELECT_ANSWER',
      questionIndex: state.currentIndex,
      answer: option,
    });

    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      dispatch({ type: 'ANSWER_CORRECT' });
      setTimeout(() => {
        setSelectedOption(null);
      }, 300);
    } else {
      dispatch({ type: 'ANSWER_WRONG' });
      setAnswerRevealed(true);
    }
  };

  const getButtonStyle = (option: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      margin: '8px',
      padding: '12px 20px',
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
    };

    // Feedback coloring
    if (state.answers[state.currentIndex]) {
      if (option === currentQuestion.correctAnswer) {
        return { ...baseStyle, backgroundColor: 'green' };
      }
      if (option === state.answers[state.currentIndex]) {
        return { ...baseStyle, backgroundColor: 'red' };
      }
    }

    return baseStyle;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>
        Question {state.currentIndex + 1} of {state.questions.length}
      </h2>
      <h3>{currentQuestion.word.English} ({currentQuestion.word.Pronunciation})</h3>

      <div>
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            style={getButtonStyle(option)}
            disabled={!!selectedOption || !!state.answers[state.currentIndex]}
          >
            {option}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => dispatch({ type: 'PREV_QUESTION' })}
          disabled={state.currentIndex === 0}
          style={{ marginRight: '1rem' }}
        >
          ⬅ Previous
        </button>

        <button
          onClick={() => {
            setSelectedOption(null);
            setAnswerRevealed(false);

            const isLast = state.currentIndex === state.questions.length - 1;
            if (isLast) {
              dispatch({ type: 'COMPLETE_QUIZ' });
            } else {
              dispatch({ type: 'SKIP_QUESTION' });
            }
          }}
        >
          ➡ Next
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => setShowDetailVisible((prev) => !prev)}
        >
          {showDetailVisible ? 'Hide Detail' : 'Show Detail'}
        </button>
      </div>

      {showDetailVisible && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3>Details:</h3>

          {currentQuestion.word.Turkish.map((detail, i) => (
            <span key={i} style={{ fontWeight: 'bold', fontSize: '20px' }}>
              {detail},{' '}
            </span>
          ))}

          {currentQuestion.word.Sentence.map((detail, i) => (
            <div key={i}>
              <h3>{detail.SentenceEn}</h3>
              <h3>{detail.SentenceTr}</h3>
            </div>
          ))}

          {currentQuestion.word.Notes.map((detail, i) => (
            <h3 key={i}>{detail}</h3>
          ))}
        </div>
      )}

    </div>
  );
};

export default QuizQuestion;