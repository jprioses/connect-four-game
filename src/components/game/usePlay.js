import { useState} from "react"

const usePlay = () => {

    let colNum
    let rowNum

    const initialGrid = [   [0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0]]

    const [grid, setGrid] = useState(initialGrid)

    const [player, setPlayer] = useState(1)
    const [timerCounter, setTimerCounter] = useState(30)
    const [winner, setWinner] = useState(null)
    const [player1Wins, setPlayer1Wins] = useState(0)
    const [player2Wins, setPlayer2Wins] = useState(0)

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

        updateGrid()
    }

    const updateGrid = () => {
        if (rowNum != null  && colNum!= null) {
            grid[rowNum][colNum] = player
            setGrid(grid)
            changePlayer()
        }
    }

    const changePlayer = () => {
        (player===1) ? setPlayer(2) : setPlayer(1)
        setTimerCounter(30)
    }

    const addWinner = (playerNum) => {
        if (playerNum === 1) {
            setPlayer1Wins(player1Wins + 1)
        }
        else if (playerNum=== 2) {
            setPlayer2Wins(player2Wins + 1) 
        }
    }

    const setWhoWins = (playerNum) => {
        setWinner(playerNum)
        addWinner(playerNum)
    }

    const playAgain = (restart) => {

        if (restart) {
           (player === 2) ? changePlayer() : setTimerCounter(30)
            setPlayer1Wins(0)
            setPlayer2Wins(0)
        } else { changePlayer() }

        setWinner(null)
        setGrid(initialGrid)
        
    }

    return {
        grid,
        player,
        setNewDisk,
        timerCounter,
        setTimerCounter,
        winner,
        setWhoWins,
        player1Wins,
        player2Wins,
        playAgain
    }
}

export {usePlay}
