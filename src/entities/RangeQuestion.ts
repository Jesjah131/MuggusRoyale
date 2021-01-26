import {Question} from './Question';

/**
 * A question where the task is to guess a number
 */
export class RangeQuestion implements Question {
  Id: string;
  Question: string;
  Category: string;
  Unit: string;
  CorrectAnswer: number;

  constructor(
    id: string,
    question: string,
    category: string,
    unit: string,
    correctAnswer: number,
  ) {
    this.Id = id;
    this.Question = question;
    this.Category = category;
    this.Unit = unit;
    this.CorrectAnswer = correctAnswer;
  }
}
