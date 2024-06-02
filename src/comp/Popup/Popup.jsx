import React from 'react'
import './Popup.css'
const Popup = ({gameover,winplayer, reset}) => {
    if (!gameover) {
        return
    }
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Congratulations! {winplayer}</h2>
        <p> you WON!!</p>
        <button onClick={reset}>Play Again</button>
      </div>
    </div>
  )
}

export default Popup;
