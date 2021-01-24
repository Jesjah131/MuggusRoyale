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
 * DTO for joined game event
 */
export interface MatchJoinedData {
  matchId: string;
  matchAvailable: boolean;
}

export declare module NewRoundData {
  export interface Question {
    id: string;
    question: string;
    unit: string;
    category: string;
    correctAnswer: number;
    maxScore: number;
  }

  export interface CurrentChallenge {
    round: number;
    type: string;
    questions: Question[];
  }

  export interface MatchState {
    TotalPlayers: number;
    PlayersRemaining: number;
    ElimintaedPlayers: number;
    ConnectedPlayers: number;
    CurrentRound: number;
    CurrentChallenge: CurrentChallenge;
    ResponseRouteOpen: boolean;
  }

  export interface RootObject {
    matchState: MatchState;
  }
}

export interface Close {
  code: number;
  isTrusted: boolean;
  reason: string;
}

export interface Error {
  isTrusted: boolean;
  message: string;
}
