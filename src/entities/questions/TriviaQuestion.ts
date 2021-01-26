import {Question} from './Question';

/**
 * TriviaQuestion is a question with four different alternatives
 */
export class TriviaQuestion implements Question {
  Id: string;
  Question: string;
  Category: string;
  Alternatives: TriviaQuestionAlternative[];

  constructor(
    id: string,
    question: string,
    category: string,
    alternatives: TriviaQuestionAlternative[],
  ) {
    this.Id = id;
    this.Question = question;
    this.Category = category;
    this.Alternatives = alternatives;
  }
}

export class TriviaQuestionAlternative {
  Alternative: string;
  IsCorrect: boolean;

  constructor(alternative: string, isCorrect: boolean) {
    this.Alternative = alternative;
    this.IsCorrect = isCorrect;
  }
}
