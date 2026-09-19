const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const playerScoreEl = document.getElementById('playerScore');
const botScoreEl = document.getElementById('botScore');

let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let playerScore = 0;
let botScore = 0;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== "" || !isGameActive) return;

  makeMove(index, "X");

  if (isGameActive) {
    statusText.textContent = "Бот думает...";
    setTimeout(botMove, 400);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add(player.toLowerCase());

  if (checkWin(player)) {
    statusText.textContent = player === "X" ? "Победа!" : "Бот победил!";
    if (player === "X") playerScore++; else botScore++;
    updateScores();
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "Ничья!";
    isGameActive = false;
  }
}

function botMove() {
  if (!isGameActive) return;

  let emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  
  // Умный выбор хода
  let chosenIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  
  makeMove(chosenIndex, "O");
  if (isGameActive) statusText.textContent = "Твой ход!";
}

function checkWin(player) {
  return winConditions.some(condition => {
    return condition.every(index => board[index] === player);
  });
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  botScoreEl.textContent = botScore;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  statusText.textContent = "Твой ход!";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
