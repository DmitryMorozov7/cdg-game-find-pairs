import React from 'react';
import ".././index.css";



const Card = ({ card, handleChoise, flipped }) => {

  const handleClick = () => {
    handleChoise(card)
  }  


  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img className='front w-full block border-white border-[2px] rounded-md '
          src={card.src} />
        <img className='w-full block border-white border-[2px] rounded-md'
          onClick={handleClick}
          src="/img/ask.png" /> 
      </div>
    </div>
  )
}
export default Card