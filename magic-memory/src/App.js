import { useState, useEffect } from 'react'
import Card from "./components/Card"
import './App.css'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]

export default function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle 12 cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - .5)
      .map(card => ({
        ...card, 
        id: Math.random(),
        matched: false
      }))
      
    setCards(shuffledCards)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  // compare the two cards that were flipped
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetChoices = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => shuffleCards(), [])

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        setCards(prevCards => prevCards.map(card => {
          if(choiceOne.src === card.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        }))
        resetChoices()
      } else {
        setTimeout(() => {
          resetChoices()
        }, 1000)
      }
    }
  }
  , [choiceOne, choiceTwo])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='game-grid'>
        {cards.map(card => 
          <Card  
            key={card.id} 
            handleChoice={handleChoice} 
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />)}
      </div>
      <div>Turns: {turns}</div>
    </div>
  );
}
