import { SubEvent } from "sub-events";
import { GameServer } from "./GameServer";
import { MatchJoinedData, MatchStartingData, NewRoundData } from "./GameServerEventData";
import { GetQuestionType, LQOnMatchJoined, LQOnNewRound, LQQuestionType } from "./LiveQuizEventData";
import { TriviaQuestion } from "./TriviaQuestion";

/**
 * Business Logic for quiz?
 */
export class LiveQuiz {
    private _gameServer: GameServer;

    public OnMatchJoined: SubEvent<LQOnMatchJoined> = new SubEvent();
    public OnNewRound: SubEvent<LQOnNewRound> = new SubEvent();

    constructor(gameServer: GameServer) {
        this._gameServer = gameServer;
        this._gameServer.OnMatchJoined.subscribe(this.MatchJoined);
        this._gameServer.OnMatchStarting.subscribe(this.MatchStarting);
        this._gameServer.OnNewRound.subscribe(this.NewRound);
    }

    JoinGame() {
        try {
        this._gameServer.Init();
        } catch (error) {
            this.OnMatchJoined.emit({ didJoin:false, errorMessage: error.message });
        }
    }

    /**
     * Event handler for match starting
     * @param data Contains match id and availability
     */
    private MatchJoined(data: MatchJoinedData) {
        console.log('Joined match ' + data.matchId);
        this.OnMatchJoined.emit({ didJoin: true, errorMessage: '' });
    }

    /**
     * Event handler for match starting
     * @param data Contains nothing right now
     */
    private MatchStarting(data: MatchStartingData) {
        console.log('Match starting ' + data);
    }

    /**
     * Event handler for new round
     * @param data Contains information about the next round
     */
    private NewRound(data: NewRoundData.RootObject) {
        console.log('Round ' + data.matchState.CurrentRound + ' began');

        if (data.matchState.CurrentChallenge.type == 'quiz') {

            var quizQuestions = data.matchState.CurrentChallenge.questions as NewRoundData.QuizQuestion[];

            var questionString = quizQuestions[0].question;
            var category = quizQuestions[0].category;
            
            // Todo: Parse alternatives
            var alternatives = data.matchState.CurrentChallenge.questions[0];

            

        }

        this.OnNewRound.emit({ type: GetQuestionType(data.matchState.CurrentChallenge.type) });
    }

    
}