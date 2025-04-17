let board: string[] = ["", "", "", "", "", "", "", "", ""]; 
let currentPlayer: string = "X"; 
let gameActive: boolean = true; 

const scoreXEl = document.getElementById("score-x");
const scoreOEl = document.getElementById("score-o");

const squares = document.querySelectorAll(".square");
const resetButton = document.getElementById("reset-btn");

squares.forEach((square, index) => {
  const htmlSquare = square as HTMLElement;
  htmlSquare.addEventListener("click", () => handleClick(index));
});

if (resetButton) {
  resetButton.addEventListener("click", resetGame);
}

function handleClick(index: number): void {
  if (gameActive && board[index] === "") {
    board[index] = currentPlayer;
    updateBoard();

    if (checkWinner()) {
      gameActive = false;
      setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (board.every((cell) => cell !== "")) {
      gameActive = false;
      setTimeout(() => alert("It's a draw!"), 100);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function updateBoard(): void {
  board.forEach((cell, index) => {
    (squares[index] as HTMLElement).textContent = cell;
  });
}

function checkWinner(): boolean {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], 
  ];

  return winPatterns.some(
    (pattern) =>
      board[pattern[0]] === currentPlayer &&
      board[pattern[1]] === currentPlayer &&
      board[pattern[2]] === currentPlayer
  );
}

function resetGame(): void {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  updateBoard();
}
