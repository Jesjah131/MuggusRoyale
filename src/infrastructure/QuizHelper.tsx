import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {PrimaryButton, TriviaAlternativeButton} from '../components/Buttons';
import {NewRoundData} from '../entities/server/GameServerEventData';

//A class to help print Quiz-specific elements

interface IAlternativeProps {
  onPress: (e: string) => void;
  onChangeTextHandler: (e: string) => void;
  rangeValue: string;
  disableButtons?: boolean;
  currentChallenge: NewRoundData.CurrentChallenge;
}

interface IChildrenProps {
  children?: any;
}

export const QuizHelp = (props: IAlternativeProps & IChildrenProps) => {
  const [alternatives, setAlternatives] = useState<NewRoundData.alternatives[]>(
    [],
  );
  const [correctAnswer, setCorrectAnswer] = useState<number>();
  const [category, setCategory] = useState<string>('');
  const [questionId, setQuestionId] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [questions, setQuestions] = useState<NewRoundData.ServerQuestion[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [roundType, setRoundType] = useState<string>('');

  useEffect(() => {
    setCurrentQuestion(0);
    setQuestions(props.currentChallenge.questions);
    setRoundType(props.currentChallenge.type);
    setQuestion(props.currentChallenge.questions[0].question);
    setAlternatives(props.currentChallenge.questions[0].alternatives);
  }, [props.currentChallenge.questions]);

  useEffect(() => {
    if (questions.length > currentQuestion) {
      setQuestion(props.currentChallenge.questions[currentQuestion].question);
      setAlternatives(
        props.currentChallenge.questions[currentQuestion].alternatives,
      );
    }
  }, [currentQuestion]);

  const handleAnswerButtonClicked = () => {
    if (questions.length > currentQuestion) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
    }
  };
  return roundType === 'quiz' ? (
    <View>
      <Text>{question}</Text>
      {alternatives &&
        alternatives.map((item, i) => {
          return (
            <TriviaAlternativeButton
              onPress={() => props.onPress(i.toString())}
              onPressIn={() => handleAnswerButtonClicked()}
              disabled={props.disableButtons}>
              <Text>{item.alternative}</Text>
            </TriviaAlternativeButton>
          );
        })}
    </View>
  ) : roundType === 'range' ? (
    <View>
      <Text>{question}</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(number) => props.onChangeTextHandler(number)}
        value={props.rangeValue}
      />
      <PrimaryButton
        onPress={() => props.onPress(props.rangeValue)}
        onPressIn={() => handleAnswerButtonClicked()}>
        <Text>Jag vill att du svarar</Text>
      </PrimaryButton>
    </View>
  ) : null;
};
