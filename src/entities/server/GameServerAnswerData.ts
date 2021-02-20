/**
 * The data sent to the server when answering a question
 */
export interface GameServerAnswerData {
  matchId: string;
  answer: number;
  questionId: string;
  round: number;
}
