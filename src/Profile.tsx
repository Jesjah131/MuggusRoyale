import { ScreenContainer } from "./ScreenContainer";
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { RootStackParamList } from "./App";
import { StackNavigationProp } from "@react-navigation/stack";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
  >;

export interface ProfileProps {
    navigation: any;
    profileName: string;
  }

  
export const Profile = (props: ProfileProps) => {
    return (
      <ScreenContainer>
        <Text>{props.profileName}</Text>
      </ScreenContainer>
    );
  };
  