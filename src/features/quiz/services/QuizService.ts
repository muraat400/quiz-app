import type { Word } from "../models/Word";

export class QuizService {
    private questions: Word[];

    constructor(words: Word[]) {
        this.questions = [...words];
        this.shuffle();
    }

    getNextQuestion(): Word | null {
        return this.questions.length > 0 ? this.questions.shift()! : null;
    }

    hasMoreQuestions(): boolean {
        return this.questions.length > 0;
    }

    shuffle():void{
        this.questions = this.questions.sort(() => Math.random() - 0.5);
    }

    getAll(): Word[] {
        return [...this.questions];
    }
}
