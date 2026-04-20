const boxes = document.querySelectorAll(".box");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Add click events
boxes.forEach(box => {
  box.addEventListener("click", handleClick);
});

function handleClick() {
  const index = this.dataset.index;

  // Prevent overwrite & stop after game ends
  if (board[index] !== "" || !gameActive) return;

  // Put X or O
  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  // Check winner BEFORE switching
  if (checkWinner()) return;

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer} Turn`;
}

// Winner logic
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      statusText.textContent = `🏆 Winner: Player ${board[a]}`;
      gameActive = false;
      return true;
    }
  }

  // Draw condition
  if (!board.includes("")) {
    statusText.textContent = "😐 It's a Draw!";
    gameActive = false;
    return true;
  }

  return false;
}

// Reset game
resetBtn.addEventListener("click", resetGame);

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  statusText.textContent = "Player X Turn";

  boxes.forEach(box => {
    box.textContent = "";
  });
}