import React, {Component} from 'react';
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Белый', id: 3},
                    {text: 'Кпвсеый', id: 4},
                    {text: 'Зеленый', id: 5}
                ]


            },
            {
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswerId: 2,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1703', id: 2},
                    {text: '1701', id: 3},
                    {text: '1812', id: 4},
                    {text: '1813', id: 5}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        console.log(results)
            
        if (question.rightAnswerId === answerId) {
            if(!results[question.id]) {
                results[question.id] = 'success';
            }
            
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            const timeout = window.setTimeout(() => {
                
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    })
                }                
                window.clearTimeout(timeout);
            }, 1000);

            
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            });
        }        
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }
    
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className="Quiz">               
                <div className="QuizWrapper">
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results = {this.state.results}
                                quiz = {this.state.quiz}
                                onRetry = {this.retryHandler}
                            />
                            : <ActiveQuiz 
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                    
                    
                </div>
            </div>
        ) 
    }
}

export default Quiz;