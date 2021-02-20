import * as React from 'react';
import {Text, TextInput, View} from 'react-native';
import {PrimaryButton, TriviaAlternativeButton} from '../components/Buttons';
import {NewRoundData} from '../entities/server/GameServerEventData';

//A class to help print Quiz-specific elements

interface IAlternativeProps {
  alternatives: NewRoundData.alternatives[];
  roundType: string;
  onPress: (e: Event) => void;
  onChangeTextHandler: (e: string) => void;
  rangeValue: string;
}

interface IChildrenProps {
  children?: any;
}

export const QuizHelp = (props: IAlternativeProps & IChildrenProps) => {
  console.log('kukarsson i TriviaButtons: ' + props.alternatives);
  return props.roundType === 'quiz' ? (
    <View>
      {props.alternatives &&
        props.alternatives.map((item, i) => {
          return (
            <TriviaAlternativeButton onPress={props.onPress}>
              <Text>{item.alternative}</Text>
            </TriviaAlternativeButton>
          );
        })}
    </View>
  ) : (
    <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(number) => props.onChangeTextHandler(number)}
        value={props.rangeValue}
      />
      <PrimaryButton onPress={() => props.onPress(props.rangeValue)}>
        <Text>Jag vill att du svarar</Text>
      </PrimaryButton>
    </View>
  );
};
