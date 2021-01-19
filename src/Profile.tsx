import { ScreenContainer } from "./ScreenContainer";
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export interface ProfileProps {
    navigation: any;
    profileName: string;
  }

  
export const Profile: React.FC<ProfileProps> = (props) => {
    return (
      <ScreenContainer>
        <Text>{props.profileName}</Text>
      </ScreenContainer>
    );
  };
  