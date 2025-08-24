import { useState } from 'react';
import { useQuiz } from '../context/useQuiz';
import { QuizService } from '../services/QuizService';
import data from '../../../data/quiz-data.json';

const QuizStart = () => {
  const { dispatch } = useQuiz();
  const [letter, setLetter] = useState(''); // harf seçimi

  const startQuiz = () => {
    const service = new QuizService(data);
    const questions = service.getQuestions(10, letter); // harfe göre filtrelenmiş
    dispatch({ type: 'RESET', payload: questions });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>📚 Welcome To Quiz App!</h1>

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

      <br /><br />

      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizStart;