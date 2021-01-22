/**
 * DTO for match starting event
 */
export interface MatchWaitingToStartData {
<<<<<<< HEAD
    playersInMatch: number
=======
  playersInMatch: number;
>>>>>>> master
}

/**
 * DTO for match starting event
 */
<<<<<<< HEAD
export interface MatchStartingData {

}
=======
export interface MatchStartingData {}
>>>>>>> master

/**
 * DTO for joined game event
 */
export interface MatchJoinedData {
<<<<<<< HEAD
    matchId: string,
    matchAvailable: boolean
}
=======
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
>>>>>>> master
