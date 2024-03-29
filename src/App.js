import React,{ useState, useEffect } from "react"
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
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    //to launch the very first game
    function startQuizz(){
        setStartMenu(!startMenu)
        setStartGame(prevGame => !prevGame)
    }

    //API call and data downloading
    React.useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=3&encode=base64")
            .then(res => res.json())
            .then(quest => setRawData(quest.results))
        console.log(rawData)    
        
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

    //to get the score when clicking on "check answers" button
    React.useEffect(() =>{
        getScore()
    },[selectMode])

    //set selection state with all selected values
    function selectedAnswer(id, questionId){
        if(selectMode){
            for(const element of data){
                if(element.id === questionId){
                    const allAnswers = element.allAnswers
                    for(const item of allAnswers){
                        if(selection.indexOf(item.id) in selection && !(selection.indexOf(id) in selection)){
                            setSelection(prevSelection => prevSelection.filter(sel => sel !== item.id))
                            setSelection(prevSelection => prevSelection.concat(id))
                        }
                    } 
                if(selection.indexOf(id) in selection){
                    setSelection(prevSelection => prevSelection.filter(sel => sel !== id))
                }
                else{
                    setSelection(prevSelection => prevSelection.concat(id))
                }}
            }
        }         
    }

    //to set up Quizz components
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
    
    //to freeze answer selection when checking answers  
    function clickCheckAnswers(){
        setSelectMode(false)
    }

    //function to calculate the score
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

    //function to launch a new game by resetting all states
    function playAgain(){
        setStartGame(prevGame => !prevGame)
        setSelection([])
        setScore(0)
        setSelectMode(true)
        
    }
      
    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
        
    return(
        <div>
            {startMenu && 
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height,
                    width: width
                }}>
                    <Start startQuizz={startQuizz}/>
                </div>
            }
            {!selectMode && (score>1) && <Confetti />}
            {!startMenu && 
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height,
                    width: width
                }}>
                    <div className="quizz--font">
                        {quizz}
                        {selectMode && <button className="quizz--button" onClick={clickCheckAnswers}><h3>Check answers</h3></button>}
                        {!selectMode && 
                            <div className="footer">
                            <button className="quizz--button" onClick={playAgain} ><h3>Play again</h3></button>
                            <p>Your score: {score}/3</p></div>
                        }
                    </div>
                </div>    
            }
        </div>
    )
}
