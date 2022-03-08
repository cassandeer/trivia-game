import React from "react"

export default function Quizz(props){

    let shuffledAnswerList = props.answers.sort(function(a,b){return Math.random() - 0.5})

    console.log(shuffledAnswerList)
    /*.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)*/

    const answers = props.answers.map(item => {
        return <div 
            className={item.id in props.selection? "selected--answer":"answer" }
            onClick={() => props.selectAnswer(item.id)}
            > {item.answer}</div>
    })

    //console.log(answers)

    return(
        <div className="quizz-question">
            <h4>{props.question}</h4>
            <div className="answer--list">{answers}</div>
            <hr className="delimiter"/>
        </div>
    )
}