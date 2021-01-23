import {SubEvent} from 'sub-events';
import {GameServer} from './GameServer';
import {
  MatchJoinedData,
  MatchStartingData,
  MatchWaitingToStartData,
  Close,
  Error,
} from './GameServerEventData';

/**
 * An implementation communicating with Calle's Nano Web Server
 */
export class NanoGameServer implements GameServer {
  OnMatchJoined: SubEvent<MatchJoinedData> = new SubEvent();
  OnMatchStarting: SubEvent<MatchStartingData> = new SubEvent();
  OnMatchWaitingToStart: SubEvent<MatchWaitingToStartData> = new SubEvent();
  OnClose: SubEvent<Close> = new SubEvent();
  OnError: SubEvent<Error> = new SubEvent();

  private Starx: any = globalThis.starx;

  // Take IP as parameter? Port as well?
  Init(ip: string = ''): void {
    try {
      
      console.log("Nano: init");
      this.Starx.init(
        
        // web- 127.0.0.1
        // android - 192.168.0.105 (or whatever your local IP is)
        {host: '192.168.0.105', port: 3250, path: '/nano'},
        () => {

          console.log("Connected?");

          // Event
          this.Starx.on(
            'onMatchWaitingToStart',
            (data: MatchWaitingToStartData) => {
              this.OnMatchWaitingToStart.emit(data);
            },
          );

          // Event
          this.Starx.on('onMatchStarting', (data: MatchStartingData) => {
            this.OnMatchStarting.emit(data);
            console.log('NANOGAMESERVER: Match starting! ' + data);
          });

          

          // Event close
          this.Starx.on('close', (event: Close) => {
            this.OnClose.emit(event);
            console.log('NANOGAMESERVER: Closing! ' + event);
          });
        },
      );

      // Moved event outside of init, trying
      // Event error
      this.Starx.on('io-error', (event: Error) => {
        this.OnError.emit(event);
        console.log('NANOGAMESERVER: Error! ' + event.message);
      });

    } catch (error) {
      console.log("Not connected?");
      console.log('Error: ' + error);
    }
  }

  RequestJoin(): void {
    try {
      this.Starx.request('match.queue', {}, (data: MatchJoinedData) => {
        this.OnMatchJoined.emit(data);
      });
    } catch (error) {}
  }

  Disconnect(): void {
    try {
      this.Starx.disconnect();
      console.log('disconnected from socket');
    } catch (error) {}
  }
}
