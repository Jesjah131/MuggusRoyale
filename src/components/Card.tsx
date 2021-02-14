import React from 'react';
import {View} from 'react-native';

//A simple card to wrap text etc
//TODO: more...

export enum Theme {
  Black = 'black',
  White = 'white',
}

interface ICardProps {
  body?: any;
  footer?: any;
  heading?: string;
  theme?: Theme;
}

export const Card = ({
  body,
  footer,
  heading,
  theme = Theme.Black,
}: ICardProps) => {
  return <View></View>;
};
