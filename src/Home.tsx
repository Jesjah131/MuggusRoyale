import React from 'react';
import {ScreenContainer} from './ScreenContainer';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import { ServerFactory } from './infrastructure/ServerFactory';
import { HomeScreenNavigationProp, QuizProps, RootStackParamList } from './navigation/types';

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const Home = ({navigation}: Props) => {

  var server = ServerFactory.GetServer();
  server.Init();

  // I don't know what useLayoutEffect is but it seems to work
  // https://reactnavigation.org/docs/header-buttons/
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Profile')}
          title="Profile"></Button>
      )
    });
  });
  
  return (
    <ScreenContainer>
      <Text>Muggus Quiz</Text>
      <Button title="Join" onPress={() => navigation.navigate('Quiz', { server: server })} />
    </ScreenContainer>
  );
};
