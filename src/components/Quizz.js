import React from "react"

export default function Quizz(props){

    const answers = props.answers.map(item => {
        return <div 
            className= {((props.selectMode) && (props.selection.indexOf(item.id) in props.selection))? "selected--answer": 
                (props.selectMode)? "answer":
                (!props.selectMode && item.answer === props.correctAnswer) ? "good--answer": 
                (!props.selectMode && item.answer != props.correctAnswer && props.selection.indexOf(item.id) in props.selection ) ? "bad--answer":
                "answer"
            }
            onClick={() => {
                props.selectedAnswer(item.id, props.id);
            }}
            > {item.answer}</div>
    })


    return(
        <div className="quizz-question">
            
            <h4>{props.question}</h4>
            <div className="answer--list">{answers}</div>
            <hr className="delimiter"/>
        </div>
    )
}
