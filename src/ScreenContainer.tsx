import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export interface ContainerProps {
  children: any;
}

export const ScreenContainer = ({children}: ContainerProps) => (
  <View style={styles.container}>{children}</View>
);

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
