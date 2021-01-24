import React from 'react';
import {ScreenContainer} from './ScreenContainer';
import {Text, Button} from 'react-native';
import {ServerFactory} from './infrastructure/ServerFactory';
import {HomeScreenProps} from './navigation/types';

export const Home = ({navigation}: HomeScreenProps) => {
  var server = ServerFactory.GetServer();
  server.Init();

  // I don't know what useLayoutEffect is but it seems to work
  // https://reactnavigation.org/docs/header-buttons/
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Profile', { username: "Muggus 'Meze' Mats" })}
          title="Profile"></Button>
      ),
    });
  });

  return (
    <ScreenContainer>
      <Text>Muggus Quiz</Text>
      <Button
        title="Join"
        onPress={() => {
          console.log('Server in Home button:' + server.Name);
          navigation.navigate('Quiz', {server: server});
        }}
      />
    </ScreenContainer>
  );
};
