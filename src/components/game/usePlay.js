import { useState, useEffect} from "react"


let col
let row
let canChange = false

const usePlay = () => {

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
    const [wait, setWait] = useState(false)
    const [winnerPos, setWinnerPos] = useState(null)
    const [pause, setPause] = useState(false)

    const setNewDisk = (colum) => {

        col = null
        row = null

        for (let index in grid) {
            if (grid[index][colum] === 0) {
                col = colum
                row = index
            }
            else { break }
        }

        updateGrid()
    }

    const updateGrid = () => {
        if (row != null  && col!= null) {
            grid[row][col] = player
            setGrid([...grid])
            canChange = true
        }
    }

    const changePlayer = () => {
        (player===1) ? setPlayer(2) : setPlayer(1)
        setTimerCounter(30)
    }

    const checkWin = () => {
    
        row = Number(row);
        col = Number(col);
     
        //Vertically
        //row-3 >= 0 && (grid[row-1][col] === player) && (grid[row-2][col] === player) && (grid[row-3][col] === player) && setWhoWins(player, [[row,col],[row-1,col],[row-2,col],[row-3,col]])
        row+3 <= 5 && (grid[row+1][col] === player) && (grid[row+2][col] === player) && (grid[row+3][col] === player) && setWhoWins(player, [[row,col],[row+1,col],[row+2,col],[row+3,col]])
        
        //Horizontally
        col-3 >= 0 && (grid[row][col-1] === player) && (grid[row][col-2] === player) && (grid[row][col-3] === player) && setWhoWins(player, [[row,col],[row,col-1],[row,col-2],[row,col-3]])
        col+3 <= 6 && (grid[row][col+1] === player) && (grid[row][col+2] === player) && (grid[row][col+3] === player) && setWhoWins(player, [[row,col],[row,col+1],[row,col+2],[row,col+3]])
        
        //Horizontally intern check
        col+1 <= 6 && col-2 >= 0 && (grid[row][col-2] === player) && (grid[row][col-1] === player) && (grid[row][col+1] === player) && setWhoWins(player, [[row,col],[row,col-2],[row,col-1],[row,col+1]])
        col+2 <= 6 && col-1 >= 0 && (grid[row][col-1] === player) && (grid[row][col+1] === player) && (grid[row][col+2] === player) && setWhoWins(player, [[row,col],[row,col-1],[row,col+1],[row,col+2]])

        //Diagonally up
        row-3 >= 0 && col-3 >= 0 && (grid[row-1][col-1] === player) && (grid[row-2][col-2] === player) && (grid[row-3][col-3] === player) && setWhoWins(player, [[row,col],[row-1,col-1],[row-2,col-2],[row-3,col-3]])
        row-3 >= 0 && col+3 <= 6 && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === player) && (grid[row-3][col+3] === player) && setWhoWins(player, [[row,col],[row-1,col+1],[row-2,col+2],[row-3,col+3]])
    
        //Diagonally down
        row+3 <= 5 && col-3 >= 0 && (grid[row+1][col-1] === player) && (grid[row+2][col-2] === player) && (grid[row+3][col-3] === player) && setWhoWins(player, [[row,col],[row+1,col-1],[row+2,col-2],[row+3,col-3]])
        row+3 <= 5 && col+3 <= 6 && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === player) && (grid[row+3][col+3] === player) && setWhoWins(player, [[row,col],[row+1,col+1],[row+2,col+2],[row+3,col+3]])
        
        //Diagonally intern check
        //Left
        row+2 <= 5 && col-2 >= 0 && row-1 >= 0 && col+1 <= 6 && (grid[row+2][col-2] === player) && (grid[row+1][col-1] === player) && (grid[row-1][col+1] === player) && setWhoWins(player, [[row,col],[row+2,col-2],[row+1,col-1],[row-1,col+1]])
        row+1 <= 5 && col-1 >= 0 && row-2 >= 0 && col+2 <= 6 && (grid[row+1][col-1] === player) && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === player) && setWhoWins(player, [[row,col],[row+1,col-1],[row-1,col+1],[row-2,col+2]])
        //Right
        row+2 <= 5 && col+2 <= 6 && row-1 >= 0 && col-1 >= 0 && (grid[row-1][col-1] === player) && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === player) && setWhoWins(player, [[row,col],[row-1,col-1],[row+1,col+1],[row+2,col+2]])
        row+1 <= 5 && col+1 <= 6 && row-2 >= 0 && col-2 >= 0 && (grid[row-2][col-2] === player) && (grid[row-1][col-1] === player) && (grid[row+1][col+1] === player) && setWhoWins(player, [[row,col],[row-2,col-2],[row-1,col-1],[row+1,col+1]])
    }

    const addWinner = (playerNum) => {
      
        if (playerNum === 1) {
            setPlayer1Wins(player1Wins + 1)
        }
        else if (playerNum=== 2) {
            setPlayer2Wins(player2Wins + 1) 
        }
    }

    const setWhoWins = (playerNum, hasGrid) => {
        if (hasGrid) {
            setWinnerPos(hasGrid)
        }
        setWinner(playerNum)
        addWinner(playerNum)
        setTimerCounter(0)
        canChange = false
    }

    const playAgain = (restart) => {

        if (restart) {
           (player === 2) ? changePlayer() : setTimerCounter(30)
            setPlayer1Wins(0)
            setPlayer2Wins(0)
        } else { changePlayer() }
        
        canChange = false
        setWinner(null)
        setGrid(initialGrid)
        setWinnerPos(null)
        
    }

    useEffect(() => {
        setWait(true)
        const timer = setTimeout(() => {    setWait(false); 
                                            checkWin()
                                            canChange && changePlayer(); }, 600);
        
          return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [grid])

   
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
        playAgain,
        wait,
        winnerPos,
        pause,
        setPause,
    }
}


