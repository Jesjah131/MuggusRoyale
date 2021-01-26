import { StackNavigationProp } from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Button} from 'react-native';
import '../protocol';
import {GameServer} from './entities/GameServer';
import {
  MatchJoinedData,
  MatchStartingData,
  MatchWaitingToStartData,
  ServerCloseConnectionData,
  ServerErrorData,
  NewRoundData,
} from './entities/GameServerEventData';
import {QuizScreenProps, RootStackParamList} from './navigation/types';
import {ScreenContainer} from './ScreenContainer';

export const QuizScreen = ({navigation, route}: QuizScreenProps) => {
  var server = route.params.server;

  return (
    <ScreenContainer>
      <Quiz server={server} nav={navigation}></Quiz>
    </ScreenContainer>
  );
};

export const Quiz = (props: {server: GameServer, nav: StackNavigationProp<RootStackParamList, 'Quiz'>}) => {
  const [message] = useState<string[]>([]);
  const [content, setContent] = useState<string>('null');
  const [joined, setJoined] = useState<string>('');
  const [connected, setConnected] = useState('');
  const [joinButton, setJoinButton] = useState(true);
  const [trusted, setTrusted] = useState(true);
  const [errorCode, setErrorCode] = useState<number>(0);

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
    setConnected(
      'Fråga nummer ett! : ' +
        data.matchState.CurrentChallenge.questions[0].question +
        'Connected players: ' +
        data.matchState.ConnectedPlayers,
    );
  });

  const printNewRoundData = (data: NewRoundData.RootObject) => {
    console.log(
      'Current round: ' + data.matchState.CurrentRound + '\n' +
      'Connected players: ' + data.matchState.ConnectedPlayers + '\n' +
      'Current challenge: ' + data.matchState.CurrentChallenge.type + '\n'

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

  const join = (data: MatchJoinedData) => {
    console.log(data);
    if (data.matchAvailable === false) {
    }
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

  return (
    <View>
      <Text>Nesen</Text>
      <TouchableOpacity onPress={queueGame}>
        {joinButton && <Text>Börja</Text>}
      </TouchableOpacity>
      <Text>{message}</Text>
      <Text>{trusted ? 'jag är öppenz!!' : 'jag är inte längre öppen!! '}</Text>
      <Text>{`Close reason: ${errorCode}`}</Text>
      <Text>{content}</Text>
      <Text>{connected}</Text>
      <Text>{joined}</Text>
      <Text>Hallå</Text>
      <Button title="Nese" onPress={() => props.nav.goBack()}></Button>
    </View>
  );
};
