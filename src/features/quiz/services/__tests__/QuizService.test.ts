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

    it('should shuffle options randomly (robust, non-flaky)', () => {
        const service = new QuizService(mockWords);

        const variants = new Set<string>();
        const runs = 30;

        for (let i = 0; i < runs; i++) {
            const qs = service.getQuestions(1);
            expect(qs.length).toBe(1);

            const opts = qs[0].options;
            // 4 seçenek olmalı
            expect(opts).toHaveLength(4);

            expect(new Set(opts).size).toBe(4);

            expect(opts).toContain(qs[0].correctAnswer);

            variants.add(JSON.stringify(opts));
        }

        expect(variants.size).toBeGreaterThan(1);
    });

    it('should correctly evaluate answers using isAnswerCorrect()', () => {
        const correct = 'kitap';
        expect(QuizService.isAnswerCorrect('kitap', correct)).toBe(true);
        expect(QuizService.isAnswerCorrect('araba', correct)).toBe(false);
    });
});