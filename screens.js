import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Quiz} from './socketConnector.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

const ScreenContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);

export const Home = ({navigation}) => (
  <ScreenContainer>
    <Text>Muggus Quiz</Text>
    <Button title="Join" onPress={() => navigation.push('Quiz')} />
  </ScreenContainer>
);

export const QuizScreen = () => (
  <ScreenContainer>
    <Quiz></Quiz>
  </ScreenContainer>
);

export const Profile = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Profil</Text>
    </ScreenContainer>
  );
};
