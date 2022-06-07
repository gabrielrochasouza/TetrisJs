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
                    drawSquare(this.x+currentCol,this.y+currentRow,this.color)
                }
            }
        }
    }

    undrawPiece(){
        for(let currentRow=0; currentRow<this.activePiece.length ;currentRow++){
            for(let currentCol=0; currentCol<this.activePiece.length ;currentCol++){
                if(this.activePiece[currentRow][currentCol]){
                    drawSquare(this.x+currentCol,this.y+currentRow,defaultColor)
                }
            }
        }
    }

    moveDown(){
        if(!this.collision()){
            this.undrawPiece()
            this.y++
            this.drawPiece()
        }else{
            this.verifyGameOver()
        }
    }

    moveLeft(){
        if(!this.collision()){
           // this.undrawPiece()
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
            
                this.undrawPiece()
                this.x--
                this.drawPiece()
            
            }
            //this.drawPiece()
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
                
                this.undrawPiece()
                this.x++
                this.drawPiece()
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
            this.pieceNumber = (this.pieceNumber + 1)% this.piece.length
            this.activePiece = this.piece[this.pieceNumber]
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
        this.cleanLastRow()
        //this.verifyGameOver()
    }


    verifyGameOver(){
  
        if(BOARD[0].some(cell=>cell!==defaultColor)){
           
            restartGame()
            score = 0
            setScore(score)
     
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
            }
            drawBoard()
        }

    }

    moveDownFast(){
        speedInterval = 50
    }


}