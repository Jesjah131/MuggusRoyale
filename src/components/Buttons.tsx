import * as React from 'react';
import {TouchableOpacity} from 'react-native';

//Here we can have all sorts of buttons
//TouchableOpactity seems to be the way to go

interface IButtonProps {
  disabled?: boolean;
  onPress: (e: Event) => void;
}

interface IChildrenProps {
  children?: any;
}

export const TriviaAlternativeButton = (
  props: IButtonProps & IChildrenProps,
) => <TouchableOpacity {...props}></TouchableOpacity>;

export const RangeAlternativeButton = (
  props: IButtonProps & IChildrenProps,
) => <TouchableOpacity {...props}></TouchableOpacity>;

export const JoinQuizButton = (props: IButtonProps & IChildrenProps) => (
  <TouchableOpacity {...props}></TouchableOpacity>
);
