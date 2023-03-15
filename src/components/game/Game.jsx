import React  from 'react'
import { Link } from 'react-router-dom'
import LOGO from '../../assets/main-logo.png'
import './game.css'
import {ReactComponent as LargeWhiteBoard }from '../../assets/board-white-large.svg'
import {ReactComponent as LargeBlackBoard} from '../../assets/board-black-large.svg'

import PLAYER1 from '../../assets/player-1.png'
import PLAYER2 from '../../assets/player-2.png'
import { Grid } from './Grid'
import { usePlay } from './game'
import { Timer } from './Timer'

// import PLAYERCPU from '../../assets/player-cpu.png'

const Game = () => {

  const {grid, column, row, player, play, timerCounter, setTimerCounter ,updateGrid,changePlayer, setNewDisk} = usePlay()
  
 


  return (
    <div className='container game_container'>
      <div className='menu__container'>
        <Link className='game__button menu__button '>MENU</Link>
        <img className='main__logo' src={LOGO} alt="" />
        <button className='game__button restart__button'>RESTART</button>
      </div>

      <div className='game__container'>
        <article className='player__card player-1-card'>
          <img src={PLAYER1} alt="" />
          <h2>PLAYER 1</h2>
          <p>0</p>
        </article>

        <div className='game__board'>

          <LargeWhiteBoard className='white-board'/>
          <LargeBlackBoard className='black-board'/>
          
          <Grid grid={grid} 
                column={column} 
                row={row} play={play} 
                updateGrid={updateGrid} 
                changePlayer={changePlayer} 
                setNewDisk={setNewDisk} />

        </div>
    
        <article className='player__card player-2-card'>
          <img src={PLAYER2} alt="" />
          <h2>PLAYER 2</h2>
          <p>0</p>
        </article>

      <Timer timerCounter={timerCounter} player={player} setTimerCounter={setTimerCounter}/>
        
      </div>

      <div className='winner-color'></div>

    </div>
  )
}

export default Game