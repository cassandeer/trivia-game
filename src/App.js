import React from "react"
import Start from "./components/Start.js"
import Quizz from "./components/Quizz.js"

export default function App(){

    const [startMenu, setStartMenu] = React.useState(true)
    const [data, setData] = React.useState([])

    function startQuizz(){
        setStartMenu(!startMenu)
    }

    React.useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=5")
                .then(res => res.json())
                .then(quest => setData(quest.results))
            },[startMenu])
    
    console.log(data[0])

    const quizz = data.map( item => {
            return <Quizz question={item.question} />
        })


    return(
    <div>
        {startMenu && <Start startQuizz={startQuizz}/>} 
        {!startMenu && <div className="quizz--font">{quizz}</div>}
    </div>
    )
}