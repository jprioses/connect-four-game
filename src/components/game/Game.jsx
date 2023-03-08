import React from 'react'
import { Link } from 'react-router-dom'
import LOGO from '../../assets/main-logo.png'
import './game.css'
import {ReactComponent as LargeWhiteBoard }from '../../assets/board-white-large.svg'
import {ReactComponent as LargeBlackBoard} from '../../assets/board-black-large.svg'
import timer from '../../assets/timer-1.svg'
import PLAYER1 from '../../assets/player-1.png'
import PLAYER2 from '../../assets/player-2.png'
import { Timer } from './Timer'
// import PLAYERCPU from '../../assets/player-cpu.png'

const Game = () => {
  return (
    <div className='container game_container'>
      <div className='menu__container'>
        <Link className='game__button menu__button '>MENU</Link>
        <img className='main__logo' src={LOGO} alt="" />
        <button className='game__button restart__button'>RESTART</button>
      </div>

      <div className='game'>
        <article className='player__card player-1-card'>
          <img src={PLAYER1} alt="" />
          <h2>PLAYER 1</h2>
          <p>0</p>
        </article>

        <div className='game__board'>
          <LargeWhiteBoard className='white-board'/>
          <LargeBlackBoard className='black-board'/>
        </div>
    
        <article className='player__card player-2-card'>
          <img src={PLAYER2} alt="" />
          <h2>PLAYER 2</h2>
          <p>0</p>
        </article>
      </div>

      <div className='winner-color'></div>

     <div className='timer__container' style={{ backgroundImage: `url(${timer})` }}>
        <h2>PLAYER 1'S TURN</h2>
        <p>30s</p>
     </div>
     
      
      
      
    </div>
  )
}

export default Game