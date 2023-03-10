import React, { useState} from 'react'

import {ReactComponent as PLAYER2DISK} from '../../assets/player-2-disk.svg'
import {ReactComponent as PLAYER1DISK} from '../../assets/player-1-disk.svg'


const usePlay = () => {

    const [grid, setGrid] = useState([  [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0]])

    const [player, setPlayer] = useState(1)

    const changePlayer = () => (player===1) ? setPlayer(2) : setPlayer(1)

    const addDisk = (column) => {
        
        let position = [0,column]
        
        for (let index in grid) {
            if (grid[index][column] === 0) position = [index,column] 
            else break
        }

        (player===1) ? grid[position[0]][position[1]] = 1 : grid[position[0]][position[1]] = 2
        
        setGrid([...grid])
    }

    return {
        grid,
        addDisk,
        changePlayer,  
    }
}


function Grid() {

    const {grid,addDisk, changePlayer} = usePlay()
    
    const gridPosition = [8,96,184,272,360,448]

  return (
    <>
        <svg className='column-1' onClick={() =>  { addDisk(0); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            
            { grid.map((array, index) => {
                if (array[0]=== 1) {
                    return (<PLAYER1DISK key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }
                else if (array[0]=== 2) {
                    return (<PLAYER2DISK  key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }else {return (null) }})
            }

        </svg>

          <svg className='column-2' onClick={() =>  { addDisk(1); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { grid.map((array, index) => {
                if (array[1]=== 1) {
                    return (<PLAYER1DISK key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }
                else if (array[1]=== 2) {
                    return (<PLAYER2DISK  key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }else {return (null) }})
            }
          </svg>

          <svg className='column-3' onClick={() =>  {addDisk(2); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { grid.map((array, index) => {
                if (array[2]=== 1) {
                    return (<PLAYER1DISK key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }
                else if (array[2]=== 2) {
                    return (<PLAYER2DISK  key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }else {return (null) }})
            }
          </svg>

          <svg className='column-4' onClick={() =>  {addDisk(3); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { grid.map((array, index) => {
                if (array[3]=== 1) {
                    return (<PLAYER1DISK key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }
                else if (array[3]=== 2) {
                    return (<PLAYER2DISK  key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }else {return (null) }})
            }
          </svg>

          <svg className='column-5' onClick={() =>  {addDisk(4); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { grid.map((array, index) => {
                if (array[4]=== 1) {
                    return (<PLAYER1DISK key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }
                else if (array[4]=== 2) {
                    return (<PLAYER2DISK  key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }else {return (null) }})
            }
          </svg>

          <svg className='column-6' onClick={() =>  {addDisk(5); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { grid.map((array, index) => {
                if (array[5]=== 1) {
                    return (<PLAYER1DISK key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }
                else if (array[5]=== 2) {
                    return (<PLAYER2DISK  key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }else {return (null) }})
            }
          </svg>

          <svg className='column-7' onClick={() =>  {addDisk(6); changePlayer()}}>
            <rect x='0' y='0' width='85' height='528' fill='none'/>
            { grid.map((array, index) => {
                if (array[6]=== 1) {
                    return (<PLAYER1DISK key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }
                else if (array[6]=== 2) {
                    return (<PLAYER2DISK  key={index} x='7' y={gridPosition[index]} width='70' height='70'/>)
                }else {return (null) }})
            }
          </svg>
    </>
    
  )
}

export {Grid}