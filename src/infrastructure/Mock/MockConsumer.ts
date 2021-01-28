import { GameServer } from "../../entities/server/GameServer";
import { MatchJoinedData, MatchStartingData, MatchWaitingToStartData } from "../../entities/Server/GameServerEventData";
import { ServerFactory } from "../ServerFactory";

// An example of a consumer of game server (might be a React Component?)
export class FakeConsumer {

    private _server: GameServer

    constructor() {
        this._server = ServerFactory.GetServer();
        
        this._server.RequestJoin();

        // Subscribe to event
        this._server.OnMatchWaitingToStart.subscribe(this.OnMatchWaitingToStart);
    }

    // Called when server fires OnJoin 
    private OnMatchWaitingToStart(data: MatchWaitingToStartData) {
        
    }
}
