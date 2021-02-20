/**
 * DTO for match starting event
 */
export interface MatchWaitingToStartData {
  playersInMatch: number;
}

/**
 * DTO for match starting event
 */
export interface MatchStartingData {}

/**
 * DTOs for joined game event
 */
export interface MatchJoinedData {
  matchId: string;
  matchAvailable: boolean;
}

export declare module RoundEnded {
  export interface OnRoundEnded {
    TotalScore: number;
    Placement: number;
    Cutoff: number;
    Elimintaed: boolean;
    ScoreBoard: ScoreBoard;
  }

  export interface ScoreBoard {}

  export interface PlayerScore {
    playerID: number;
    score: number;
  }
}

export declare module NewRoundData {
  export interface ServerQuestion {
    id: string;
    category: string;
    question: string;
    alternatives: alternatives[];
    correctAnswer: number;
    maxScore: number;
  }

  export interface alternatives {
    alternative: string;
    id: number;
  }

  export interface QuizQuestion extends ServerQuestion {
    alternatives: alternatives[];
    correctAnswer: number;
    maxScore: number;
  }

  export interface RangeQuestion extends ServerQuestion {
    unit: string;
    correctAnswer: number;
    maxScore: number;
  }

  export interface CurrentChallenge {
    round: number;
    type: string;
    questions: ServerQuestion[];
  }

  export interface MatchState {
    TotalPlayers: number;
    PlayersRemaining: number;
    EliminatedPlayers: number;
    ConnectedPlayers: number;
    CurrentRound: number;
    currentChallenge: CurrentChallenge;
    ResponseRouteOpen: boolean;
  }

  export interface RootObject {
    matchState: MatchState;
  }
}

export interface ServerCloseConnectionData {
  code: number;
  isTrusted: boolean;
  reason: string;
}

/**
 * DTO for error
 */
export interface ServerErrorData {
  isTrusted: boolean;
  message: string;
}
