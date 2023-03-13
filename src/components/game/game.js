import { useState } from "react"

const usePlay = () => {
    let colNum
    let rowNum

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

    const changePlayer = () => {
      if (rowNum != null  && colNum != null) {
        (player===1) ? setPlayer(2) : setPlayer(1)
      }
    }

    const setNewDisk = (col) => {

        colNum = null
        rowNum = null
        
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
        player,
        setNewDisk,
        updateGrid,
        changePlayer,  
    }
}

export {usePlay}
