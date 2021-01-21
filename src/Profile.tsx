import { ScreenContainer } from "./ScreenContainer";
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

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
  