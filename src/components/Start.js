import React from "react"

export default function Start(props){

    return(
        <div className="start--menu">
            <h1>Trivia game</h1>
            <p className="start--description">This game is just a simple quizz. If you are ready, click on the button below.</p>
            <button className="quizz--button" onClick={props.startQuizz}><h3>Start quizz</h3></button>
        </div>
    )
}