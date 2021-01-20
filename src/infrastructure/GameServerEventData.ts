// DTO for joining game
export interface MatchWaitingToStartData {
    playersInMatch: number
}

export interface MatchStartingData {

}

export interface MatchJoinedData {
    matchId: string,
    matchAvailable: boolean
}