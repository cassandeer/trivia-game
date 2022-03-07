import React from "react"
import Start from "./components/Start.js"
import Quizz from "./components/Quizz.js"

export default function App(){

    const [startMenu, setStartMenu] = React.useState(true)

    function startQuizz(){
        setStartMenu(!startMenu)
    }

    const dataQuizz = fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(quest => console.table(quest.results))
  
    const quizz = dataQuizz.map( data => {
       return <Quizz question={data.question} />
    })

    console.log(quizz)
    
    return(
    <div>
        {startMenu && <Start startQuizz={startQuizz}/>}
    </div>
    )
}

//{!startMenu && quizz}