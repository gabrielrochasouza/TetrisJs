const drawBoard = () => {
  for (let currentRow = 0; currentRow < numberOfSquaresY; currentRow++) {
    for (let currentCol = 0; currentCol < numberOfSquaresX; currentCol++) {
      drawSquare(currentCol, currentRow, BOARD[currentRow][currentCol], ctx);
    }
  }
};

const drawSideCanvas = () => {
  for (
    let currentRow = 0;
    currentRow < sideCanvasNumberOfSquaresY;
    currentRow++
  ) {
    for (
      let currentCol = 0;
      currentCol < sideCanvasNumberOfSquaresX;
      currentCol++
    ) {
      drawSquareWithoutStroke(
        currentCol,
        currentRow,
        defaultColor,
        ctxSideCanvas
      );
    }
  }
};

const drawSecondSelectedPiece = () => {
  for (let i = 1; i < piecesSelected.length; i++) {
    const pieceToBeDraw = piecesSelected[i][0][0];
    const colorToBeDraw = piecesSelected[i][1];

    const spaceFromBorderX = 1;
    const spaceBetweenPieces = i === 0 ? 2 : 3;
    const spaceFromBorderY = 4 * (i - 1) + spaceBetweenPieces;

    for (let currentRow = 0; currentRow < pieceToBeDraw.length; currentRow++) {
      for (
        let currentCol = 0;
        currentCol < pieceToBeDraw.length;
        currentCol++
      ) {
        if (pieceToBeDraw[currentRow][currentCol] !== 0) {
          drawSquare(
            currentCol + spaceFromBorderX,
            currentRow + spaceFromBorderY,
            colorToBeDraw,
            ctxSideCanvas
          );
        }
      }
    }
  }
};
const drawSquareWithoutStroke = (x, y, color, ctx) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * rectSize, y * rectSize, rectSize, rectSize);
  ctx.strokeStyle = color;
  ctx.strokeRect(x * rectSize, y * rectSize, rectSize, rectSize);
};

drawSquareWithDefaultStroke = (x, y, ctx)=>{
  ctx.fillStyle = defaultColor;
  ctx.fillRect(x * rectSize, y * rectSize, rectSize, rectSize);
  ctx.strokeStyle = defaultStrokeColor;
  ctx.strokeRect(x * rectSize, y * rectSize, rectSize, rectSize);
}

const drawSquare = (x, y, color, ctx) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * rectSize, y * rectSize, rectSize, rectSize);
  if (color !== defaultColor) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x * rectSize + 2, y * rectSize + 2, 1, 5);
    ctx.fillRect(x * rectSize + 2, y * rectSize + 2, 3, 1);
  }
  ctx.strokeStyle = defaultStrokeColor;
  ctx.strokeRect(x * rectSize, y * rectSize, rectSize, rectSize);
};

const getSelectedPieces = () => {
  for (let i = 0; i < 1 + numberOfSidePieces; i++) {
    const randomNum = Math.floor(Math.random() * PIECES.length);
    piecesSelected.push([PIECES[randomNum], colors[randomNum], randomNum]);
  }
};

const updateSelectedPieces = () => {
  const randomNum = Math.floor(Math.random() * PIECES.length);
  piecesSelected.push([PIECES[randomNum], colors[randomNum], randomNum]);
  piecesSelected.shift();
};

const getRandomPiece = () => {
  updateSelectedPieces();
  const currentPiece = piecesSelected[0];

  return [currentPiece[0], currentPiece[1]];
};

const generateNewPiece = () => {
  const [newTetromino, color] = getRandomPiece();
  const newPiece = new Piece(
    Math.round(BOARD[0].length / 2),
    -2,
    newTetromino,
    color
  );

  drawSideCanvas();
  if (gamePaused === false) drawSecondSelectedPiece();

  return newPiece;
};

const restartGame = () => {
  for (let currentRow = 0; currentRow < numberOfSquaresY; currentRow++) {
    BOARD[currentRow] = [];
    for (let currentCol = 0; currentCol < numberOfSquaresX; currentCol++) {
      BOARD[currentRow][currentCol] = defaultColor;
    }
  }
  setScore(0);
  drawBoard();
  drawSideCanvas();
  clearStroke();
};

const setScore = (score) => {
  scoreElement.innerText = score;
  velocityElement.innerText =
    " " + normalSpeedInterval > 300
      ? "(velocidade lenta)"
      : normalSpeedInterval === maximumNormalSpeedInterval
      ? "(velocidade máxima)"
      : "(velocidade rápida)";
  if (score > level * 10000) {
    level++;
    if (normalSpeedInterval > maximumNormalSpeedInterval)
      normalSpeedInterval -= 50;
  }
  if (score > maxScore) {
    maxScore = score;
    maxScoreElement.innerText = maxScore;
    localStorage.setItem("@Max-score", maxScore);
  } else {
    maxScoreElement.innerText = maxScore;
  }
  levelElement.innerText = level;
};

let interval;

const startInterval = (speed) => {
  interval = setInterval(() => {
    newPiece.moveDown();
    if (newPiece.collision()) {
      stopInterval();
      startInterval(normalSpeedInterval);
      newPiece = generateNewPiece();
    }
  }, speed);
};

const restartIntervalWithfastSpeed = () => {
  interval = setInterval(() => {
    newPiece.moveDown();
    if (newPiece.collision()) {
      stopInterval();
      startInterval(normalSpeedInterval);
      newPiece = generateNewPiece();
    }
  }, fastSpeedInterval);
};

const stopInterval = () => {
  clearInterval(interval);
};

const drawStroke = (x, y, color) => {
  ctx.strokeStyle = color;
  ctx.strokeRect(x * rectSize, y * rectSize, rectSize, rectSize);
};

const clearStroke = () => {
  for (let currentRow = 0; currentRow < numberOfSquaresY; currentRow++) {
    for (let currentCol = 0; currentCol < numberOfSquaresX; currentCol++) {
      drawStroke(currentCol, currentRow, defaultStrokeColor);
    }
  }
};

const showStartGame = () => {};
