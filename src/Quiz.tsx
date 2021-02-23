import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import '../protocol';
import {PrimaryButton} from './components/Buttons';
import {TriviaTimer} from './components/Timers';
import {GameServer} from './entities/server/GameServer';
import {
  MatchJoinedData,
  MatchStartingData,
  MatchWaitingToStartData,
  ServerCloseConnectionData,
  ServerErrorData,
  NewRoundData,
  AnswerSubmittedResponse,
} from './entities/Server/GameServerEventData';
import {QuizScreenProps, RootStackParamList} from './navigation/types';
import {ScreenContainer} from './ScreenContainer';
import {ChallengeHelper} from './infrastructure/QuizHelper';
import {GameServerAnswerData} from './entities/server/GameServerAnswerData';

export const QuizScreen = ({navigation, route}: QuizScreenProps) => {
  var server = route.params.server;

  return (
    <ScreenContainer>
      <Quiz server={server} nav={navigation}></Quiz>
    </ScreenContainer>
  );
};

export const Quiz = (props: {
  server: GameServer;
  nav: StackNavigationProp<RootStackParamList, 'Quiz'>;
}) => {
  const [message] = useState<string[]>([]);
  const [content, setContent] = useState<string>('null');
  const [joined, setJoined] = useState<string>('');
  const [connected, setConnected] = useState('');
  const [joinButton, setJoinButton] = useState(true);
  const [trusted, setTrusted] = useState(true);
  const [errorCode, setErrorCode] = useState<number>(0);
  const [matchId, setMatchId] = useState<string>('');
  const [RoundTime, setRoundTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [
    currentChallenge,
    setCurrentChallange,
  ] = useState<NewRoundData.CurrentChallenge>();
  const [challengeActive, setChallengeActive] = useState<boolean>(false);

  var GameServer: GameServer = props.server;

  // Subscribe to events
  GameServer.OnMatchJoined.subscribe((data: MatchJoinedData) => {
    join(data);
  });

  GameServer.OnMatchStarting.subscribe((data: MatchStartingData) => {
    console.log(data);
    setContent('MATCH IS STARTING');
  });

  GameServer.OnMatchWaitingToStart.subscribe(
    (data: MatchWaitingToStartData) => {
      console.log('Match waiting to start:' + data);
      setConnected('Players connected to match: ' + data.playersInMatch);
    },
  );

  GameServer.OnNewRound.subscribe((data: NewRoundData.RootObject) => {
    console.log('New round has started !!:' + data);
    printNewRoundData(data);
    setConnected('Connected players: ' + data.matchState.ConnectedPlayers);
    console.log(data.matchState.currentChallenge.questions[0].alternatives);
    setRoundTime(30);
    setCurrentChallange(data.matchState.currentChallenge);
    setChallengeActive(true);
  });

  const printNewRoundData = (data: NewRoundData.RootObject) => {
    console.log(
      'Current round: ' +
        data.matchState.currentRound +
        '\n' +
        'Connected players: ' +
        data.matchState.ConnectedPlayers +
        '\n' +
        'Current challenge: ' +
        data.matchState.currentChallenge.type +
        '\n' +
        'Current alternatives: ' +
        data.matchState.currentChallenge.questions[0].alternatives +
        '\n',
    );
  };

  GameServer.OnClose.subscribe((event: ServerCloseConnectionData) => {
    if (!event.isTrusted && event.code == 1000) {
      setTrusted(false);
      setErrorCode(event.code);
    }
  });

  GameServer.OnServerError.subscribe((event: ServerErrorData) => {
    if (!event.isTrusted) {
      setTrusted(false);
      // error - lets disconnect from server
      disconnect();
    }
  });

  GameServer.OnAnswerSubmittedResponse.subscribe(
    (data: AnswerSubmittedResponse) => {
      const oldScore = score;
      setScore(oldScore + data.score);
    },
  );

  const join = (data: MatchJoinedData) => {
    console.log(data);
    if (data.matchAvailable === false) {
    }
    setMatchId(data.matchId);
    setJoined('You joined match: ' + data.matchId);
    setContent('Waiting for more players...');
  };

  const init = () => {
    // Game server already initialized
    //GameServer.Init();
  };

  useEffect(() => {
    init();
  });

  const queueGame = () => {
    setJoinButton(false);
    console.log('queueingForGame');
    try {
      GameServer.RequestJoin();
    } catch (error) {}
  };

  const disconnect = () => {
    try {
      GameServer.Disconnect();
    } catch (error) {}
  };

  const answerTriviaQuestion = (
    answer: number,
    questionId: string,
    currentRound: number,
  ) => {
    const answerData: GameServerAnswerData = {
      answer: answer,
      matchId: matchId,
      questionId: questionId,
      round: currentRound,
    };
    try {
      GameServer.SubmitAnswer(answerData);
    } catch (error) {}
  };

  return (
    <View>
      <PrimaryButton onPress={queueGame}>
        {joinButton && <Text>Starta!!</Text>}
      </PrimaryButton>
      <Text>{message}</Text>
      <Text>{trusted ? 'jag är öppenz!!' : 'jag är inte längre öppen!! '}</Text>
      <Text>{`Close reason: ${errorCode}`}</Text>
      <Text>{content}</Text>
      <Text>{connected}</Text>
      <Text>{joined}</Text>
      <TriviaTimer initialSeconds={RoundTime} />
      <Text>{`Poäng: ${score}`}</Text>
      {challengeActive && (
        <ChallengeHelper
          onPress={answerTriviaQuestion}
          currentChallenge={currentChallenge!}
        />
      )}
      <Button title="Nese" onPress={() => props.nav.goBack()} />
    </View>
  );
};
