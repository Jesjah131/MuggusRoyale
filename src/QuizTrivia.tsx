import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { LiveQuiz } from './entities/LiveQuiz';
import { TriviaQuestion } from './entities/questions/TriviaQuestion'
import { Quiz } from './Quiz';

export interface Props {
    quiz: LiveQuiz;
    triviaQuestion: TriviaQuestion
}

export class QuizTrivia extends Component<Props> {
    

    constructor(params: Props) {
        super(params);
    }

    answer(choice: number) {
        //this.props.quiz.Answer(choice):
    }

    render() {

        var tq = this.props.triviaQuestion;

        return (
            <View>
                <Text>{tq.Question}</Text>
                <Button title={tq.Alternatives[0].Alternative} onPress={() => this.answer(tq.Alternatives.indexOf(tq.Alternatives[0]))}></Button>
            </View>
        )
    }
}

export default QuizTrivia

