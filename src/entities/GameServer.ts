/* 
    Using SubEvent (https://github.com/vitaly-t/sub-events) to trigger events 

    Not many stars/usages, so needs to be decided if safe to use?
*/
import {SubEvent} from 'sub-events';
import {
  Error,
  Close,
  MatchWaitingToStartData,
  MatchStartingData,
  MatchJoinedData,
  NewRoundData,
} from './GameServerEventData';

/**
 * The interface for game server
 */
export interface GameServer {
  /**
   * Event fired when joined match
   */
  OnMatchJoined: SubEvent<MatchJoinedData>;

  /**
   * Event fired when waiting for match to start (each time a new player joins?)
   */
  OnMatchWaitingToStart: SubEvent<MatchWaitingToStartData>;

  /**
   * Event fired when match starting
   */
  OnMatchStarting: SubEvent<MatchStartingData>;

  /**
   * Event fired when new round starts 
   */
  OnNewRound: SubEvent<NewRoundData>;

  /**
   * Event fired on socket closing
   */
  OnClose: SubEvent<Close>;

  /**
   * Event fired on socket error (io-error)
   */
  OnError: SubEvent<Error>;

  /**
   * Initialize connection to server
   * @remarks
   * Do this in constructor?
   */
  Init(): void;

  /**
   * Ask to join a server
   */
  RequestJoin(): void;

  /**
   * Ask to disconnect from server
   */
  Disconnect(): void;

  /**
   * The server name (can be used for debugging purposes)
   */
  Name: string;
}
