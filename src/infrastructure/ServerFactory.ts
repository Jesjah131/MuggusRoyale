import { GameServer } from "./GameServer";
import MockGameServer from "./Mock/MockGameServer";
import { NanoGameServer } from "./NanoGameServer";

// Simple factory
export class ServerFactory {
    static GetServer() : GameServer {
        if (true)
            return new NanoGameServer();
        else
            return new MockGameServer();
    }
}
