import * as React from 'react';
import {View} from 'react-native';
import {RoundTimer, TriviaTimer} from '../components/Timers';

//A class to help print information-specific elements

interface ITimerProps {
  initialSeconds: number;
  initialMinute?: number;
}

export const InformationHelp = (props: ITimerProps) => {
  console.log({...props});
  return (
    <View>
      <TriviaTimer {...props} />
    </View>
  );
};
