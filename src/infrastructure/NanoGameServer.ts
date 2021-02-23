import {SubEvent} from 'sub-events';
import {GameServer} from '../entities/server/GameServer';
import {GameServerAnswerData} from '../entities/server/GameServerAnswerData';
import {
  MatchJoinedData,
  MatchStartingData,
  MatchWaitingToStartData,
  ServerCloseConnectionData,
  ServerErrorData,
  NewRoundData,
  AnswerSubmittedResponse,
  RoundEnded,
} from '../entities/Server/GameServerEventData';

/**
 * An implementation communicating with Calle's Nano Web Server
 */
export class NanoGameServer implements GameServer {
  constructor() {
    this.OnMatchJoined = new SubEvent();
    this.OnMatchStarting = new SubEvent();
  }

  Name: string = 'Nano game server';

  OnMatchJoined: SubEvent<MatchJoinedData>; // = new SubEvent();
  OnMatchStarting: SubEvent<MatchStartingData>; //= new SubEvent();
  OnMatchWaitingToStart: SubEvent<MatchWaitingToStartData> = new SubEvent();
  OnClose: SubEvent<ServerCloseConnectionData> = new SubEvent();
  OnServerError: SubEvent<ServerErrorData> = new SubEvent();
  OnNewRound: SubEvent<NewRoundData.RootObject> = new SubEvent();
  OnRoundEnded: SubEvent<RoundEnded.OnRoundEnded> = new SubEvent();
  OnAnswerSubmittedResponse: SubEvent<AnswerSubmittedResponse> = new SubEvent();

  private Starx: any = globalThis.starx;

  // Take IP as parameter? Port as well?
  Init(ip: string = ''): void {
    try {
      console.log('Nano: init');
      this.Starx.init(
        // web- 127.0.0.1
        // android - 192.168.0.105 (or whatever your local IP is)
        {host: '192.168.0.105', port: 3250, path: '/nano'},
        () => {
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
          this.Starx.on('close', (event: ServerCloseConnectionData) => {
            this.OnClose.emit(event);
            console.log('NANOGAMESERVER: Closing! ' + event);
          });

          this.Starx.on('onNewRound', (data: NewRoundData.RootObject) => {
            this.OnNewRound.emit(data);
            console.log(
              'NANOGAMESERVER: New round!! ' +
                data.matchState.currentChallenge.questions[0].question,
            );
          });

          this.Starx.on('onRoundEnded', (data: RoundEnded.OnRoundEnded) => {
            this.OnRoundEnded.emit(data);
            console.log(
              'NANOGAMESERVER: Round ended!! ' +
                data.totalScore +
                data.eliminated,
            );
          });
        },
      );

      // Moved event outside of init, trying
      // Event error
      this.Starx.on('io-error', (event: ServerErrorData) => {
        this.OnServerError.emit(event);
        console.log('NANOGAMESERVER: Error! ' + event.message);
      });
    } catch (error) {
      console.log('Not connected?');
      console.log('Error: ' + error);
      throw error;
    }

    console.log('nano return');
  }

  SubmitAnswer(answer: GameServerAnswerData): void {
    try {
      console.log(
        'vi svarar i gameservern: ' +
          answer.answer +
          ' ' +
          answer.matchId +
          ' ' +
          answer.questionId +
          ' ' +
          answer.round,
      );
      this.Starx.request(
        'match.questionresponse',
        answer,
        (data: AnswerSubmittedResponse) => {
          console.log('Servern svarar oss med: ' + data.score);
          this.OnAnswerSubmittedResponse.emit(data);
        },
      );
    } catch (error) {
      console.log('gick det dåligt i servern?');
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
