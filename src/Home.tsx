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

  var quizProps: QuizProps = { navigation: navigation, server: ServerFactory.GetServer() }

  return (
    <ScreenContainer>
      <Text>Muggus Quiz</Text>
      <Button title="Join" onPress={() => navigation.navigate('Quiz')} />
    </ScreenContainer>
  );
};
