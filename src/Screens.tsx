import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Quiz} from '../socketConnector.js';

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

// Todo: Understand how this should be written in TypeScript
// https://reactnavigation.org/docs/typescript/

/* From: https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets

Functional component with props:
type AppProps = { message: string }; - could also use interface
const App = ({ message }: AppProps) => <div>{message}</div>;

*/

export interface ContainerProps {
  children: any;
}

export interface HomeProps {
  navigation: any;
}

export interface ProfileProps {
  navigation: any;
  profileName: string;
}

export interface QuizProps {}

const ScreenContainer = ({children}: ContainerProps) => (
  <View style={styles.container}>{children}</View>
);

export const Home: React.FC<HomeProps> = (props) => {
  return (
    <ScreenContainer>
      <Text>Muggus Quiz</Text>
      <Button title="Join" onPress={() => props.navigation.push('Quiz')} />
    </ScreenContainer>
  );
};

export const QuizScreen: React.FC<QuizProps> = () => {
  return (
    <ScreenContainer>
      <Quiz></Quiz>
    </ScreenContainer>
  );
};

export const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <ScreenContainer>
      <Text>{props.profileName}</Text>
    </ScreenContainer>
  );
};