const useCpuPlay = () => {

    const [cpuPlays, setCpuPlays] = useState([  {prior: 6, column: []},
                                                {prior: 5, column: []},
                                                {prior: 4, column: []},
                                                {prior: 3, column: []},
                                                {prior: 2, column: []},
                                                {prior: 1, column: []},
                                                {prior: 0, column: []}])

    const checkGrid = (grid) => {
        for (let col=0; col<7; col++) {
            for (let row=5; row>=0; row--){
                if(grid[row][col] === 0){
                    if (checkWinPrior(grid, 2, col, row)) {
                        setCpuPlays([{prior: 6 , column: [col]}])
                        return
                    } else {
                        if (checkWinPrior(grid, 1, col, row)) cpuPlays[1].column.push(col)
                        else if (check3Prior(grid, 2, col, row)) cpuPlays[2].column.push(col)
                        else if (check3Prior(grid, 1, col, row)) cpuPlays[3].column.push(col)
                        else if (check2Prior(grid, 2, col, row)) cpuPlays[4].column.push(col)
                        else if (check1Prior(grid, 2, col, row)) cpuPlays[5].column.push(col)
                        else cpuPlays[6].column.push(col)
                    }
                    break
                } 
            }
        }
    }

    const checkWinPrior = (grid, player, col, row) => {
        let hasPrior = false
        //Vertically
        row+3 <=5 && (grid[row+1][col] === player) && (grid[row+2][col] === player) && (grid[row+3][col] === player) && (hasPrior = true)
        
        //Horizontally
        col-3 >= 0 && (grid[row][col-1] === player) && (grid[row][col-2] === player) && (grid[row][col-3] === player) && (hasPrior = true)
        col+3 <= 6 && (grid[row][col+1] === player) && (grid[row][col+2] === player) && (grid[row][col+3] === player) && (hasPrior = true)
        
        //Horizontally intern check
        col+1 <= 6 && col-2 >= 0 && (grid[row][col-2] === player) && (grid[row][col-1] === player) && (grid[row][col+1] === player) && (hasPrior = true)
        col+2 <= 6 && col-1 >= 0 && (grid[row][col-1] === player) && (grid[row][col+1] === player) && (grid[row][col+2] === player) && (hasPrior = true)

        //Diagonally up
        row-3 >= 0 && col-3 >= 0 && (grid[row-1][col-1] === player) && (grid[row-2][col-2] === player) && (grid[row-3][col-3] === player) && (hasPrior = true)
        row-3 >= 0 && col+3 <= 6 && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === player) && (grid[row-3][col+3] === player) && (hasPrior = true)
    
        //Diagonally down
        row+3 <= 5 && col-3 >= 0 && (grid[row+1][col-1] === player) && (grid[row+2][col-2] === player) && (grid[row+3][col-3] === player) && (hasPrior = true)
        row+3 <= 5 && col+3 <= 6 && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === player) && (grid[row+3][col+3] === player) && (hasPrior = true)
        
        //Diagonally intern check
        //Left
        row+2 <= 5 && col-2 >= 0 && row-1 >= 0 && col+1 <= 6 && (grid[row+2][col-2] === player) && (grid[row+1][col-1] === player) && (grid[row-1][col+1] === player) && (hasPrior = true)
        row+1 <= 5 && col-1 >= 0 && row-2 >= 0 && col+2 <= 6 && (grid[row+1][col-1] === player) && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === player) && (hasPrior = true)
        //Right
        row+2 <= 5 && col+2 <= 6 && row-1 >= 0 && col-1 >= 0 && (grid[row-1][col-1] === player) && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === player) && (hasPrior = true)
        row+1 <= 5 && col+1 <= 6 && row-2 >= 0 && col-2 >= 0 && (grid[row-2][col-2] === player) && (grid[row-1][col-1] === player) && (grid[row+1][col+1] === player) && (hasPrior = true)
        
        return hasPrior
    }

    const check3Prior = (grid, player, col, row) => {
        let hasPrior = false
        //Vertically
        row+2 <=5 && row-1 >=0 && (grid[row+1][col] === player) && (grid[row+2][col] === player) && (hasPrior = true)
        
        //Horizontally
            // XOO|X| -- |X|OOX
        col-3 >= 0 && (grid[row][col-1] === player) && (grid[row][col-2] === player) && (grid[row][col-3] === 0) && (hasPrior = true)
        col+3 <= 6 && (grid[row][col+1] === player) && (grid[row][col+2] === player) && (grid[row][col+3] === 0) && (hasPrior = true)

            // OOX|X| -- |X|XOO
        col-3 >= 0 && (grid[row][col-1] === 0) && (grid[row][col-2] === player) && (grid[row][col-3] === player) && (hasPrior = true)
        col+3 <= 6 && (grid[row][col+1] === 0) && (grid[row][col+2] === player) && (grid[row][col+3] === player) && (hasPrior = true)
            
            // OXO|X| -- |X|OXO
        col-3 >= 0 && (grid[row][col-1] === player) && (grid[row][col-2] === 0) && (grid[row][col-3] === player) && (hasPrior = true)
        col+3 <= 6 && (grid[row][col+1] === player) && (grid[row][col+2] === 0) && (grid[row][col+3] === player) && (hasPrior = true)
        
        //Horizontally intern check
            // XO|X|O -- O|X|OX
        col+1 <= 6 && col-2 >= 0 && (grid[row][col+1] === player) && (grid[row][col-1] === player) && (grid[row][col-2] === 0) && (hasPrior = true)
        col+2 <= 6 && col-1 >= 0 && (grid[row][col-1] === player) && (grid[row][col+1] === player) && (grid[row][col+2] === 0) && (hasPrior = true)
            
            // OO|X|X -- X|X|OO
        col+1 <= 6 && col-2 >= 0 && (grid[row][col+1] === 0) && (grid[row][col-1] === player) && (grid[row][col-2] === player) && (hasPrior = true)
        col+2 <= 6 && col-1 >= 0 && (grid[row][col-1] === 0) && (grid[row][col+1] === player) && (grid[row][col+2] === player) && (hasPrior = true)

            // OX|X|O -- O|X|XO
        col+1 <= 6 && col-2 >= 0 && (grid[row][col+1] === player) && (grid[row][col-1] === 0) && (grid[row][col-2] === player) && (hasPrior = true)
        col+2 <= 6 && col-1 >= 0 && (grid[row][col-1] === player) && (grid[row][col+1] === 0) && (grid[row][col+2] === player) && (hasPrior = true)

        //Diagonally up
            // XOO|X| -- |X|OOX
        row-3 >= 0 && col-3 >= 0 && (grid[row-1][col-1] === player) && (grid[row-2][col-2] === player) && (grid[row-3][col-3] === 0) && (hasPrior = true)
        row-3 >= 0 && col+3 <= 6 && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === player) && (grid[row-3][col+3] === 0) && (hasPrior = true)
            
            // OOX|X| -- |X|XOO
        row-3 >= 0 && col-3 >= 0 && (grid[row-1][col-1] === 0) && (grid[row-2][col-2] === player) && (grid[row-3][col-3] === player) && (hasPrior = true)
        row-3 >= 0 && col+3 <= 6 && (grid[row-1][col+1] === 0) && (grid[row-2][col+2] === player) && (grid[row-3][col+3] === player) && (hasPrior = true)

            // OXO|X| -- |X|OXO
        row-3 >= 0 && col-3 >= 0 && (grid[row-1][col-1] === player) && (grid[row-2][col-2] === 0) && (grid[row-3][col-3] === player) && (hasPrior = true)
        row-3 >= 0 && col+3 <= 6 && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === 0) && (grid[row-3][col+3] === player) && (hasPrior = true)

        //Diagonally down
             // XOO|X| -- |X|OOX
        row+3 <= 5 && col-3 >= 0 && (grid[row+1][col-1] === player) && (grid[row+2][col-2] === player) && (grid[row+3][col-3] === 0) && (hasPrior = true)
        row+3 <= 5 && col+3 <= 6 && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === player) && (grid[row+3][col+3] === 0) && (hasPrior = true)
            
            // OOX|X| -- |X|XOO
        row+3 <= 5 && col-3 >= 0 && (grid[row+1][col-1] === 0) && (grid[row+2][col-2] === player) && (grid[row+3][col-3] === player) && (hasPrior = true)
        row+3 <= 5 && col+3 <= 6 && (grid[row+1][col+1] === 0) && (grid[row+2][col+2] === player) && (grid[row+3][col+3] === player) && (hasPrior = true)

            // OXO|X| -- |X|OXO
        row+3 <= 5 && col-3 >= 0 && (grid[row+1][col-1] === player) && (grid[row+2][col-2] === 0) && (grid[row+3][col-3] === player) && (hasPrior = true)
        row+3 <= 5 && col+3 <= 6 && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === 0) && (grid[row+3][col+3] === player) && (hasPrior = true)
        
        //Diagonally intern check
        //Left
            // XO|X|O -- O|X|OX
        row+2 <= 5 && col-2 >= 0 && row-1 >= 0 && col+1 <= 6 && (grid[row-1][col+1] === player) && (grid[row+1][col-1] === player) && (grid[row+2][col-2] === 0) && (hasPrior = true)
        row+1 <= 5 && col-1 >= 0 && row-2 >= 0 && col+2 <= 6 && (grid[row+1][col-1] === player) && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === 0) && (hasPrior = true)
            
            // OO|X|X -- X|X|OO
        row+2 <= 5 && col-2 >= 0 && row-1 >= 0 && col+1 <= 6 && (grid[row-1][col+1] === 0) && (grid[row+1][col-1] === player) && (grid[row+2][col-2] === player) && (hasPrior = true)
        row+1 <= 5 && col-1 >= 0 && row-2 >= 0 && col+2 <= 6 && (grid[row+1][col-1] === 0) && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === player) && (hasPrior = true)
            
            // OX|X|O -- O|X|XO
        row+2 <= 5 && col-2 >= 0 && row-1 >= 0 && col+1 <= 6 && (grid[row-1][col+1] === player) && (grid[row+1][col-1] === 0) && (grid[row+2][col-2] === player) && (hasPrior = true)
        row+1 <= 5 && col-1 >= 0 && row-2 >= 0 && col+2 <= 6 && (grid[row+1][col-1] === player) && (grid[row-1][col+1] === 0) && (grid[row-2][col+2] === player) && (hasPrior = true)
        
        //Right
            // XO|X|O -- O|X|OX
        row+2 <= 5 && col+2 <= 6 && row-1 >= 0 && col-1 >= 0 && (grid[row-1][col-1] === player) && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === 0) && (hasPrior = true)
        row+1 <= 5 && col+1 <= 6 && row-2 >= 0 && col-2 >= 0 && (grid[row+1][col+1] === player) && (grid[row-1][col-1] === player) && (grid[row-2][col-2] === 0) && (hasPrior = true)
            
            // OO|X|X -- X|X|OO
        row+2 <= 5 && col+2 <= 6 && row-1 >= 0 && col-1 >= 0 && (grid[row-1][col-1] === 0) && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === player) && (hasPrior = true)
        row+1 <= 5 && col+1 <= 6 && row-2 >= 0 && col-2 >= 0 && (grid[row+1][col+1] === 0) && (grid[row-1][col-1] === player) && (grid[row-2][col-2] === player) && (hasPrior = true)
        
            // OX|X|O -- O|X|XO
        row+2 <= 5 && col+2 <= 6 && row-1 >= 0 && col-1 >= 0 && (grid[row-1][col-1] === player) && (grid[row+1][col+1] === 0) && (grid[row+2][col+2] === player) && (hasPrior = true)
        row+1 <= 5 && col+1 <= 6 && row-2 >= 0 && col-2 >= 0 && (grid[row+1][col+1] === player) && (grid[row-1][col-1] === 0) && (grid[row-2][col-2] === player) && (hasPrior = true)

        return hasPrior
    }

    const check2Prior = (grid, player, col, row) => {
        let hasPrior = false
        //Vertically
        row+1 <=5 && row-2 >=0 && (grid[row+1][col] === player) && (hasPrior = true)
        
        //Horizontally
            // XXO|X| -- |X|OXX
        col-3 >= 0 && (grid[row][col-1] === player) && (grid[row][col-2] === 0) && (grid[row][col-3] === 0) && (hasPrior = true)
        col+3 <= 6 && (grid[row][col+1] === player) && (grid[row][col+2] === 0) && (grid[row][col+3] === 0) && (hasPrior = true)
           
            // OXX|X| -- |X|XXO
        col-3 >= 0 && (grid[row][col-1] === 0) && (grid[row][col-2] === 0) && (grid[row][col-3] === player) && (hasPrior = true)
        col+3 <= 6 && (grid[row][col+1] === 0) && (grid[row][col+2] === 0) && (grid[row][col+3] === player) && (hasPrior = true)

            // XOX|X| -- |X|XOX
        col-3 >= 0 && (grid[row][col-1] === 0) && (grid[row][col-2] === player) && (grid[row][col-3] === 0) && (hasPrior = true)
        col+3 <= 6 && (grid[row][col+1] === 0) && (grid[row][col+2] === player) && (grid[row][col+3] === 0) && (hasPrior = true)
            
        //Horizontally intern check
            // XX|X|O -- O|X|XX
        col+1 <= 6 && col-2 >= 0 && (grid[row][col+1] === player) && (grid[row][col-1] === 0) && (grid[row][col-2] === 0) && (hasPrior = true)
        col+2 <= 6 && col-1 >= 0 && (grid[row][col-1] === player) && (grid[row][col+1] === 0) && (grid[row][col+2] === 0) && (hasPrior = true)
            
            // OX|X|X -- X|X|XO
        col+1 <= 6 && col-2 >= 0 && (grid[row][col+1] === 0) && (grid[row][col-1] === 0) && (grid[row][col-2] === player) && (hasPrior = true)
        col+2 <= 6 && col-1 >= 0 && (grid[row][col-1] === 0) && (grid[row][col+1] === 0) && (grid[row][col+2] === player) && (hasPrior = true)
            
            // XO|X|X -- X|X|OX
        col+1 <= 6 && col-2 >= 0 && (grid[row][col+1] === 0) && (grid[row][col-1] === player) && (grid[row][col-2] === player) && (hasPrior = true)
        col+2 <= 6 && col-1 >= 0 && (grid[row][col-1] === 0) && (grid[row][col+1] === player) && (grid[row][col+2] === player) && (hasPrior = true)
        
        //Diagonally up
            // XXO|X| -- |X|OXX
        row-3 >= 0 && col-3 >= 0 && (grid[row-1][col-1] === player) && (grid[row-2][col-2] === 0) && (grid[row-3][col-3] === 0) && (hasPrior = true)
        row-3 >= 0 && col+3 <= 6 && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === 0) && (grid[row-3][col+3] === 0) && (hasPrior = true)
            
            // OXX|X| -- |X|XXO
        row-3 >= 0 && col-3 >= 0 && (grid[row-1][col-1] === 0) && (grid[row-2][col-2] === 0) && (grid[row-3][col-3] === player) && (hasPrior = true)
        row-3 >= 0 && col+3 <= 6 && (grid[row-1][col+1] === 0) && (grid[row-2][col+2] === 0) && (grid[row-3][col+3] === player) && (hasPrior = true)
           
            // XOX|X| -- |X|XOX
        row-3 >= 0 && col-3 >= 0 && (grid[row-1][col-1] === 0) && (grid[row-2][col-2] === player) && (grid[row-3][col-3] === 0) && (hasPrior = true)
        row-3 >= 0 && col+3 <= 6 && (grid[row-1][col+1] === 0) && (grid[row-2][col+2] === player) && (grid[row-3][col+3] === 0) && (hasPrior = true)
        
        //Diagonally down
            // XXO|X| -- |X|OXX
        row+3 <= 5 && col-3 >= 0 && (grid[row+1][col-1] === player) && (grid[row+2][col-2] === 0) && (grid[row+3][col-3] === 0) && (hasPrior = true)
        row+3 <= 5 && col+3 <= 6 && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === 0) && (grid[row+3][col+3] === 0) && (hasPrior = true)
            
            // OXX|X| -- |X|XXO
        row+3 <= 5 && col-3 >= 0 && (grid[row+1][col-1] === 0) && (grid[row+2][col-2] === 0) && (grid[row+3][col-3] === player) && (hasPrior = true)
        row+3 <= 5 && col+3 <= 6 && (grid[row+1][col+1] === 0) && (grid[row+2][col+2] === 0) && (grid[row+3][col+3] === player) && (hasPrior = true)
            
            // XOX|X| -- |X|XOX
        row+3 <= 5 && col-3 >= 0 && (grid[row+1][col-1] === 0) && (grid[row+2][col-2] === player) && (grid[row+3][col-3] === 0) && (hasPrior = true)
        row+3 <= 5 && col+3 <= 6 && (grid[row+1][col+1] === 0) && (grid[row+2][col+2] === player) && (grid[row+3][col+3] === 0) && (hasPrior = true)
        
        //Diagonally intern check
        //Left
            // XX|X|O -- O|X|XX
        row+2 <= 5 && col-2 >= 0 && row-1 >= 0 && col+1 <= 6 && (grid[row-1][col+1] === player) && (grid[row+1][col-1] === 0) && (grid[row+2][col-2] === 0) && (hasPrior = true)
        row+1 <= 5 && col-1 >= 0 && row-2 >= 0 && col+2 <= 6 && (grid[row+1][col-1] === player) && (grid[row-1][col+1] === 0) && (grid[row-2][col+2] === 0) && (hasPrior = true)
            
            // OX|X|X -- X|X|XO
        row+2 <= 5 && col-2 >= 0 && row-1 >= 0 && col+1 <= 6 && (grid[row-1][col+1] === 0) && (grid[row+1][col-1] === 0) && (grid[row+2][col-2] === player) && (hasPrior = true)
        row+1 <= 5 && col-1 >= 0 && row-2 >= 0 && col+2 <= 6 && (grid[row+1][col-1] === 0) && (grid[row-1][col+1] === 0) && (grid[row-2][col+2] === player) && (hasPrior = true)
            
            // XO|X|X -- X|X|OX
        row+2 <= 5 && col-2 >= 0 && row-1 >= 0 && col+1 <= 6 && (grid[row-1][col+1] === 0) && (grid[row+1][col-1] === player) && (grid[row+2][col-2] === 0) && (hasPrior = true)
        row+1 <= 5 && col-1 >= 0 && row-2 >= 0 && col+2 <= 6 && (grid[row+1][col-1] === 0) && (grid[row-1][col+1] === player) && (grid[row-2][col+2] === 0) && (hasPrior = true)
        
        //Right
            // XX|X|O -- O|X|XX
        row+2 <= 5 && col+2 <= 6 && row-1 >= 0 && col-1 >= 0 && (grid[row-1][col-1] === player) && (grid[row+1][col+1] === 0) && (grid[row+2][col+2] === 0) && (hasPrior = true)
        row+1 <= 5 && col+1 <= 6 && row-2 >= 0 && col-2 >= 0 && (grid[row+1][col+1] === player) && (grid[row-1][col-1] === 0) && (grid[row-2][col-2] === 0) && (hasPrior = true)
            
            // OX|X|X -- X|X|XO
        row+2 <= 5 && col+2 <= 6 && row-1 >= 0 && col-1 >= 0 && (grid[row-1][col-1] === 0) && (grid[row+1][col+1] === 0) && (grid[row+2][col+2] === player) && (hasPrior = true)
        row+1 <= 5 && col+1 <= 6 && row-2 >= 0 && col-2 >= 0 && (grid[row+1][col+1] === 0) && (grid[row-1][col-1] === 0) && (grid[row-2][col-2] === player) && (hasPrior = true)
            
            // XO|X|X -- X|X|OX
        row+2 <= 5 && col+2 <= 6 && row-1 >= 0 && col-1 >= 0 && (grid[row-1][col-1] === 0) && (grid[row+1][col+1] === player) && (grid[row+2][col+2] === 0) && (hasPrior = true)
        row+1 <= 5 && col+1 <= 6 && row-2 >= 0 && col-2 >= 0 && (grid[row+1][col+1] === 0) && (grid[row-1][col-1] === player) && (grid[row-2][col-2] === 0) && (hasPrior = true)
        
        return hasPrior
    }

    const check1Prior = (grid, player, col, row) => {
        let hasPrior = false
        //Vertically
        row-3 >= 0 && (hasPrior = true)
        
        //Horizontally
            // XXX|X| -- |X|XXX
        col-3 >= 0 && (grid[row][col-1] === 0) && (grid[row][col-2] === 0) && (grid[row][col-3] === 0) && (hasPrior = true)
        col+3 <= 6 && (grid[row][col+1] === 0) && (grid[row][col+2] === 0) && (grid[row][col+3] === 0) && (hasPrior = true)
           
        //Horizontally intern check
            // XX|X|X -- X|X|XX
        col+1 <= 6 && col-2 >= 0 && (grid[row][col+1] === 0) && (grid[row][col-1] === 0) && (grid[row][col-2] === 0) && (hasPrior = true)
        col+2 <= 6 && col-1 >= 0 && (grid[row][col-1] === 0) && (grid[row][col+1] === 0) && (grid[row][col+2] === 0) && (hasPrior = true)
            
        //Diagonally up
            // XXX|X| -- |X|XXX
        row-3 >= 0 && col-3 >= 0 && (grid[row-1][col-1] === 0) && (grid[row-2][col-2] === 0) && (grid[row-3][col-3] === 0) && (hasPrior = true)
        row-3 >= 0 && col+3 <= 6 && (grid[row-1][col+1] === 0) && (grid[row-2][col+2] === 0) && (grid[row-3][col+3] === 0) && (hasPrior = true)
            
        //Diagonally down
            // XXX|X| -- |X|XXX
        row+3 <= 5 && col-3 >= 0 && (grid[row+1][col-1] === 0) && (grid[row+2][col-2] === 0) && (grid[row+3][col-3] === 0) && (hasPrior = true)
        row+3 <= 5 && col+3 <= 6 && (grid[row+1][col+1] === 0) && (grid[row+2][col+2] === 0) && (grid[row+3][col+3] === 0) && (hasPrior = true)
            
        //Diagonally intern check
        //Left
            // XX|X|X -- X|X|XX
        row+2 <= 5 && col-2 >= 0 && row-1 >= 0 && col+1 <= 6 && (grid[row-1][col+1] === 0) && (grid[row+1][col-1] === 0) && (grid[row+2][col-2] === 0) && (hasPrior = true)
        row+1 <= 5 && col-1 >= 0 && row-2 >= 0 && col+2 <= 6 && (grid[row+1][col-1] === 0) && (grid[row-1][col+1] === 0) && (grid[row-2][col+2] === 0) && (hasPrior = true)
        
        //Right
            // XX|X|X -- X|X|XX
        row+2 <= 5 && col+2 <= 6 && row-1 >= 0 && col-1 >= 0 && (grid[row-1][col-1] === 0) && (grid[row+1][col+1] === 0) && (grid[row+2][col+2] === 0) && (hasPrior = true)
        row+1 <= 5 && col+1 <= 6 && row-2 >= 0 && col-2 >= 0 && (grid[row+1][col+1] === 0) && (grid[row-1][col-1] === 0) && (grid[row-2][col-2] === 0) && (hasPrior = true)
            
        return hasPrior
    }

    const getCpuColumnPlay = () => {
        if (cpuPlays[0].column.length === 1) return cpuPlays[0].column[0]
        else if (cpuPlays[1].column.length >= 1) return  getRandom(cpuPlays[1].column);
        else if (cpuPlays[2].column.length >= 1) return  getRandom(cpuPlays[2].column);
        else if (cpuPlays[3].column.length >= 1) return  getRandom(cpuPlays[3].column);
        else if (cpuPlays[4].column.length >= 1) return  getRandom(cpuPlays[4].column);
        else if (cpuPlays[5].column.length >= 1) return  getRandom(cpuPlays[5].column);
        else if (cpuPlays[6].column.length >= 1) return  getRandom(cpuPlays[6].column);
    }

    const getRandom = (list) => list[Math.floor((Math.random()*list.length))];

    return {
        checkGrid,
        getCpuColumnPlay
    }

}

export {usePlay, useCpuPlay}
