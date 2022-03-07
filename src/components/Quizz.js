import React from "react"

export default function Quizz(props){

    return(
        <div className="quizz-question">
            <h4>{props.question}</h4>
            <hr/>
        </div>
    )
}