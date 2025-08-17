import { useQuiz } from "../context/QuizContext";
import data from '../../../data/quiz-data.json';

const QuizStart = () => {
    const { dispatch } = useQuiz();

    const startQuiz = () => {
        dispatch({ type: 'RESET', payload: data });
        alert('Quiz has started! Good luck!');
    };

    return (
        <div>
            <h2>📚 Welcome To Quiz App!</h2>
            <button onClick={startQuiz}>Start To Quiz</button>
        </div>
    );
}

export default QuizStart;