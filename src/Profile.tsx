import {ScreenContainer} from './ScreenContainer';
import React from 'react';
import {Text} from 'react-native';
import {ProfileScreenProps} from './navigation/types';

export const Profile = (props: ProfileScreenProps) => {
  return (
    <ScreenContainer>
      <Text>{props.route.params?.username}</Text>
    </ScreenContainer>
  );
};
