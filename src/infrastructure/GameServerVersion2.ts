/* 
    Using SubEvent (https://github.com/vitaly-t/sub-events) to trigger events 

    Not many stars/usages, so needs to be decided if safe to use?
*/
import { SubEvent } from 'sub-events';

interface JoinData {
    date: number,
    player: string,

}

// The interface for game server
export interface GameServer2 {
    OnJoin: SubEvent<JoinData>

    // Ask to join a server
    Join(): void
}

// A fake implementation of interface above
export class FakeGameServer2 implements GameServer2 {
    OnJoin: SubEvent<JoinData> = new SubEvent();

    Join(): void {
        // Do stuff, then:
        this.OnJoin.emit({ date: Date.now(), player: "Muggus Massus" });   
    }
}

// An example of a consumer of game server (might be a React Component?)
export class FakeConsumer {

    private _server: GameServer2

    constructor() {
        this._server = GameServer2Factory.GetServer();
        
        this._server.Join();

        // Subscribe to event
        this._server.OnJoin.subscribe(this.OnJoin);
    }

    // Called when server fires OnJoin 
    private OnJoin(data: JoinData) {
        console.log(data.player + " joined the game [" + data.date + "]");
    }
}

// Simple factory
export class GameServer2Factory {
    static GetServer() : GameServer2 {
        return new FakeGameServer2();
    }
}
