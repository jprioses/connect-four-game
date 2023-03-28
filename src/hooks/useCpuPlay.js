const useCpuPlay = () => {

    const checkGrid = (grid) => {
    
        const cpuPlays =    [{prior: 6, column: []},
                            {prior: 5, column: []},
                            {prior: 4, column: []},
                            {prior: 3, column: []},
                            {prior: 2, column: []},
                            {prior: 1, column: []},
                            {prior: 0, column: []},
                            {prior: -1, column: []}]

        for (let col=0; col<7; col++) {
            for (let row=5; row>=0; row--){
                if(grid[row][col] === 0){
                    if (checkWinPrior(grid, 2, col, row)) {
                        cpuPlays[0].column.push(col)
                        return cpuPlays
                    } else {
                        if (checkWinPrior(grid, 1, col, row)) cpuPlays[1].column.push(col)
                        else if (row-1 >= 0 && checkWinPrior(grid, 1, col, row-1)) cpuPlays[7].column.push(col) // This line is to avoid giving a chance
                        else if (check3Prior(grid, 2, col, row)) cpuPlays[2].column.push(col)
                        else if (check3Prior(grid, 1, col, row)) cpuPlays[3].column.push(col)
                        else if (check2Prior(grid, 2, col, row)) cpuPlays[4].column.push(col)
                        else if (check1Prior(grid, col, row)) cpuPlays[5].column.push(col)
                        else cpuPlays[6].column.push(col)
                    }
                    break
                } 
            }
        }
        return cpuPlays
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

    const check1Prior = (grid, col, row) => {
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

    const getCpuColumnPlay = (cpuPlays) => {
        let col
        console.log('here', cpuPlays)
        if (cpuPlays[0].column.length === 1) col = cpuPlays[0].column[0]
        else if (cpuPlays[1].column.length >= 1) col = getRandom(cpuPlays[1].column)
        else if (cpuPlays[2].column.length >= 1) col = getRandom(cpuPlays[2].column)
        else if (cpuPlays[3].column.length >= 1) col = getRandom(cpuPlays[3].column)
        else if (cpuPlays[4].column.length >= 1) col = getRandom(cpuPlays[4].column)
        else if (cpuPlays[5].column.length >= 1) col = getRandom(cpuPlays[5].column)
        else if (cpuPlays[6].column.length >= 1) col = getRandom(cpuPlays[6].column)
        else if (cpuPlays[7].column.length >= 1) col = getRandom(cpuPlays[7].column)
        
        return col
    }

    const getRandom = (list) => list[Math.floor((Math.random()*list.length))];

    return {
        checkGrid,
        getCpuColumnPlay
    }

}

export {useCpuPlay}