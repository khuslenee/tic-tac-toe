document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusElement = document.getElementById("status");
  const resetButton = document.getElementById("reset-button");
  const xWinsElement = document.getElementById("x-wins");
  const oWinsElement = document.getElementById("o-wins");

  let currentPlayer = "x";
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  // Add win counters
  let winCounts = { x: 0, o: 0 };

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (e) => {
    const index = e.target.dataset.index;

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    e.target.classList.add(currentPlayer);
    e.target.textContent = currentPlayer.toUpperCase();

    if (checkWin()) {
      statusElement.textContent = `${currentPlayer.toUpperCase()} wins!`;
      winCounts[currentPlayer]++;
      updateScoreboard();
      gameActive = false;
      return;
    }

    if (board.every((cell) => cell)) {
      statusElement.textContent = "It's a tie!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    statusElement.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
  };

  const checkWin = () => {
    return winningConditions.some((condition) => {
      return condition.every((index) => board[index] === currentPlayer);
    });
  };

  const resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.classList.remove("x", "o");
      cell.textContent = "";
    });
    currentPlayer = "x";
    statusElement.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
    gameActive = true;
  };

  const updateScoreboard = () => {
    xWinsElement.textContent = winCounts.x;
    oWinsElement.textContent = winCounts.o;
  };

  cells.forEach((cell) => cell.addEventListener("click", handleClick));
  resetButton.addEventListener("click", resetGame);
});
