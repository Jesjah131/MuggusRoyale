import { StackNavigationProp } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import '../protocol';
<<<<<<< HEAD
import { RootStackParamList } from './App';
=======
>>>>>>> master
import {GameServer} from './infrastructure/GameServer';
import {
  MatchJoinedData,
  MatchStartingData,
  MatchWaitingToStartData,
<<<<<<< HEAD
=======
  Close,
  Error,
>>>>>>> master
} from './infrastructure/GameServerEventData';
import {ServerFactory} from './infrastructure/ServerFactory';
import {ScreenContainer} from './ScreenContainer';

export interface QuizProps {}

<<<<<<< HEAD
type QuizScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Quiz'
  >;

=======
>>>>>>> master
export const QuizScreen = (props: QuizProps) => {
  return (
    <ScreenContainer>
      <Quiz></Quiz>
    </ScreenContainer>
  );
};

export const Quiz = () => {
<<<<<<< HEAD
  const [message, setMessage] = useState(['']);
  const [content, setContent] = useState('');
  const [joined, setJoined] = useState('');
  const [connected, setConnected] = useState('');
  const [title, setTitle] = useState(true);
  const [joinButton, setJoinButton] = useState(true);

  const GameServer: GameServer = ServerFactory.GetServer();

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
=======
  const [message, setMessage] = useState<string[]>([]);
  const [content, setContent] = useState<string>('null');
  const [joined, setJoined] = useState<string>('');
  const [connected, setConnected] = useState('');
  const [joinButton, setJoinButton] = useState(true);
  const [trusted, setTrusted] = useState(true);
  const [errorCode, setErrorCode] = useState<number>(0);

  const GameServer: GameServer = ServerFactory.GetServer();

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
>>>>>>> master

  const join = (data: MatchJoinedData) => {
    console.log(data);
    if (data.matchAvailable === false) {
    }
    setJoined('You joined match: ' + data.matchId);
    setContent('Waiting for more players...');
  };

<<<<<<< HEAD
  const onMessage = (msg: string[]) => {
    setMessage(msg);
  };

=======
>>>>>>> master
  const init = () => {
    GameServer.Init();
  };

  useEffect(() => {
    init();
  });

  const queueGame = () => {
    setJoinButton(false);
    console.log('queueingForGame');
    try {
      GameServer.RequestJoin();
<<<<<<< HEAD
=======
    } catch (error) {}
  };

  const disconnect = () => {
    try {
      GameServer.Disconnect();
>>>>>>> master
    } catch (error) {}
  };

  return (
    <View>
      <TouchableOpacity onPress={queueGame}>
        {joinButton && <Text>Börja</Text>}
      </TouchableOpacity>
      <Text>{message}</Text>
      <Text>{trusted ? 'jag är öppen!!' : 'jag är inte längre öppen!! '}</Text>
      <Text>{`Close reason: ${errorCode}`}</Text>
      <Text>{content}</Text>
      <Text>{connected}</Text>
      <Text>{joined}</Text>
    </View>
  );
};
