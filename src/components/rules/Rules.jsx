import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as OK} from '../../assets/ok.svg'
import './rules.css'

const Rules = () => {
  return (
    <div className='rules__container'>
        <div className='rules__content'>
            <h1>RULES</h1>
         
            <h2>OBJECTIVE</h2>
            <p>Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).</p>
            <h2>HOW TO PLAY</h2>
            <ol>
                <li> <span> 1 </span>  Red goes first in the first game.</li>
                <li> <span> 2 </span> Players must alternate turns, and only one disc can be dropped in each turn.</li>
                <li> <span> 3 </span>The game ends when there is a 4-in-a-row or a stalemate.</li>
                <li> <span> 4 </span>The starter of the previous game goes second on the next game.</li>
            </ol>
            
            <Link to='/' className='ok-button'><OK height='100%' width='100%' /></Link>
        </div>
    </div>
  )
}

export {Rules}