import React from "react"
import Dice from "./Dice"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice, faStopwatch, faRotateLeft, faPlay } from '@fortawesome/free-solid-svg-icons'
import Leaderboard from "./Leaderboard"


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [win, setWin] = React.useState(false)
  const [roundCount, setRoundCount] = React.useState(0)
  const [countTime, setCountTime] = React.useState(0)
  const [intervalId, setIntervalId] = React.useState(0)
  const [result, setResults] = React.useState(
    JSON.parse(localStorage.getItem("results")) || []
  )
  const [mainPage, setMainPage] = React.useState(true)

  function allNewDice() {
    const dice = []
    for(let i = 0; i < 10; i++) {
      dice.push(newDie())
    }
    return dice
  }

  function newDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false
    }
  }

  function rollDice() {
    if(roundCount === 0) {
      const newInterval = setInterval(() => {
        setCountTime(prevTime => prevTime + 1)
      }, 1000);
      setIntervalId(newInterval)
    }

    setRoundCount(prevRoundCount => prevRoundCount + 1)

    setDice(prevDice => prevDice.map(die => !die.isHeld ? newDie() : die))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : {...die}))
  }

  function newGame() {
    clearInterval(intervalId)
    setIntervalId(0)
    setRoundCount(0)
    setCountTime(0)
    setWin(false)
    setDice(allNewDice())
  }

  function createResult() {
    const newResult = {
      rounds: roundCount,
      time: countTime
    }
    setResults(prevResults => [...prevResults, newResult])
  }

  function showResults() {
    setMainPage(!mainPage)
  }

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameValues = dice.every(die => dice[0].value === die.value)
    if(allHeld && allSameValues) {
      createResult()
      setWin(true)
      clearInterval(intervalId)
      setIntervalId(0)
    } 
  }
  , [dice])

  React.useEffect(() => {
    localStorage.setItem("results", JSON.stringify(result))
  }, [win])

  const diceElements = dice.map(die => 
    <Dice 
      key={die.id}
      value={die.value}
      handleClick={() => !win && holdDice(die.id)}
      isHeld={die.isHeld}
    />
  )
  
  return (
    <main>
      {win && <Confetti />}
      <div className="container">

        {mainPage && <FontAwesomeIcon icon={faPlay} className="fa--icon_small play" onClick={newGame}/>}
        <FontAwesomeIcon icon={faRotateLeft} className="fa--icon_small" onClick={showResults}/>

        {
          mainPage ? 
          <div className="game--container">
            <div className="text">
              <h1>Tenzies</h1>
              <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="stats--container">
              <div className="stats">
                <FontAwesomeIcon icon={faDice} className="fa--icon"/>
                <p>{roundCount}</p>
              </div>
              <div className="stats">
                <FontAwesomeIcon icon={faStopwatch} className="fa--icon"/>
                <p>{countTime}</p>
              </div>
            </div>
            <div className="dice--container">
              {diceElements}
            </div>
            <button onClick={win ? newGame : rollDice}>{win ? "New Game" : "Roll"}</button> 
          </div>
          :
          <Leaderboard results={result}/>
        }

      </div>
    </main>
  );
}

export default App;
