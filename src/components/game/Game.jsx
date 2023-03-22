import React from 'react'
import { Link } from 'react-router-dom'
import LOGO from '../../assets/main-logo.png'

import './game.css'
import WITHEBOARD from '../../assets/board-white.svg'
import BLACKBOARD from '../../assets/board-black.svg'

import PLAYER1 from '../../assets/player-1.png'
import PLAYER2 from '../../assets/player-2.png'
import { Grid } from '../grid/Grid'
import { usePlay } from './usePlay'
import { Timer } from '../timer/Timer'
import { Winner } from '../winner/Winner'
import { Modal } from '../modal/Modal'

// import PLAYERCPU from '../../assets/player-cpu.png'

const Game = () => {

  const width = window.innerWidth

  const { grid, 
          setNewDisk, 
          player, 
          timerCounter, 
          setTimerCounter, 
          winner, 
          player1Wins, 
          player2Wins, 
          setWhoWins, 
          playAgain,
          wait,
          winnerPos,
          pause,
        setPause } = usePlay()
  
  return (
    <div className='container game-container'>
      <div className='menu__container'>
        <button className='game__button menu__button' onClick={() => setPause(true)}>MENU</button>
        <img className='main__logo' src={LOGO} alt="" />
        <button className='game__button restart__button' onClick={() => playAgain(true)}>RESTART</button>
      </div>

      <div className='game__container'>
        <article className='player__card player-1-card'>
          <img src={PLAYER1} alt="" />
          <h2>PLAYER 1</h2>
          <p>{player1Wins}</p>
        </article>

        <div className='game__board'>

          
          {//<LargeWhiteBoard className='white-board'/>
          //<LargeBlackBoard className='black-board'/>}
          }       
          
          <div className='white-board' style={{ backgroundImage: `url(${WITHEBOARD})`}}></div>
          <div className='black-board' style={{ backgroundImage: `url(${BLACKBOARD})`}}></div>

          <Grid grid={grid} 
                setNewDisk={setNewDisk} 
                winner={winner}
                wait={wait}
                player={player}
                winnerPos={winnerPos}
                width={width}/>

        </div>
    
        <article className='player__card player-2-card'>
          <img src={PLAYER2} alt="" />
          <h2>PLAYER 2</h2>
          <p>{player2Wins}</p>
        </article>

        {!winner && <Timer  timerCounter={timerCounter} 
                            player={player} 
                            setTimerCounter={setTimerCounter}
                            setWhoWins={setWhoWins}
                            pause={pause}/>}

        { winner && !wait && <Winner  winner={winner} 
                                      playAgain={playAgain}/>}
        
      </div>

      

      <div className={ (winner===1) ? 'winner-color winner-red' : ((winner===2)) ? 'winner-color winner-yellow' : 'winner-color'}></div>

      {pause && (
        <Modal setPause={setPause}>
          <div className='modal__content'>
            <p>PAUSE</p>
            <button className='modal__button white-button' onClick={() => setPause(false)}>CONTINUE GAME</button>
            <button className='modal__button white-button' onClick={() => {setPause(false); playAgain(true);}}>RESTART</button>
            <Link to='/' className='modal__button red-button'>QUIT GAME</Link>
          </div>
        </Modal> )
      }

    </div>
  )
}

export {Game}