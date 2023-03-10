const gridArray = [ [1,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [1,0,0,0,0,0,0],
                    [1,0,0,0,0,0,0]
                ]


function columnVerify (col) {
    let position 
    for (let index in gridArray) {
        if (gridArray[index][col] === 0) {position = [index,col]}
        else {break}
    }

    console.log(position)
}

columnVerify(0)