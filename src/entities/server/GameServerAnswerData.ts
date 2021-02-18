/**
 * The data sent to the server when answering a question
 */
export interface GameServerAnswerData {
  matchId: string;
  answer: string;
  questionId: string;
  round: number;
}
