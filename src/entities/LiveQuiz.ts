import {SubEvent} from 'sub-events';
import {GameServer} from './GameServer';
import {
  MatchJoinedData,
  MatchStartingData,
  NewRoundData,
} from './GameServerEventData';
import {
  GetQuestionType,
  LQOnMatchJoined,
  LQOnNewRound,
  LQQuestionType,
} from './LiveQuizEventData';
import {Question} from './questions/Question';
import {
  TriviaQuestion,
  TriviaQuestionAlternative,
} from './questions/TriviaQuestion';

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
      this.OnMatchJoined.emit({didJoin: false, errorMessage: error.message});
    }
  }

  /**
   * Event handler for match starting
   * @param data Contains match id and availability
   */
  private MatchJoined(data: MatchJoinedData) {
    console.log('Joined match ' + data.matchId);
    this.OnMatchJoined.emit({didJoin: true, errorMessage: ''});
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

    var type = GetQuestionType(data.matchState.CurrentChallenge.type);

    var question: Question;

    switch (type) {
      case LQQuestionType.Trivia:
        // Parse question as trivia question
        var quizQuestions = data.matchState.CurrentChallenge.questions as NewRoundData.QuizQuestion[];
        var questionString = quizQuestions[0].question;
        var category = quizQuestions[0].category;
        var alternatives: TriviaQuestionAlternative[] = new Array();
        for (let i = 0; i < quizQuestions[0].alternatives.length; i++) {
          const alternative = quizQuestions[0].alternatives[i];
          alternatives.push(
            new TriviaQuestionAlternative(
              alternative,
              i === quizQuestions[0].correctAnswer,
            ),
          );
        }

        question = new TriviaQuestion(
          quizQuestions[0].id,
          questionString,
          category,
          alternatives,
        );

        break;

        case LQQuestionType.Range:
            var rangeQuestions = data.matchState.CurrentChallenge.questions as NewRoundData.RangeQuestion[];

        default:
            throw Error;
    }

    this.OnNewRound.emit({
      type: GetQuestionType(data.matchState.CurrentChallenge.type),
      question: question
    });
  }
}
