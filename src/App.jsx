import { useEffect, useState } from 'react';
import './index.css';
import Card from './components/Card';
import bascet from './img/basketball.png'
import box from './img/box.png'
import baseball from './img/baseball.png'
import football from './img/football.png'
import judo from './img/judo.png'
import pingpong from './img/ping-pong.png'
import volleyball from './img/volleyball.png'
import tennis from './img/tennis.png'

const cardImages = [
  { 'src': bascet, matched: false },
  { 'src': box, matched: false },
  { 'src': baseball, matched: false },
  { 'src': football, matched: false },
  { 'src': judo, matched: false },
  { 'src': pingpong, matched: false },
  { 'src': volleyball, matched: false },
  { 'src': tennis, matched: false },
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiseOne, setChoiseOne] = useState(null)
  const [choiseTwo, setChoiseTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  

  const shufleCards = () => {
    const shufledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiseOne(null)
      setChoiseTwo(null)
      setCards(shufledCards)
      setTurns(0)
  }

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
  }


  useEffect(() => {

    if (choiseOne && choiseTwo) {
      setDisabled(true)

      if (choiseOne.src === choiseTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiseOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(),  700)
      }
    }
  }, [choiseOne, choiseTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shufleCards()
  }, [])


  return (
    <div className='max-w-[660px] py-[40px] mx-auto'>
      <h1 className='text-white font-bold text-3xl'>FIND PAIRS GAME</h1>
      <button onClick={shufleCards} className='bg-none border-2 border-white py-[6px] px-[12px] rounded-[4px] text-white font-bold cursor-pointer text-[1rem] hover:bg-red-400 mt-[1rem]'
      >New Game</button>
      <p className='text-white font-bold text-3xl mt-5'>Moves: {turns}</p>

      <div className='mt-[40px] grid grid-cols-4 gap-[20px]'>
        {cards.map(card => (
          <Card 
            key = {card.id} 
            card = {card}
            handleChoise = {handleChoise}
            flipped = { card === choiseOne || card === choiseTwo || card.matched }
            disabled = { disabled }
          />
        ))}
      </div>
    </div>
  )
}

export default App
