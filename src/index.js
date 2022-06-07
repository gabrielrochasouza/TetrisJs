let normalSpeedInterval = 200
let fastSpeedInterval = 10


restartGame()

let newPiece = generateNewPiece()
 
// setInterval(() => {

//     newPiece.moveDown()
//     if(newPiece.collision()){
//         newPiece = generateNewPiece()
//     }
// }, normalSpeedInterval);

startInterval(normalSpeedInterval)


document.addEventListener('keydown',(e)=>{

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

