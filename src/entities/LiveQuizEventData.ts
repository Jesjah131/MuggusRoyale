export interface LQOnMatchJoined {
  didJoin: boolean;
  errorMessage: string;
}

export interface LQOnNewRound {
  /**
   * The round type (quiz/range/truefalse)
   */
  type: LQQuestionType;
}

export enum LQQuestionType {
  Trivia,
  Range,
  TrueOrFalse,
  Map,
  Unknown,
}

export function GetQuestionType(type: string): LQQuestionType {
  switch (type) {
    case 'quiz':
      return LQQuestionType.Trivia;
    case 'range':
      return LQQuestionType.Range;
    case 'map':
      return LQQuestionType.Map;
    default:
      return LQQuestionType.Unknown;
  }
}
