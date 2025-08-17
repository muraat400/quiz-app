export interface Word {
  Id: number;
  English: string;
  Turkish: string[];
  Sentence: {
    SentenceEn: string;
    SentenceTr: string;
  }[];
  Pronunciation: string;
  Notes: string[];
  options?: string[];
  correctAnswer?: string;
}