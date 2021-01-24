import {SubEvent} from 'sub-events';
import {GameServer} from '../../entities/GameServer';
import {
  Error,
  Close,
  MatchJoinedData,
  MatchStartingData,
  MatchWaitingToStartData,
  NewRoundData,
} from '../../entities/GameServerEventData';

// A fake implementation of interface above
export default class MockGameServer implements GameServer {
  OnNewRound: SubEvent<NewRoundData.RootObject> = new SubEvent();
  Name: string = "Mock game server";
  OnMatchJoined: SubEvent<MatchJoinedData> = new SubEvent();
  OnMatchStarting: SubEvent<MatchStartingData> = new SubEvent();
  OnMatchWaitingToStart: SubEvent<MatchWaitingToStartData> = new SubEvent();
  OnClose: SubEvent<Close> = new SubEvent();
  OnError: SubEvent<Error> = new SubEvent();

  Init(): void {
    throw new Error('Method not implemented.');
  }

  RequestJoin(): void {
    // Do stuff, then:
    this.OnMatchWaitingToStart.emit({playersInMatch: 99});
  }

  Disconnect(): void {
    throw new Error('Method not implemented.');
  }
}
