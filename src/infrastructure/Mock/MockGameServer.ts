import {SubEvent} from 'sub-events';
import {GameServer} from '../../entities/server/GameServer';
import { GameServerAnswerData } from '../../entities/server/GameServerAnswerData';
import {
  ServerErrorData,
  ServerCloseConnectionData,
  MatchJoinedData,
  MatchStartingData,
  MatchWaitingToStartData,
  NewRoundData,
} from '../../entities/Server/GameServerEventData';

// A fake implementation of interface above
export default class MockGameServer implements GameServer {
  SubmitAnswer(data: GameServerAnswerData): void {
    throw new Error('Method not implemented.');
  }
  OnNewRound: SubEvent<NewRoundData.RootObject> = new SubEvent();
  Name: string = "Mock game server";
  OnMatchJoined: SubEvent<MatchJoinedData> = new SubEvent();
  OnMatchStarting: SubEvent<MatchStartingData> = new SubEvent();
  OnMatchWaitingToStart: SubEvent<MatchWaitingToStartData> = new SubEvent();
  OnClose: SubEvent<ServerCloseConnectionData> = new SubEvent();
  OnServerError: SubEvent<ServerErrorData> = new SubEvent();

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
