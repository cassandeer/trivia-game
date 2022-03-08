import React from "react"

export default function Quizz(props){

    let shuffledAnswerList = props.answers
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    const answers = shuffledAnswerList.map(item => {
        return <div className="answer" >{item.answer}</div>
    })

    console.log(answers)

    return(
        <div className="quizz-question">
            <h4>{props.question}</h4>
            <div className="answer--list">{answers}</div>
            <hr className="delimiter"/>
        </div>
    )
}