import { useState } from 'react';
import '../styles/TicTacToe.css';

/**
 * Square Component
 * -----------------
 * Props:
 * - value: string | null - The content to display in the square ('X', 'O', or null)
 * - onSquareClick: function - Callback function when square is clicked
 * 
 * Renders a single square in the tic-tac-toe grid that can be clicked to make a move
 */
function Square({value, onSquareClick}){
  const color = value === 'X' ? 'var(--x-color)' : value === 'O' ? 'var(--o-color)' : 'inherit';
  return (
    <button className='square' style={{ color }} onClick={onSquareClick}>
      {value}
    </button>
  );
}

/**
 * Board Component
 * --------------
 * Props:
 * - xIsNext: boolean - Indicates if it's X's turn (true) or O's turn (false)
 * - squares: Array(9) - Current state of the board, array of 9 elements (null, 'X', or 'O')
 * - onPlay: function - Callback function to handle a move
 * 
 * Manages the game board, handles moves, and displays the current game status
 */
function Board({ xIsNext, squares, onPlay}){
  function handleClick(i){
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  let status;
  let statusColor;
  if(winner){
    status = "Winner: "+winner;
    statusColor = winner === "X" ? "var(--x-color)" : "var(--o-color)";
  }else{
    status = "Next Player: "+(xIsNext?"X":"O");
    statusColor = xIsNext ? "var(--x-color)" : "var(--o-color)";
  }

  return(
    <>
      <div className="status" style={{ color: statusColor }}>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/**
 * TicTacToe Component (Main Component)
 * -----------------------------------
 * State Variables:
 * - history: Array - Array of board states, each state is an array of 9 elements
 * - currentMove: number - Index of the current move in history
 * - xIsNext: boolean - Derived state, true if it's X's turn
 * - currentSquares: Array - Current board state from history
 * - winner: string | null - Current winner ('X', 'O', or null)
 * - isDraw: boolean - True if game is a draw
 * - gameOver: boolean - True if game is won or drawn
 * 
 * Manages the overall game state and history
 */
export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(square => square);
  const gameOver = winner || isDraw;

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button 
          className="move-button"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button 
          className="restart-button"
          onClick={handleRestart}
        >
          Restart Game
        </button>
        <ol className="move-list">{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
} 