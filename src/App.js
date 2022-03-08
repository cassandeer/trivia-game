import React from "react"
import Start from "./components/Start.js"
import Quizz from "./components/Quizz.js"
import {nanoid} from "nanoid"

export default function App(){

    const [startGame, setStartGame] = React.useState(true)
    const [startMenu, setStartMenu] = React.useState(true)
    const [rawData, setRawData] = React.useState([])
    const [data, setData] = React.useState([])

    function startQuizz(){
        setStartMenu(!startMenu)
    }

    React.useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=1&encode=base64")
                .then(res => res.json())
                .then(item => item.results.map( element => ({
                    ...element,
                    id: nanoid()
                })))
                .then(quest => setRawData(quest.results))
        
        /*setData(() =>  rawData.map(item => ({
            ...item,
            id: nanoid(),
            allAnswers: null,
        })))

        setData(oldData => oldData.map( item =>({
            ...item,
            allAnswers: item.incorrect_answers.map(proposition => ({
                answer: window.atob(proposition),
                isSelected: false,
                id: nanoid(),}))
                .push({answer: window.atob(item.correct_answer), isSelected: false, id: nanoid()}),

        })))*/
            },[startGame])

    
    console.log(rawData)
    
    
    const quizz = data.map(item => {
            return <Quizz 
                key={item.id} 
                question={window.atob(item.question)}
                correctAnswer={window.atob(item.correct_answer)}
            />
        })

    return(
    <div>
        {startMenu && <Start startQuizz={startQuizz}/>} 
        {!startMenu && 
            <div className="quizz--font">
                {quizz}
                <button className="quizz--button"><h3>Check answers</h3></button>
            </div>
        }
    </div>
    )
}
