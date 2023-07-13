import React from 'react';
//import ".././index.css";



const Card = ({ card, handleChoise, flipped, disabled }) => {

  const handleClick = () => {
    if (!disabled) {
      handleChoise(card)
    }
  }  


  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img className='front bg-slate-400'
          src={card.src} />
        <img className='back bg-slate-400'
          onClick={handleClick}
          src="/img/ask.png" /> 
      </div>
    </div>
  )
}
export default Card