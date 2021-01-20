import { SubEvent } from "sub-events";
import { GameServer } from "./GameServer";
import { MatchJoinedData, MatchStartingData, MatchWaitingToStartData } from "./GameServerEventData";

export class NanoGameServer implements GameServer {
    OnMatchJoined: SubEvent<MatchJoinedData> = new SubEvent();
    OnMatchStarting: SubEvent<MatchStartingData> = new SubEvent();
    OnMatchWaitingToStart: SubEvent<MatchWaitingToStartData> = new SubEvent();

    private Starx: any = global.starx;

    Init(): void {
        try {      
            this.Starx.init(
              
              // web- 127.0.0.1
              // android - 192.168.0.105 (or whatever your local IP is)
              {host: '192.168.1.4', port: 3250, path: '/nano'},
              () => {
                
                // Event
                this.Starx.on('onMatchWaitingToStart', (data: MatchWaitingToStartData) => {
                    this.OnMatchWaitingToStart.emit(data);
                    console.log("NANOGAMESERVER: Match waiting to start:" + data);                  
                });

                // Event
                this.Starx.on('onMatchStarting', (data: MatchStartingData) => {
                  this.OnMatchStarting.emit(data);
                    console.log("NANOGAMESERVER: Match starting! " + data);                  
                });
                
              },
            );
          } catch (error) {
            console.log("Error: " + error);
          }
    }

    RequestJoin(): void {
        try {
            this.Starx.request('match.queue', {}, (data: MatchJoinedData) => {
                this.OnMatchJoined.emit(data);
            });
          } catch (error) {}
    }

}