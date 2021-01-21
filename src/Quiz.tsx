import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import '../protocol';
import {GameServer} from './infrastructure/GameServer';
import {
  MatchJoinedData,
  MatchStartingData,
  MatchWaitingToStartData,
  Close,
} from './infrastructure/GameServerEventData';
import {ServerFactory} from './infrastructure/ServerFactory';
import {ScreenContainer} from './ScreenContainer';

export interface QuizProps {}

export const QuizScreen = (props: QuizProps) => {
  return (
    <ScreenContainer>
      <Quiz></Quiz>
    </ScreenContainer>
  );
};

export const Quiz = () => {
  const [message, setMessage] = useState<string[]>([]);
  const [content, setContent] = useState<string>('null');
  const [joined, setJoined] = useState<string>('');
  const [connected, setConnected] = useState('');
  const [title, setTitle] = useState(true);
  const [joinButton, setJoinButton] = useState(true);
  const [trusted, setTrusted] = useState(true);

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
    if(event.isTrusted === false){
      setTrusted(false);
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
    GameServer.Init();
  };

  useEffect(() => {
    init();
  });

  const queueGame = () => {
    setJoinButton(false);
    setTitle(false);
    console.log('queueingForGame');
    try {
      GameServer.RequestJoin();
    } catch (error) {}
  };

  return (
    <View>
      <TouchableOpacity onPress={queueGame}>
        {joinButton && <Text>Börja</Text>}
      </TouchableOpacity>
      <Text>{message}</Text>
      <Text>{trusted ? "jag är öppen!!" : "jag är inte längre öppen!!"}</Text>
      <Text>{content}</Text>
      <Text>{connected}</Text>
      <Text>{joined}</Text>
    </View>
  );
};
