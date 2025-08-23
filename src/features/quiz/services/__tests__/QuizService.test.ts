import { QuizService } from '../QuizService';
import type { Word } from '../../models/Word';

const mockWords: Word[] = [
    {
        Id: 1,
        English: 'book',
        Turkish: ['kitap'],
        Sentence: [{ SentenceEn: 'I read a book.', SentenceTr: 'Bir kitap okudum.' }],
        Pronunciation: 'book',
        Notes: [],
    },
    {
        Id: 2,
        English: 'car',
        Turkish: ['araba'],
        Sentence: [{ SentenceEn: 'The car is fast.', SentenceTr: 'Araba hızlı.' }],
        Pronunciation: 'car',
        Notes: [],
    },
    {
        Id: 3,
        English: 'house',
        Turkish: ['ev'],
        Sentence: [{ SentenceEn: 'This is my house.', SentenceTr: 'Bu benim evim.' }],
        Pronunciation: 'house',
        Notes: [],
    },
    {
        Id: 4,
        English: 'tree',
        Turkish: ['ağaç'],
        Sentence: [{ SentenceEn: 'That tree is tall.', SentenceTr: 'O ağaç uzun.' }],
        Pronunciation: 'tree',
        Notes: [],
    }
];

describe('QuizService', () => {
    it('should generate the same number of quiz questions as words', () => {
        const service = new QuizService(mockWords);
        const questions = service.getQuestions();

        expect(questions).toHaveLength(mockWords.length);
    });

    it('should generate 4 options per question (1 correct + 3 wrong)', () => {
        const service = new QuizService(mockWords);
        const questions = service.getQuestions();

        questions.forEach((q) => {
            expect(q.options).toHaveLength(4);
            expect(q.options).toContain(q.correctAnswer);
        });
    });

    it('should shuffle options randomly', () => {
        const service1 = new QuizService(mockWords);
        const service2 = new QuizService(mockWords);

        const q1Options = service1.getQuestions()[0].options;
        const q2Options = service2.getQuestions()[0].options;

        // There's a small chance this could fail randomly if the shuffle gives same result
        expect(q1Options).not.toEqual(q2Options);
    });

    it('should correctly evaluate answers using isAnswerCorrect()', () => {
        const correct = 'kitap';
        expect(QuizService.isAnswerCorrect('kitap', correct)).toBe(true);
        expect(QuizService.isAnswerCorrect('araba', correct)).toBe(false);
    });
});