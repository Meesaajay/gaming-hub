const playerOne = document.querySelector('.playerOne')
const playerTwo = document.querySelector('.playerTwo')
const resultMessage = document.getElementById('resultMessage')
const timeLeftDisplay = document.getElementById('timeLeft')
const startButton = document.getElementById('startGame')
const resetButton = document.getElementById('resetGame')

let playerOnePosition = 0
let playerTwoPosition = 0
const finishLinePosition = 520
let isGameOver = false
let timeLeft = 10
let countdownInterval = null
let gameStarted = false

function updatePosition(runner, position) {
  runner.style.left = position + 'px'
}

function resetGame() {
  playerOnePosition = 0
  playerTwoPosition = 0
  isGameOver = false
  gameStarted = false
  timeLeft = 10
  updatePosition(playerOne, playerOnePosition)
  updatePosition(playerTwo, playerTwoPosition)
  resultMessage.textContent = ''
  timeLeftDisplay.textContent = 'Time: ' + timeLeft
  startButton.disabled = false
  resetButton.disabled = true
}

function checkForWinner() {
  if (playerOnePosition >= finishLinePosition) {
    resultMessage.textContent = 'Player 1 Wins! 🎉'
    endGame()
  } else if (playerTwoPosition >= finishLinePosition) {
    resultMessage.textContent = 'Player 2 Wins! 🎉'
    endGame()
  }
}

function endGame() {
  isGameOver = true
  clearInterval(countdownInterval)
  resetButton.disabled = false
  startButton.disabled = true
}

function countdownTimer() {
  if (timeLeft > 0) {
    timeLeft--
    timeLeftDisplay.textContent = 'Time: ' + timeLeft
  } else {
    endGame()
    decideWinnerByDistance()
  }
}

function decideWinnerByDistance() {
  if (playerOnePosition > playerTwoPosition) {
    resultMessage.textContent = "Time's up! Player 1 Wins! 🎉"
  } else if (playerTwoPosition > playerOnePosition) {
    resultMessage.textContent = "Time's up! Player 2 Wins! 🎉"
  } else {
    resultMessage.textContent = "It's a tie! 🤝"
  }
}

window.addEventListener('keydown', (event) => {
  if (!gameStarted || isGameOver) return

  const pressedKey = event.key.toLowerCase()
  if (pressedKey === 'a') {
    playerOnePosition += 15
    updatePosition(playerOne, playerOnePosition)
    checkForWinner()
  } else if (pressedKey === 'l') {
    playerTwoPosition += 15
    updatePosition(playerTwo, playerTwoPosition)
    checkForWinner()
  }
})

startButton.addEventListener('click', () => {
  if (gameStarted) return
  gameStarted = true
  startButton.disabled = true
  resetButton.disabled = false
  resultMessage.textContent = ''
  countdownInterval = setInterval(countdownTimer, 1000)
})

resetButton.addEventListener('click', resetGame)

resetGame()
