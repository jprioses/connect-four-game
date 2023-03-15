import { useState} from "react"

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
    const [player, setPlayer] = useState(1)
    const [play, setPlay] = useState(1)
    const [timerCounter, setTimerCounter] = useState(30)

    const changePlayer = () => {
        (player===1) ? setPlayer(2) : setPlayer(1)
        setTimerCounter(30)
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
        player,
        play,
        setNewDisk,
        updateGrid,
        changePlayer,
        timerCounter,
        setTimerCounter
    }
}

export {usePlay}
