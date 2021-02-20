import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

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
) => (
  <TouchableOpacity {...props} style={styles.TriviaStyle}></TouchableOpacity>
);

export const RangeAlternativeButton = (
  props: IButtonProps & IChildrenProps,
) => <TouchableOpacity {...props}></TouchableOpacity>;

export const PrimaryButton = (props: IButtonProps & IChildrenProps) => (
  <TouchableOpacity {...props} style={styles.buttonStyle}></TouchableOpacity>
);

export const SecondaryButton = (props: IButtonProps & IChildrenProps) => (
  <TouchableOpacity {...props}></TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 0,
    backgroundColor: 'red',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  TriviaStyle: {
    flex: 0,
    backgroundColor: 'green',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});
