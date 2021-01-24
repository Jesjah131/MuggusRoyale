import { StackNavigationProp } from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Button} from 'react-native';
import '../protocol';
import {GameServer} from './entities/GameServer';
import {
  MatchJoinedData,
  MatchStartingData,
  MatchWaitingToStartData,
  Close,
  Error,
  NewRoundData,
} from './entities/GameServerEventData';
import {QuizScreenProps, RootStackParamList} from './navigation/types';
import {ScreenContainer} from './ScreenContainer';

export const QuizScreen = ({navigation, route}: QuizScreenProps) => {
  var server = route.params.server;
  console.log("va");
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
    setConnected(
      'Fråga nummer ett! : ' +
        data.matchState.CurrentChallenge.questions[0].question,
    );
  });

  GameServer.OnClose.subscribe((event: Close) => {
    if (!event.isTrusted && event.code == 1000) {
      setTrusted(false);
      setErrorCode(event.code);
    }
  });

  GameServer.OnError.subscribe((event: Error) => {
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
      <TouchableOpacity onPress={queueGame}>
        {joinButton && <Text>Börja</Text>}
      </TouchableOpacity>
      <Text>{message}</Text>
      <Text>{trusted ? 'jag är öppenz!!' : 'jag är inte längre öppen!! '}</Text>
      <Button title="Nese" onPress={() => props.nav.goBack()}></Button>
      <Text>{`Close reason: ${errorCode}`}</Text>
      <Text>{content}</Text>
      <Text>{connected}</Text>
      <Text>{joined}</Text>
      <Text>Hallå</Text>
    </View>
  );
};
