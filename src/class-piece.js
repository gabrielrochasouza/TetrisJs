class Piece {
    constructor(x,y, piece,color){
        this.piece = piece
        this.color = color
        this.activePiece = piece[0]
        this.pieceNumber = 0
        this.x = x
        this.y = y
    }

    drawPiece(){
        for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){
            for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                if(this.activePiece[currentRow][currentCol]){
                    drawSquare(this.x+currentCol,this.y+currentRow,this.color,ctx)
                }
            }
        }
    }

    undrawPiece(){
        for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){
            for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                if(this.activePiece[currentRow][currentCol]){
                    drawSquare(this.x+currentCol,this.y+currentRow,defaultColor,ctx)
                }
            }
        }
    }

    moveDown(){
        if(!this.collision()){
            clearStroke()
            this.undrawPiece()
            this.y++
            this.drawPiece()
            this.drawShadowPiece()
           

        }
        this.verifyGameOver()
    }

    moveLeft(){
        if(!this.collision()){
         
            let collison =false
            for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){
                for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                    if(this.activePiece[currentRow][currentCol]){
                        if( this.x + currentCol - 1 <0){//colisão com o lado esquerdo
                            collison =true
                        }
                        if(this.y+currentRow>=0 && this.x+currentCol>=1){

                            if( BOARD[this.y+currentRow][this.x + currentCol - 1] !== defaultColor ){
                                collison = true
                            }
                        }
                    }
                }
            }
            if(collison ==false) {
                clearStroke()
                this.undrawPiece()
                this.x--
                this.drawPiece()
                this.drawShadowPiece()
            
            }
           
        }
    }

    moveRight(){
        if(!this.collision()){
            //this.undrawPiece()
            let collison =false
            for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){
                for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                    if(this.activePiece[currentRow][currentCol]){
                        if( this.x + currentCol + 1 == numberOfSquaresX ){//colisão com o lado direito
                            collison =true
                        }

                        if(this.y+currentRow>=0 && this.x+currentCol>=-1){

                            if( BOARD[this.y+currentRow][this.x + currentCol + 1] !== defaultColor ){
                                collison = true
                            }
                        }
                    }
                }
            }
            if(collison ==false){ 
                clearStroke()
                this.undrawPiece()
                this.x++
                this.drawPiece()
                this.drawShadowPiece()
            }
            //this.drawPiece()
        }
    }

    swap(){
        this.undrawPiece()
        let nextPiece = this.piece[(this.pieceNumber + 1)% this.piece.length]
        let collision = false
        for(let currentRow=0; currentRow<nextPiece.length ;currentRow++){
            for(let currentCol=0; currentCol<nextPiece.length ;currentCol++){
                if(nextPiece[currentRow][currentCol]){
                    if( this.x + currentCol == numberOfSquaresX ){//colisão com o lado direito
                        collision =true
                    }

                    if( this.x + currentCol < 0 ){//colisão com o lado esquerdo
                        collision =true
                    }

                    if(this.y+currentRow>=0 && this.x+currentCol>=0){
                        
                        if( BOARD[this.y + currentRow][this.x + currentCol] !== defaultColor ){
                            collision = true
                        }
                    }
                }
            }
        }
        if(collision ==false ){
            clearStroke()
            this.pieceNumber = (this.pieceNumber + 1)% this.piece.length
            this.activePiece = this.piece[this.pieceNumber]
            this.drawShadowPiece()
        }
        this.drawPiece()

    }

    collision(){

        for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){ // loop sobre todos os quadrados da peça ativa
            for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                if(this.activePiece[currentRow][currentCol]){
                    
                    if(this.y+currentRow === numberOfSquaresY-1){ //colisão com a borda inferior
               
                        this.lockPieceInBoard()
                        return true
                    }

                    if(this.y+currentRow>=-1 && this.x+currentCol>=0){ // colisão com outras peças 
                        
                        const currentBoardCell = BOARD[this.y+currentRow+1][this.x+currentCol]
                        
                        if(currentBoardCell!==defaultColor){
         
                            this.lockPieceInBoard()
                            return true
                        }
                    }

                }
            }
        }
        return false
    }

    lockPieceInBoard(){
        for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){
            for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                if(this.activePiece[currentRow][currentCol]){
                    
                    if(this.y+currentRow>=0 && this.y+currentRow<numberOfSquaresY){
                        BOARD[this.y+currentRow][this.x+currentCol] = this.color
                    }

                }
            }
        }

        score+=100
        setScore(score)
        clearStroke()
        this.cleanLastRow()

    }


    verifyGameOver(){
  
        if(BOARD[0].some(cell=>cell!==defaultColor)){
           
            restartGame()
            score = 0
            setScore(score)
            gamePaused = true
            stopInterval()
            startElement.classList.remove('hidden')
        }
    }

    cleanLastRow(){
        let rowsFilled = []
        
        for(let currentRow=0; currentRow < numberOfSquaresY; currentRow++){
            if(BOARD[currentRow].every(cell=>cell!==defaultColor)){
                rowsFilled.push(currentRow)
            }
        }
        if(rowsFilled.length){
            for(let i=0; i<rowsFilled.length ;i++){
                let newRow = Array(numberOfSquaresX).fill(defaultColor)
                BOARD.splice(rowsFilled[i], 1)
                BOARD.unshift(newRow)
                score+=1000
                setScore(score)
            }
            drawBoard()
        }

    }

    moveDownFast(){
        speedInterval = 50
    }

    drawShadowPiece(){
        let lastPositionY =this.getLastPositionY()
        for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){
            for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                if(this.activePiece[currentRow][currentCol]){
                    drawStroke(this.x+currentCol, lastPositionY + currentRow, shadowPieceColor)
                }
            }
        }
    }



    getLastPositionY(){
        

        for(let y = this.y >= 0 ? this.y : 0; y < BOARD.length ;y++){
            
            for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){
                for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                    if(this.activePiece[currentRow][currentCol] && y+currentRow< BOARD.length){
                        
                        
                        if(BOARD[y+currentRow][this.x+currentCol] !==defaultColor ){
  
                            return y -1

                        }
                        if(BOARD.length-1 === y + currentRow){

                            return this.getLastPositionYReversed()
                        }
                    }
                }
            }

        }

    }

    getLastPositionYReversed(){
        for(let y = BOARD.length-1; y >= 0 ;y--){
            let verifyArr = []
            for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){
                for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                    if(this.activePiece[currentRow][currentCol] && y+currentRow< BOARD.length){
                        
                        if(BOARD[y+currentRow][this.x+currentCol] ===defaultColor ){
                            verifyArr.push(defaultColor)
                        }
                    }
                }
            }
             if(verifyArr.length === 4){
                 return y
            }
        }

    }


}