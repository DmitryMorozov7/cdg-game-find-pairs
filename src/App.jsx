import { useEffect, useState } from 'react';
import './index.css';
import Card from './components/Card';

const cardImages = [
  { 'src': '/img/basketball.png', matched: false },
  { 'src': '/img/box.png', matched: false },
  { 'src': '/img/baseball.png', matched: false },
  { 'src': '/img/football.png', matched: false },
  { 'src': '/img/judo.png', matched: false },
  { 'src': '/img/ping-pong.png', matched: false },
  { 'src': '/img/tennis.png', matched: false },
  { 'src': '/img/volleyball.png', matched: false },
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiseOne, setChoiseOne] = useState(null)
  const [choiseTwo, setChoiseTwo] = useState(null)

  const shufleCards = () => {
    const shufledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setCards(shufledCards)
      setTurns(0)
  }

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
  }


  useEffect(() => {
    if (choiseOne && choiseTwo) {

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
        console.log('not match')
        resetTurn()
      }
    }
  }, [choiseOne, choiseTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }


  return (
    <div className='max-w-[860px] py-[40px] mx-auto'>
      <h1 className='text-white font-bold text-3xl'>FIND PAIRS GAME</h1>
      <button onClick={shufleCards} className='bg-none border-2 border-white py-[6px] px-[12px] rounded-[4px] text-white font-bold cursor-pointer text-[1rem] hover:bg-red-400 mt-[1rem]'
      >New Game</button>

      <div className='mt-[40px] grid grid-cols-4 gap-[20px]'>
        {cards.map(card => (
          <Card 
            key = {card.id} 
            card = {card}
            handleChoise = {handleChoise}
            flipped = { card === choiseOne || card === choiseTwo || card.matched }
          />
        ))}
      </div>
    </div>
  )
}

export default App
