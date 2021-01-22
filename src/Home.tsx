import React from 'react';
import { ScreenContainer } from './ScreenContainer';
import {View, Text, StyleSheet, Button} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
  >;

  type Props = {
    navigation: HomeScreenNavigationProp;
  }

<<<<<<< HEAD

export const Home = ({ navigation }: Props) => {
=======
export const Home = (props: HomeProps) => {
>>>>>>> master
    return (
      <ScreenContainer>
        <Text>Muggus Quiz</Text>
        <Button title="Join" onPress={() => navigation.navigate('Quiz')} />
      </ScreenContainer>
    );
  };