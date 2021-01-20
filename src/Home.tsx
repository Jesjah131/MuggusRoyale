import React from 'react';
import { ScreenContainer } from './ScreenContainer';
import {View, Text, StyleSheet, Button} from 'react-native';

export interface HomeProps {
    navigation: any;
  }

export const Home: React.FC<HomeProps> = (props) => {
    return (
      <ScreenContainer>
        <Text>Muggus Quiz</Text>
        <Button title="Join" onPress={() => props.navigation.push('Quiz')} />
      </ScreenContainer>
    );
  };