let normalSpeedInterval = 200
let fastSpeedInterval = 10
let gamePaused = true

let score = 0
let maxScore = Number(localStorage.getItem('@Max-score')) || 0

restartGame()

let newPiece = generateNewPiece()

document.addEventListener('keydown',(e)=>{
    
    if(gamePaused){
        startInterval(normalSpeedInterval)
        gamePaused =false
        startElement.classList.add('hidden')
    }
    switch(e.key){
        case 'ArrowLeft':
            newPiece.moveLeft()
            break;
        case 'ArrowRight':
            newPiece.moveRight()
            break;
        case 'ArrowDown':
            stopInterval()
            startInterval(fastSpeedInterval)
            break;
        case 'ArrowUp':
            newPiece.swap()
            break;
        default:
            break
    }
})

