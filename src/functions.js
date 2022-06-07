const drawBoard = ()=>{
    for(let currentRow=0; currentRow < numberOfSquaresY; currentRow++){
        for(let currentCol=0; currentCol < numberOfSquaresX;currentCol++){
            drawSquare(currentCol,currentRow,BOARD[currentRow][currentCol])
        }
    }

}

const drawSquare = (x,y,color)=>{
    ctx.fillStyle = color
    ctx.fillRect(x*rectSize,y*rectSize,rectSize,rectSize)
    ctx.strokeStyle = '#555'
    ctx.strokeRect(x*rectSize,y*rectSize,rectSize,rectSize)

}

const getRandomPiece = ()=>{
    const randomNum = Math.floor(Math.random()*PIECES.length)
    return [PIECES[randomNum], colors[randomNum]]
}

const generateNewPiece = ()=>{
    const [newTetromino,color] = getRandomPiece()
    const newPiece = new Piece(Math.round(BOARD[0].length/2) ,-3,newTetromino,color)
    return newPiece
}

const restartGame = ()=>{
    for(let currentRow=0; currentRow < numberOfSquaresY; currentRow++){
        BOARD[currentRow]=[]
        for(let currentCol=0; currentCol < numberOfSquaresX;currentCol++){
            BOARD[currentRow][currentCol] = defaultColor
        }
    }
    setScore(0)
    drawBoard()
}


const setScore = (score)=>{
    scoreElement.innerText = score
    if(score>maxScore){
        maxScore = score
        maxScoreElement.innerText = maxScore
        localStorage.setItem('@Max-score',maxScore)
    }else{
        maxScoreElement.innerText = maxScore

    }
}

let interval 

const startInterval = (speed)=>{
    interval = setInterval(() => {

        newPiece.moveDown()
        if(newPiece.collision()){
            stopInterval()
            startInterval(normalSpeedInterval)
            newPiece = generateNewPiece()
        }
    }, speed);

}

const stopInterval = ()=>{
    clearInterval(interval)
}