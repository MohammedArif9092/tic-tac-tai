import React, { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import { checkWinner } from './Utils/Winner';

import { getAIMoverFromOpenRouter } from './Utils/aiOpenRouter';

const App = () => {
  // state for the 3x3 board (9 cells)
  const [board, setBoard] = useState(Array(9).fill(null));

  // Is it the player's turn?
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // Who won? ("X", "O", or "Draw")
  const [winner, setWinner] = useState(null);

  // Score tracking
  const [score, setScore] = useState({ X: 0, O: 0 });

  // When a player clicks a square
  const handleClick = (i) => {
    if (!isPlayerTurn || board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if(winner) return //prevent double  scoring


    //check if some has won
    const result = checkWinner(board);

if(result?.winner){
  setWinner(result.winner );
  if (result?.winner === "X" || result.winner === "O") {
  setScore((prev) => ({
    ...prev,
    [result.winner]: prev[result.winner] + 1
  }));

  return;
}
}

    // If it's AI's turn and the game is not over
    if (!isPlayerTurn && !winner) {
      const aiTurn = async () => {
        const move = await getAIMoverFromOpenRouter(board);

        if (move !== null && board[move] === null) {
          const newBoard = [...board];
          newBoard[move] = 'O';
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      };

      const timeout = setTimeout(aiTurn, 600);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn, winner]);


  // Restart the Game

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  }

  return (
    <div className='min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold mb-4'>TIC TAC TAI 🤖</h1>
      <ScoreBoard score={score} />
      <GameBoard board={board} handleClick={handleClick} />

      {winner && (
        <div className='mt-4  text-xl '>
          {winner === "Drew" ? "its a draw" : `${winner} wins!`}
          <button onClick={restartGame}
          className='ml-4 px-4 py-2 bg-[#38BDF8] text-black rounded hover:bg-[#0EASE9]'>
            play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
