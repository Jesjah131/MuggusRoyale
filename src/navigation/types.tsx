// Once again: https://reactnavigation.org/docs/typescript/
// Check this out: https://stackoverflow.com/questions/63124951/how-can-i-type-check-reactnavigations-navigation-using-navigationhelperscommon

import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { GameServer } from "../infrastructure/GameServer";

/**
 * This defines the params for each screen
 */
export type RootStackParamList = {
  Home: undefined;
  Quiz: { server: GameServer };
  Profile: undefined;
};

export type Props = StackScreenProps<RootStackParamList, 'Quiz'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


/*
export interface QuizProps {
  navigation: QuizScreenNavigationProp;
  server: GameServer;
}*/
