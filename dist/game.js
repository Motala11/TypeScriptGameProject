"use strict";
let board = ["", "", "", "", "", "", "", "", ""]; 
let currentPlayer = "X"; 
let gameActive = true;

const squares = document.querySelectorAll(".square");
const resetButton = document.getElementById("reset-btn");

squares.forEach((square, index) => {
    const htmlSquare = square;
    htmlSquare.addEventListener("click", () => handleClick(index));
});

if (resetButton) {
    resetButton.addEventListener("click", resetGame);
}

function handleClick(index) {
    if (gameActive && board[index] === "") {
        board[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            gameActive = false;
            setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        }
        else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function updateBoard() {
    board.forEach((cell, index) => {
        squares[index].textContent = cell;
    });
}

function checkWinner() {
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
    return winPatterns.some((pattern) => board[pattern[0]] === currentPlayer &&
        board[pattern[1]] === currentPlayer &&
        board[pattern[2]] === currentPlayer);
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    updateBoard();
}
