import { SubEvent } from "sub-events";
import { GameServer } from "./GameServer";
import { MatchJoinedData } from "./GameServerEventData";
import { LQOnMatchJoined } from "./LiveQuizEventData";

/**
 * Business Logic for quiz?
 */
export class LiveQuiz {
    private _gameServer: GameServer;

    public OnMatchJoined: SubEvent<LQOnMatchJoined> = new SubEvent();    

    constructor(gameServer: GameServer) {
        this._gameServer = gameServer;
        this._gameServer.OnMatchJoined.subscribe(this.MatchJoined);
    }

    JoinGame() {
        try {
        this._gameServer.Init();
        } catch (error) {
            this.OnMatchJoined.emit({ didJoin:false, errorMessage: error.message });
        }
    }

    /**
     * Event handler for matched joined
     */
    private MatchJoined(data: MatchJoinedData) {
        console.log('Joined match ' + data.matchId);
        this.OnMatchJoined.emit({ didJoin: true, errorMessage: '' });
    }

    
}