function resetGameStatus() {
    activePlayer = 0
    currentRound = 1
    gameIsOver = false
    gameOverElement.firstElementChild.innerHTML = 'You won, <span>Player Name</span>!'
    gameOverElement.style.display = 'none'

    let gameBoardIndex = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0
            const gameBordItemElement = gameBoardElement.children[gameBoardIndex]
            gameBordItemElement.textContent = ''
            gameBordItemElement.classList.remove('disabled')
            gameBoardIndex++
        }
    }
}

function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set player names for both players!')
        return
    }

    resetGameStatus()

    activePlayerElement.textContent = players[activePlayer].name
    gameAreaElement.style.display = 'block'
}

function checkForGameOver() {
    // rows check
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && 
            gameData[i][0] === gameData[i][1] && 
            gameData[i][1] === gameData[i][2]
        ) {
            return gameData[i][0]
        }
    }

    //columns check
    for (let j = 0; j < 3; j++) {
        if (gameData[0][j] > 0 &&
            gameData[0][j] === gameData[1][j] &&
            gameData[1][j] === gameData[2][j]
        ) {
            return gameData[0][j]
        }
    }

    // diagonal: top left to bottom right
    if (
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0]
    }

    // diagonal: bottom left to top right
    if (
        gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0]
    }

    if (currentRound === 9) {
        return -1
    }
    return 0
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1
    } else {
        activePlayer = 0
    }

    activePlayerElement.textContent = players[activePlayer].name
}

function selectGameField(event) {
    const selectedField = event.target
    const selectedColumn = selectedField.dataset.col - 1
    const selectedRow = selectedField.dataset.row - 1

    if (gameData[selectedRow][selectedColumn] > 0 || gameIsOver) {
        return
    }

    selectedField.textContent = players[activePlayer].symbol
    selectedField.classList.add('disabled')

    
    gameData[selectedRow][selectedColumn] = activePlayer + 1

    const winnerId = checkForGameOver()

    if (winnerId !== 0 ) {
        endGame(winnerId)
    }

    currentRound++
    switchPlayer()
}

function endGame(winnerId) {
    gameIsOver = true
    gameOverElement.style.display = 'block'

    if (winnerId > 0) {
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnerId - 1].name
    } else {
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!'
    }
}