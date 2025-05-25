const letterBox = document.getElementById('letter');
const scoreText = document.getElementById('score');
const timeText = document.getElementById('time');
const message = document.getElementById('message');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');

let score = 0;
let time = 30;
let timer;
let currentLetter = '';
let running = false;

function getRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
}

function newLetter() {
  currentLetter = getRandomLetter();
  letterBox.textContent = currentLetter;
}

function updateTime() {
  time--;
  timeText.textContent = time;
  if (time <= 0) endGame();
}

function startGame() {
  if (running) return;
  running = true;
  score = 0;
  time = 30;
  scoreText.textContent = score;
  timeText.textContent = time;
  message.textContent = 'Type the letter shown!';
  newLetter();
  timer = setInterval(updateTime, 1000);
}

function endGame() {
  clearInterval(timer);
  running = false;
  message.textContent = `Time's up! Your score is ${score}.`;
  currentLetter = '';
  letterBox.textContent = 'Click Start';
}

function resetGame() {
  clearInterval(timer);
  running = false;
  score = 0;
  time = 30;
  scoreText.textContent = 0;
  timeText.textContent = 30;
  letterBox.textContent = '?';
  message.textContent = 'Press Start to begin';
}

document.addEventListener('keydown', e => {
  if (!running) return;
  if (e.key.toUpperCase() === currentLetter) {
    score++;
    scoreText.textContent = score;
    newLetter();
  }
});

startBtn.onclick = startGame;
resetBtn.onclick = resetGame;
