import React from 'react';
import AnswerItem from './AnswerItem/AnswerItem';
import './AnswerList.css';

const AnswerList = props => (
    <ul className="AnswerList">        
        {props.answers.map((answer, index)=>{            
            return (<AnswerItem 
                key={index}
                answer={answer}
                onAnswerClick={props.onAnswerClick}
                state={props.state ? props.state[answer.id] : null}
            />)
        })} 
    </ul>
)

export default AnswerList;