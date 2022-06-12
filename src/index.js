let normalSpeedInterval = 500
let maximumNormalSpeedInterval = 150
let fastSpeedInterval = 5
let gamePaused = true

let score = 0
let level = 0
let maxScore = Number(localStorage.getItem('@Max-score')) || 0

getSelectedPieces()
restartGame()

let newPiece = generateNewPiece()

document.addEventListener('keydown',(e)=>{
    
    if(gamePaused){
        gamePaused =false
        setScore(0)
        drawSecondSelectedPiece()
        startInterval(normalSpeedInterval)
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
            restartIntervalWithfastSpeed()
            break;
        case 'ArrowUp':
            newPiece.swap()
            break;
        default:
            break
    }
})

