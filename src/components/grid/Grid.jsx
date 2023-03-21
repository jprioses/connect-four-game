import React, {useState} from 'react'
import {ReactComponent as PLAYER2DISK} from '../../assets/player-2-disk.svg'
import {ReactComponent as PLAYER1DISK} from '../../assets/player-1-disk.svg'
import {ReactComponent as MARKER1} from '../../assets/marker-1.svg'
import {ReactComponent as MARKER2} from '../../assets/marker-2.svg'
import {ReactComponent as WINNERCIRCLE} from '../../assets/winner-circle.svg'

import { motion } from 'framer-motion'
import './grid.css'

const Grid = ({grid,setNewDisk, winner, wait, player, winnerPos}) => {

    const [hover, setHover] = useState(null)

    const gridPositionRow = [16,104,192,280,368,456]
    const gridPositionColumn = [18,105,193,281,369,457,545]

    const renderDisk = () => {
        let counter = 0
        return grid.map((arrayRow, rowIndex) => {
            return arrayRow.map((array, columnIndex) => {
                counter += 1
                if (array=== 1) {
                    return (<motion.svg className='disk' animate={{top: [0,gridPositionRow[rowIndex]], transition:{duration:0.5}}} key={counter} style={{ left: gridPositionColumn[columnIndex]}}><PLAYER1DISK height='100%' width='100%'/></motion.svg>)
                }
                else if (array=== 2) {
                    return (<motion.svg className='disk' animate={{top:[0, gridPositionRow[rowIndex]], transition:{duration:0.5}}} key={counter} style={{ left: gridPositionColumn[columnIndex]}}><PLAYER2DISK height='100%' width='100%'/></motion.svg>)
                }else {return (null) }})
            })   
    }

    const hoverMark = () => {
        if (player === 1) return (<svg className='marker' style={{left: gridPositionColumn[hover] + 15}}> <MARKER1 height='40' width='40'/> </svg>)
        else if (player === 2) return (<svg className='marker' style={{left: gridPositionColumn[hover] + 15}}> <MARKER2 height='40' width='40'/> </svg>)
    }

    const renderWinner = () => {
        return winnerPos.map((pos, index) => {
            return (<svg key={index} className='winner-circle' style={{left: gridPositionColumn[pos[1]] +14, top: gridPositionRow[pos[0]] +16}} ><WINNERCIRCLE height='40' width='40'/></svg>)
        })
    }

  return (
    <>
        <svg className='column column-1' onMouseOver={() => setHover(0)} onClick={() =>  {  if (!winner && !wait) setNewDisk(0) }}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>
        
        <svg className='column column-2' onMouseOver={() => setHover(1)} onClick={() =>  { if (!winner && !wait) setNewDisk(1)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-3' onMouseOver={() => setHover(2)} onClick={() =>  {if (!winner && !wait) setNewDisk(2)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-4' onMouseOver={() => setHover(3)} onClick={() =>  {if (!winner && !wait) setNewDisk(3)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-5' onMouseOver={() => setHover(4)} onClick={() =>  {if (!winner && !wait) setNewDisk(4)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-6' onMouseOver={() => setHover(5)} onClick={() =>  {if (!winner && !wait) setNewDisk(5)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-7' onMouseOver={() => setHover(6)} onClick={() =>  {if (!winner && !wait) setNewDisk(6)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        { renderDisk()}
        {!wait && !winner && hover!=null && hoverMark()}
        {!wait && winnerPos && renderWinner()}
           
    </>
    
  )
}

export  {Grid}