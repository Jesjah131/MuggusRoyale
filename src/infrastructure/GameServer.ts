/* 
    Using SubEvent (https://github.com/vitaly-t/sub-events) to trigger events 

    Not many stars/usages, so needs to be decided if safe to use?
*/
import { SubEvent } from 'sub-events';
import {MatchWaitingToStartData, MatchStartingData, MatchJoinedData} from './GameServerEventData';



// The interface for game server
export interface GameServer {

    OnMatchJoined: SubEvent<MatchJoinedData>
    OnMatchWaitingToStart: SubEvent<MatchWaitingToStartData>
    OnMatchStarting: SubEvent<MatchStartingData>

    // Initialize connection to server
    Init(): void

    // Ask to join a server
    RequestJoin(): void
}

