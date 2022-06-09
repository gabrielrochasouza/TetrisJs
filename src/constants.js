
const canvas = document.getElementById('gameBoard')
const sideCanvas = document.getElementById('side-canvas')
const ctx = canvas.getContext('2d')
const startElement = document.getElementById('start')

const ctxSideCanvas = sideCanvas.getContext('2d')

const boxElement = document.getElementById('box')

const BOARD = []
const SIDE_CANVAS_BOARD = []

const piecesSelected = []

const rectSize = 20
const numberOfSquaresX = 12
const numberOfSquaresY = 21
const boardHeight = rectSize*numberOfSquaresY
const boardWidth = rectSize*numberOfSquaresX

const sideCanvasNumberOfSquaresX = 6
const sideCanvasNumberOfSquaresY = 5



boxElement.style.height = rectSize*(numberOfSquaresY-1)+'px'
boxElement.style.width = boardWidth+'px'

canvas.height = boardHeight
canvas.width = boardWidth

sideCanvas.height = sideCanvasNumberOfSquaresY*rectSize
sideCanvas.width = sideCanvasNumberOfSquaresX*rectSize

const defaultColor = '#111'
const defaultStrokeColor ='#222'
const shadowPieceColor = '#fff'

const scoreElement = document.getElementById('score')
const maxScoreElement = document.getElementById('max-score')
