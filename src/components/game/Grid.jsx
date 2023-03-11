import React, { useEffect, useState} from 'react'

import {ReactComponent as PLAYER2DISK} from '../../assets/player-2-disk.svg'
import {ReactComponent as PLAYER1DISK} from '../../assets/player-1-disk.svg'

import { motion } from 'framer-motion'

const usePlay = () => {

    const [grid, setGrid] = useState([  [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0]])

    const [column, setColumn] = useState(null)
    const [row, setRow] = useState(null)
    const [play, setPlay] = useState(null)
    const [player, setPlayer] = useState(1)

        //TODO cant change if there is no more plays on column
    const changePlayer = () => (player===1) ? setPlayer(2) : setPlayer(1)

    const setNewDisk = (col) => {

        let colNum
        let rowNum
        
        for (let index in grid) {
            if (grid[index][col] === 0) {
                colNum = col
                rowNum = index
            }
            else { break }
        }

        setColumn(colNum)
        setRow(rowNum)
        setPlay(player)

    }

    const updateGrid = () => {
        if (row != null  && column != null) {
            grid[row][column] = play
            setGrid(grid)
        }
    }

    return {
        grid,
        row,
        column,
        play,
        setNewDisk,
        updateGrid,
        changePlayer,  
    }
}


function Grid() {

    const {grid, column, row, play ,updateGrid,changePlayer, setNewDisk} = usePlay()
    
    const gridPosition = [8,96,184,272,360,448]

    const renderGrid = (i) => {
        return grid.map((array, index) => {
            if (array[i]=== 1) {
                return (<svg className='disk'><PLAYER1DISK  key={index} x='7' y={gridPosition[index]} width='70' height='70'/></svg>)
            }
            else if (array[i]=== 2) {
                return (<PLAYER2DISK  key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
            }else {return (null) }})
            
    }

    // const renderNewDisk = () => {
    //     if (play === 1) return (<Disk play={play} left={column} top={gridPosition[row]} width='70' height='70'/>)
    //     else return (<PLAYER2DISK x='7' y={gridPosition[row]} width='70' height='70'/>)
    // }

    useEffect(() => {
        updateGrid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [column, row])

    let renderColumn
    if (column===0){
        renderColumn = 18
    } else if (column===1) {
        renderColumn = 105
    } else if (column===2) {
        renderColumn = 193
    }else if (column===3) {
        renderColumn = 281
    }else if (column===4) {
        renderColumn = 369
    }else if (column===5) {
        renderColumn = 457
    }else if (column===6) {
        renderColumn = 545
    }
    

    const variants = {
       
        drop: {
            left: renderColumn,
            top: [0,gridPosition[row] + 8],
            
            transition: {
                duration: 1,
            },
        }
    }

  return (
    <>
          <svg className='column column-1' onClick={() =>  { setNewDisk(0); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { renderGrid(0)}
          </svg>
          
          <svg className='column column-2' onClick={() =>  { setNewDisk(1); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { renderGrid(1)}
          </svg>

          <svg className='column column-3' onClick={() =>  {setNewDisk(2); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { renderGrid(2)}
          </svg>

          <svg className='column column-4' onClick={() =>  {setNewDisk(3); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { renderGrid(3)}
          </svg>

          <svg className='column column-5' onClick={() =>  {setNewDisk(4); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { renderGrid(4)}
          </svg>

          <svg className='column column-6' onClick={() =>  {setNewDisk(5); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { renderGrid(5)}
          </svg>

          <svg className='column column-7' onClick={() =>  {setNewDisk(6); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { renderGrid(6)}
          </svg>

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