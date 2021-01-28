// Once again: https://reactnavigation.org/docs/typescript/
// Check this out: https://stackoverflow.com/questions/63124951/how-can-i-type-check-reactnavigations-navigation-using-navigationhelperscommon

import { StackScreenProps } from "@react-navigation/stack";
import { GameServer } from "../entities/server/GameServer";

/**
 * This defines the params for each screen
 */
export type RootStackParamList = {
  Home: undefined;
  Quiz: { server: GameServer };
  Profile: { username: string };
};

export type QuizScreenProps = StackScreenProps<RootStackParamList, 'Quiz'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;