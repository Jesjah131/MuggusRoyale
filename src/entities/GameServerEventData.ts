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

export interface NewRoundData {
  
}

/**
 * DTO for closing connection
 */
export interface Close {
  code: number;
  isTrusted: boolean;
  reason: string;
}

/**
 * DTO for error
 */
export interface Error {
  isTrusted: boolean;
  message: string;
}
