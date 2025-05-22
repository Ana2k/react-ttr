import { useState, useEffect } from 'react';
import './App.css';

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
  return (
    <button className='square' onClick={onSquareClick}>
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
  /**
   * handleClick
   * ----------
   * Parameters:
   * - i: number - Index of the clicked square (0-8)
   * 
   * Handles the logic when a square is clicked:
   * 1. Checks if move is valid
   * 2. Creates new board state
   * 3. Places X or O
   * 4. Calls onPlay with new state
   */
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
  if(winner){
    status = "Winner: "+winner;
  }else{
    status = "Next Player: "+(xIsNext?"X":"O");
  }

  return(
    <>
      <div className="status">{status}</div>
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
 * Game Component (Main Component)
 * -----------------------------
 * State Variables:
 * - history: Array - Array of board states, each state is an array of 9 elements
 * - currentMove: number - Index of the current move in history
 * - xIsNext: boolean - Derived state, true if it's X's turn
 * - currentSquares: Array - Current board state from history
 * - winner: string | null - Current winner ('X', 'O', or null)
 * - isDraw: boolean - True if game is a draw
 * - gameOver: boolean - True if game is won or drawn
 * - theme: Object - Current theme colors
 * - isDrawerOpen: boolean - True if theme drawer is open
 * 
 * Manages the overall game state and history
 */
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [theme, setTheme] = useState('default');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(square => square);
  const gameOver = winner || isDraw;

  const themes = {
    default: {
      name: 'Default',
      colors: {
        '--x-color': '#2196F3',
        '--o-color': '#F44336',
        '--board-bg': '#ffffff',
        '--border-color': '#333333'
      }
    },
    dark: {
      name: 'Dark',
      colors: {
        '--x-color': '#64B5F6',
        '--o-color': '#EF5350',
        '--board-bg': '#2d2d2d',
        '--border-color': '#ffffff'
      }
    },
    retro: {
      name: 'Retro',
      colors: {
        '--x-color': '#FFD700',
        '--o-color': '#FF69B4',
        '--board-bg': '#000000',
        '--border-color': '#00FF00'
      }
    },
    minimal: {
      name: 'Minimal',
      colors: {
        '--x-color': '#000000',
        '--o-color': '#666666',
        '--board-bg': '#ffffff',
        '--border-color': '#cccccc'
      }
    }
  };

  useEffect(() => {
    const selectedTheme = themes[theme].colors;
    Object.entries(selectedTheme).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  }, [theme]);

  /**
   * handlePlay
   * ----------
   * Parameters:
   * - nextSquares: Array - New board state after a move
   * 
   * Updates game history with new move and advances current move
   */
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  /**
   * handleRestart
   * ------------
   * Resets the game to initial state:
   * - Clears history to initial empty board
   * - Resets current move to 0
   */
  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  /**
   * jumpTo
   * ------
   * Parameters:
   * - nextMove: number - Move number to jump to
   * 
   * Allows going back to a previous move in the game history
   */
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  /**
   * moves
   * -----
   * Creates a list of buttons to navigate through game history
   * Each button allows jumping to a specific move
   */
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to Move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const selectTheme = (themeName) => {
    setTheme(themeName);
    setIsDrawerOpen(false);
  };

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      
      <button className="theme-toggle" onClick={toggleDrawer} aria-label="Toggle theme drawer">
        <svg viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
      </button>

      <div className={`theme-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <h3>Select Theme</h3>
        {Object.entries(themes).map(([key, themeData]) => (
          <div
            key={key}
            className={`theme-option ${theme === key ? 'selected' : ''}`}
            onClick={() => selectTheme(key)}
          >
            <div
              className="theme-preview"
              style={{
                background: themeData.colors['--board-bg'],
                borderColor: themeData.colors['--border-color']
              }}
            />
            {themeData.name}
          </div>
        ))}
      </div>

      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {gameOver && (
          <button className="restart-button" onClick={handleRestart}>
            Restart Game
          </button>
        )}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/**
 * calculateWinner
 * --------------
 * Parameters:
 * - squares: Array - Current board state
 * 
 * Returns:
 * - string | null - 'X' or 'O' if there's a winner, null if no winner
 * 
 * Checks all possible winning combinations:
 * - 3 rows
 * - 3 columns
 * - 2 diagonals
 */
function calculateWinner(squares){
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];
  for (let i=0;i<lines.length;i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
}
