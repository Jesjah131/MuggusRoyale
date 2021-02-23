import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {PrimaryButton, TriviaAlternativeButton} from '../components/Buttons';
import {ChallengeTimer} from '../components/Timers';
import {NewRoundData} from '../entities/server/GameServerEventData';

/**A class to help print Quiz-specific elements**/

interface IAlternativeProps {
  onPress: (answer: number, questionId: string, currentRound: number) => void;
  currentChallenge: NewRoundData.CurrentChallenge;
}

interface IChildrenProps {
  children?: any;
}

/**Takes care of an active Challenge**/
export const ChallengeHelper = (props: IAlternativeProps & IChildrenProps) => {
  const [alternatives, setAlternatives] = useState<NewRoundData.alternatives[]>(
    [],
  );
  const [correctAnswer, setCorrectAnswer] = useState<number>();
  const [category, setCategory] = useState<string>('');
  const [maxScore, setMaxScore] = useState<number>(0);
  const [questions, setQuestions] = useState<NewRoundData.ServerQuestion[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [roundType, setRoundType] = useState<string>('');
  const [rangeValue, setRangeValue] = useState<string>('');

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

  const handleAnswerButtonClicked = (answer: string) => {
    //answer to server
    props.onPress(
      parseInt(answer, 10),
      questions[currentQuestion].id,
      props.currentChallenge.round,
    );

    //play next question on current round
    if (questions.length > currentQuestion) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
    }
  };

  if (questions.length === currentQuestion) {
    return <Text>Väntar på motståndare...</Text>;
  }

  return (
    <View>
      <Text>{question}</Text>
      <ChallengeTimer initialSeconds={30}></ChallengeTimer>
      {roundType === 'quiz' ? (
        <View>
          {alternatives &&
            alternatives.map((item, i) => {
              return (
                <TriviaAlternativeButton
                  key={i}
                  onPress={() => handleAnswerButtonClicked(i.toString())}>
                  <Text>{item.alternative}</Text>
                </TriviaAlternativeButton>
              );
            })}
        </View>
      ) : roundType === 'range' ? (
        <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(number) => setRangeValue(number)}
            value={rangeValue}
          />
          <PrimaryButton onPress={() => handleAnswerButtonClicked(rangeValue)}>
            <Text>Jag vill att du svarar</Text>
          </PrimaryButton>
        </View>
      ) : null}
    </View>
  );
};
