
const canvas = document.getElementById('gameBoard')
const ctx = canvas.getContext('2d')
const startElement = document.getElementById('start')

const boxElement = document.getElementById('box')

const BOARD = []

const rectSize = 20
const numberOfSquaresX = 12
const numberOfSquaresY = 21
const boardHeight = rectSize*(numberOfSquaresY)
const boardWidth = rectSize*numberOfSquaresX

boxElement.style.height = rectSize*(numberOfSquaresY-1)+'px'

canvas.height = boardHeight
canvas.width = boardWidth

const defaultColor = '#111'
const defaultStrokeColor ='#222'
const shadowPieceColor = '#fff'

const scoreElement = document.getElementById('score')
const maxScoreElement = document.getElementById('max-score')
