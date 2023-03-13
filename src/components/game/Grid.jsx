import React, { useEffect} from 'react'
import {ReactComponent as PLAYER2DISK} from '../../assets/player-2-disk.svg'
import {ReactComponent as PLAYER1DISK} from '../../assets/player-1-disk.svg'
import { motion } from 'framer-motion'
import { usePlay } from './game'
import './grid.css'

function Grid() {

    const {grid, column, row, play ,updateGrid,changePlayer, setNewDisk} = usePlay()
    
    const gridPositionRow = [16,104,192,280,368,456]
    const gridPositionColumn = [18,105,193,281,369,457,545]

    const renderDisk = () => {
        return grid.map((arrayRow, rowIndex) => {
            return arrayRow.map((array, columnIndex) => {
                if (array=== 1) {
                    return (<motion.svg className='disk'key={rowIndex + columnIndex} animate={{top: gridPositionRow[rowIndex], left: gridPositionColumn[columnIndex]} }><PLAYER1DISK height='70' width='70'/></motion.svg>)
                }
                else if (array=== 2) {
                    return (<motion.svg className='disk' key={rowIndex + columnIndex} animate={{top: gridPositionRow[rowIndex], left: gridPositionColumn[columnIndex]}}><PLAYER2DISK height='70' width='70'/></motion.svg>)
                }else {return (null) }})
            })   
    }

    useEffect(() => {
        updateGrid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [column, row])
    
    const variants = {
       
        drop: {
            left: gridPositionColumn[column],
            top: [0,gridPositionRow[row]],
            
            transition: {
                duration: 0.5,
            },
        },
    }

  return (
    <>
        <svg className='column column-1' onClick={() =>  { setNewDisk(0); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>
        
        <svg className='column column-2' onClick={() =>  { setNewDisk(1); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-3' onClick={() =>  {setNewDisk(2); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-4' onClick={() =>  {setNewDisk(3); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-5' onClick={() =>  {setNewDisk(4); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-6' onClick={() =>  {setNewDisk(5); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        <svg className='column column-7' onClick={() =>  {setNewDisk(6); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
        </svg>

        { renderDisk()}
        
        {row != null  && column != null && play===1 &&
        <motion.svg variants={variants}  animate={'drop'} className='test-disk-container'>
            <PLAYER1DISK  width='70' height='70'/>
        </motion.svg>
        }
            {row != null  && column != null && play===2 &&
        <motion.svg variants={variants}  animate={'drop'} className='test-disk-container'>
            <PLAYER2DISK  width='70' height='70'/>
        </motion.svg>
        }
          
    </>
    
  )
}

export {Grid}