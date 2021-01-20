export {}
/* Removing when trying the other approach

// DTO with appropriate information about joining players
export type PlayerJoinedData = {
    info: string
}

// Interface defining the events on which the game server consumer (delegate) might want to take action
export interface GameServerDelegate {
    OnPlayerJoined: (data: PlayerJoinedData) => void
}

// The game server interface
export interface GameServer {
    delegate: GameServerDelegate;

    Join(): void;
    Disconnect(): void;
}

// A fake implementation of game server
export class MockGameServer implements GameServer {
    
    delegate: GameServerDelegate;

    constructor(delegate: GameServerDelegate) {
        // Do stuff
        this.delegate = delegate;
    }

    Join(): void {
        // Do stuff
        this.playerJoined();
    }
    Disconnect(): void {
        // Do stuff
        // this.playerDisconnected();
    }

    playerJoined() {
        var playerName = "Muggus Massus";
        this.delegate.OnPlayerJoined({info: {playerName} + "joined"});
    }
}

// An example of a consumer of game server (might be a React Component?)
export class ServerConsumer implements GameServerDelegate {
    
    private _server: GameServer;

    constructor() {
        this._server = ServerFactory.GiveMeAGameServer(this);
    }

    // Maybe called from button or similar
    RequestJoin() {
        this._server.Join();
    }

    // Called when _server fires it (hopefully?)
    OnPlayerJoined(data: PlayerJoinedData) {
        // Update state
    }
}

// An example of a server factory
export class ServerFactory {
    static GiveMeAGameServer(delegate: GameServerDelegate) : GameServer {
        return new MockGameServer(delegate);
    }
}
*/
