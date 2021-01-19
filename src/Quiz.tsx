import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import '../protocol';
import * as Starx from '../starx-wsclient';



interface JoinData {
  matchId: string;
  matchAvailable: boolean;
}

interface MatchWaitingToStartData {
  playersInMatch: number;
}

interface MatchStartingData {

}

export const Quiz = () => {
  const [message, setMessage] = useState<string[]>([]);
  const [content, setContent] = useState<string>("null");
  const [joined, setJoined] = useState<string>("");
  const [connected, setConnected] = useState("");
  const [title, setTitle] = useState(true);
  const [joinButton, setJoinButton] = useState(true);

  const join = (data: JoinData) => {
    console.log(data);
    if (data.matchAvailable === false) {
    }
    setJoined('You joined match: ' + data.matchId);
    setContent('Waiting for more players...');
  };

  const onMessage = (msg: string[]) => {
    setMessage(msg);
  };


  const init = () => {
    console.log("init");
    try {
      
      global.starx.init(
        
        // web- 127.0.0.1
        // android - 192.168.0.105
        {host: '192.168.1.4', port: 3250, path: '/nano'},
        () => {
          
          //console.log("Starx?" + starx);
          global.starx.on('onMatchWaitingToStart', (data: MatchWaitingToStartData) => {
            console.log("Match waiting to start:" + data);
            setConnected('Players connected to match: ' + data.playersInMatch);
          });
          global.starx.on('onMatchStarting', (data: MatchStartingData) => {
            console.log(data);
            setContent('MATCH IS STARTING');
          });
          console.log("Skit ner dig")
        },
      );
    } catch (error) {
      console.log("Error: " + error);
    }

    

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
