import React from "react"
import Start from "./components/Start.js"
import Quizz from "./components/Quizz.js"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App(){

    const [startGame, setStartGame] = React.useState(true)
    const [startMenu, setStartMenu] = React.useState(true)
    const [rawData, setRawData] = React.useState([])
    const [data, setData] = React.useState([])
    const [selection, setSelection] = React.useState([])
    const [selectMode, setSelectMode] = React.useState(true)
    const [score, setScore] = React.useState(0)

    function startQuizz(){
        setStartMenu(!startMenu)
        setStartGame(prevGame => !prevGame)
    }

    React.useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=3&encode=base64")
            .then(res => res.json())
            .then(quest => setRawData(quest.results))
        
        setData(() =>  rawData.map(item => ({
            ...item,
            correct_answer: window.atob(item.correct_answer),
            correct_answer_id: nanoid(),
            id: nanoid(),
            allAnswers: [].concat(item.incorrect_answers.map(element => ({
                answer: window.atob(element),
                id: nanoid(),
            }))),
        })))

        setData(prevData => prevData.map(item => ({
            ...item,
            allAnswers: item.allAnswers.concat({answer: item.correct_answer, id: item.correct_answer_id})
        })))
        
        setData(prevData => prevData.map(item => ({
            ...item,
            allAnswers: item.allAnswers.sort(function(a,b){return Math.random() - 0.5})
        })))
        
    }, [startGame])

    React.useEffect(() =>{
        getScore()
    },[selectMode])

    console.log(data)

    function selectedAnswer(id, questionId){

        if(selectMode){
            for(const element of data){
                if(element.id === questionId){
                    const allAnswers = element.allAnswers

                for(const item of allAnswers){
                    if(selection.indexOf(item.id) in selection && !(selection.indexOf(id) in selection)){
                            setSelection(prevSelection => prevSelection.filter(sel => sel != item.id))
                            setSelection(prevSelection => prevSelection.concat(id))
                    }
                } 
                if(selection.indexOf(id) in selection){
                        setSelection(prevSelection => prevSelection.filter(sel => sel != id))
                    }
                    else{
                        setSelection(prevSelection => prevSelection.concat(id))
                    } 
                }
            }}         
    }

    const quizz = data.map(item => {
            return <Quizz 
                key={item.id}
                id = {item.id} 
                question={window.atob(item.question)}
                correctAnswer={item.correct_answer}
                answers={item.allAnswers}
                selectedAnswer={selectedAnswer}
                selection={selection}
                selectMode={selectMode}
            />
        })
    
    function clickCheckAnswers(){
        setSelectMode(false)
    }

    function getScore(){
        for(const element of selection){
            for(const item of data){
                if(element === item.correct_answer_id){
                    setScore(prevScore => prevScore + 1)
                }
            }
        }
        return score
    }

    function playAgain(){
        setRawData([])
        setData([])
        setSelection([])
        setScore(0)
        setSelectMode(true)
        setStartGame(prevGame => !prevGame)
    }
    console.log(data)    
    return(
    <div>
        {startMenu && <Start startQuizz={startQuizz}/>}
        {!selectMode && <Confetti />}
        {!startMenu && 
            <div className="quizz--font">
                {quizz}
                { selectMode && <button className="quizz--button" onClick={clickCheckAnswers}><h3>Check answers</h3></button>}
                { !selectMode && 
                    <div className="footer">
                    <button className="quizz--button" onClick={playAgain} ><h3>Play again</h3></button>
                    <p>Your score: {score}/3</p></div>
                }
            </div>
        }
    </div>
    )
}
