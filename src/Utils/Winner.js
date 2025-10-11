export const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Loop through each winning combination
  for (let line of lines) {
    const [a, b, c] = line;

    // Check if:
    // 1. There is something in board[a] (not null)
    // 2. board[a] == board[b]
    // 3. board[a] == board[c]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  // If no winner but all cells are filled, it's a draw
  if (board.every((cell) => cell !== null)) {
    return { winner: 'Draw', line: [] };
  }

  // No winner and the board is not full yet → game continues
  return null;
};
