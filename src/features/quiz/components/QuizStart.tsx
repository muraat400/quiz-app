import { useState } from 'react';
import { useQuiz } from '../context/useQuiz';
import { QuizService } from '../services/QuizService';
import data from '../../../data/quiz-data.json';

const QuizStart = () => {
  const { dispatch } = useQuiz();
  const [letter, setLetter] = useState('');
  const [limit, setLimit] = useState(100);

  const startQuiz = () => {
    const service = new QuizService(data);
    const questions = service.getQuestions(limit, letter);
    dispatch({ type: 'RESET', payload: questions, letter, limit });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>📚 Welcome To Quiz App!</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Select a letter:
          <select
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            style={{ marginLeft: '8px' }}
          >
            <option value="">All</option>
            {'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('').map((char) => (
              <option key={char} value={char}>
                {char}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Number of questions:
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{ marginLeft: '8px' }}
          >
            <option value="">All</option>
            {[50, 100, 150, 200, 250, 300].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizStart;