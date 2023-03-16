import React from 'react'
import {ReactComponent as PLAYER2DISK} from '../../assets/player-2-disk.svg'
import {ReactComponent as PLAYER1DISK} from '../../assets/player-1-disk.svg'
import { motion } from 'framer-motion'
import './grid.css'

const Grid = ({grid,setNewDisk, winner}) => {

    const gridPositionRow = [16,104,192,280,368,456]
    const gridPositionColumn = [18,105,193,281,369,457,545]

    const renderDisk = () => {
        let counter = 0
        return grid.map((arrayRow, rowIndex) => {
            return arrayRow.map((array, columnIndex) => {
                counter += 1
                if (array=== 1) {
                    return (<motion.svg className='disk' animate={{top: [0,gridPositionRow[rowIndex]], transition:{duration:0.5}}} key={counter} style={{ left: gridPositionColumn[columnIndex]}}><PLAYER1DISK height='70' width='70'/></motion.svg>)
                }
                else if (array=== 2) {
                    return (<motion.svg className='disk' animate={{top:[0, gridPositionRow[rowIndex]], transition:{duration:0.5}}} key={counter} style={{ left: gridPositionColumn[columnIndex]}}><PLAYER2DISK height='70' width='70'/></motion.svg>)
                }else {return (null) }})
            })   
    }

  return (
    <>
        <svg className='column column-1' onClick={() =>  {  if (!winner) setNewDisk(0) }}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>
        
        <svg className='column column-2' onClick={() =>  { if (!winner) setNewDisk(1)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-3' onClick={() =>  {if (!winner) setNewDisk(2)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-4' onClick={() =>  {if (!winner) setNewDisk(3)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-5' onClick={() =>  {if (!winner) setNewDisk(4)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-6' onClick={() =>  {if (!winner) setNewDisk(5)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-7' onClick={() =>  {if (!winner) setNewDisk(6)}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        { renderDisk()}
        
        {/* {row != null  && column != null && play===1 &&
        <motion.svg variants={variants} animate={'drop'} className='test-disk-container' style={{left: gridPositionColumn[column]}}>
            <PLAYER1DISK  width='70' height='70'/>
        </motion.svg>
        }
        {row != null  && column != null && play===2 &&
        <motion.svg variants={variants} animate={'drop'} className='test-disk-container' style={{left: gridPositionColumn[column]}}>
            <PLAYER2DISK  width='70' height='70'/>
        </motion.svg>
        } */}
          
    </>
    
  )
}

export  {Grid}