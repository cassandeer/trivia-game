import React from "react"
import Start from "./components/Start.js"
import Quizz from "./components/Quizz.js"
import {nanoid} from "nanoid"

export default function App(){

    const [startGame, setStartGame] = React.useState(true)
    const [startMenu, setStartMenu] = React.useState(true)
    const [rawData, setRawData] = React.useState([])
    const [data, setData] = React.useState([])
    const [selection, setSelection] = React.useState([])

    function startQuizz(){
        setStartMenu(!startMenu)
    }

    React.useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=1&encode=base64")
            .then(res => res.json())
            .then(quest => setRawData(quest.results))
        
        setData(() =>  rawData.map(item => ({
            ...item,
            id: nanoid(),
            allAnswers: [].concat(item.incorrect_answers.map(element => ({
                answer: window.atob(element),
                id: nanoid(),
            }))).concat({answer: window.atob(item.correct_answer), id: nanoid()}),
        })))
    }, [startMenu])

    
    console.log(data)

    function selectAnswer(id){
        setSelection(prevSelection => (id in prevSelection)?
            prevSelection.splice(prevSelection.indexOf(id, 1)) :
            prevSelection.concat(id)      
        )
    }
    
    
    const quizz = data.map(item => {
            return <Quizz 
                key={item.id} 
                question={window.atob(item.question)}
                correctAnswer={window.atob(item.correct_answer)}
                answers={item.allAnswers}
                selectAnswer={selectAnswer}
                selection={selection}
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
