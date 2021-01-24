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

/**
 * DTO for closing connection
 */
export interface Close {
  code: number;
  isTrusted: boolean;
  reason: string;
}

export interface Error {
  isTrusted: boolean;
  message: string;
}
