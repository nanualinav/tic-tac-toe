const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

let editedPlayer = 0
let activePlayer = 0
let currentRound = 1
let gameIsOver = false

const players = [
    {
        name: '', 
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
]

const playerConfigOverlayElement = document.getElementById('config-overlay')
const backdropElement = document.getElementById('backdrop')
const formElement = document.querySelector('form')
const errorsOutputElement = document.getElementById('config-errors')
const gameAreaElement = document.getElementById('active-game')
const activePlayerElement = document.getElementById('active-player-name')
const gameOverElement = document.getElementById('game-over')
const gameBoardElement = document.getElementById('game-board')

const editPlayerOneBtnElement = document.getElementById('edit-player-1-btn')
const editPlayerTwoBtnElement = document.getElementById('edit-player-2-btn')
const cancelConfigBtnElement = document.getElementById('cancel-config-btn')
const startNewGameBtnElement = document.getElementById('start-game-btn')
const gameFieldElements = document.querySelectorAll('#game-board li')

editPlayerOneBtnElement.addEventListener('click', openPlayerConfig)
editPlayerTwoBtnElement.addEventListener('click', openPlayerConfig)
cancelConfigBtnElement.addEventListener('click', closePlayerConfig)
backdropElement.addEventListener('click', closePlayerConfig)

formElement.addEventListener('submit', savePlayerConfig)

startNewGameBtnElement.addEventListener('click', startNewGame)

for (const element of gameFieldElements) {
    element.addEventListener('click', selectGameField)
}