import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import './protocol.js';
import './starx-wsclient.js';

export const Quiz = () => {
  const [message, setMessage] = useState([]);
  const [content, setContent] = useState(null);
  const [joined, setJoined] = useState(null);
  const [connected, setConnected] = useState(null);
  const [title, setTitle] = useState(true);
  const [joinButton, setJoinButton] = useState(true);

  const join = (data) => {
    console.log(data);
    if (data.matchAvaliable === false) {
    }
    setJoined('You joined match: ' + data.matchId);
    setContent('Waiting for more players...');
  };

  const onMessage = (msg) => {
    setMessage(msg);
  };

  const init = () => {
    try {
      global.starx.init(
        // web- 127.0.0.1
        // android - 192.168.0.105
        {host: '192.168.0.105', port: 3250, path: '/nano'},
        () => {
          global.starx.on('onMatchWaitingToStart', (data) => {
            console.log(data);
            setConnected('Players connected to match: ' + data.playersInMatch);
          });
          global.starx.on('onMatchStarting', (data) => {
            console.log(data);
            setContent('MATCH IS STARTING');
          });
        },
      );
    } catch (error) {}
  };

  useEffect(() => {
    init();
  });

  const queueGame = () => {
    setJoinButton(false);
    setTitle(false);
    console.log('queueingForGame');
    try {
      global.starx.request('match.queue', {}, join);
    } catch (error) {}
  };

  return (
    <View>
      <TouchableOpacity onPress={queueGame}>
        {joinButton && <Text>Börja</Text>}
      </TouchableOpacity>
      <Text>{connected}</Text>
      <Text>{content}</Text>
      <Text>{joined}</Text>
    </View>
  );
};
