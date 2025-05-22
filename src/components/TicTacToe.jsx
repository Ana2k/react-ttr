import { useState, useEffect, useRef } from 'react';
import './TicTacToe.css';

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
 * - theme: Object - Current theme colors
 * - isDrawerOpen: boolean - True if theme drawer is open
 * - isDragging: boolean - True if theme drawer is being dragged
 * - drawerRef: Ref object - Reference to the theme drawer
 * 
 * Manages the overall game state and history
 */
export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [theme, setTheme] = useState('default');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const drawerRef = useRef(null);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(square => square);
  const gameOver = winner || isDraw;

  const themes = {
    default: {
      name: 'Classic',
      colors: {
        '--bg-color': '#ffffff',
        '--text-color': '#333333',
        '--board-bg': '#ffffff',
        '--square-bg': '#ffffff',
        '--square-hover': '#f5f5f5',
        '--border-color': '#333333',
        '--x-color': '#E91E63',
        '--o-color': '#2196F3',
        '--button-bg': '#4CAF50',
        '--button-hover': '#45a049',
        '--restart-button-bg': '#f44336',
        '--restart-button-hover': '#d32f2f',
        '--shadow-color': 'rgba(0, 0, 0, 0.1)',
        '--status-color': '#333333',
        '--move-list-color': '#666666',
        '--move-list-hover': '#f0f0f0',
        '--title-color': '#333333',
        '--title-shadow': 'rgba(0, 0, 0, 0.1)',
        '--background-pattern': 'linear-gradient(135deg, #f5f5f5 25%, transparent 25%), linear-gradient(225deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(315deg, #f5f5f5 25%, #ffffff 25%)'
      }
    },
    dark: {
      name: 'Dark',
      colors: {
        '--bg-color': '#1a1a1a',
        '--text-color': '#ffffff',
        '--board-bg': '#2d2d2d',
        '--square-bg': '#2d2d2d',
        '--square-hover': '#3d3d3d',
        '--border-color': '#ffffff',
        '--x-color': '#FF4081',
        '--o-color': '#64B5F6',
        '--button-bg': '#388E3C',
        '--button-hover': '#2E7D32',
        '--restart-button-bg': '#EF5350',
        '--restart-button-hover': '#D32F2F',
        '--shadow-color': 'rgba(0, 0, 0, 0.3)',
        '--status-color': '#ffffff',
        '--move-list-color': '#b0b0b0',
        '--move-list-hover': '#3d3d3d',
        '--title-color': '#ffffff',
        '--title-shadow': 'rgba(0, 0, 0, 0.3)',
        '--background-pattern': 'linear-gradient(135deg, #2d2d2d 25%, transparent 25%), linear-gradient(225deg, #2d2d2d 25%, transparent 25%), linear-gradient(45deg, #2d2d2d 25%, transparent 25%), linear-gradient(315deg, #2d2d2d 25%, #1a1a1a 25%)'
      }
    },
    retro: {
      name: 'Retro',
      colors: {
        '--bg-color': '#000000',
        '--text-color': '#ffffff',
        '--board-bg': '#000000',
        '--square-bg': '#000000',
        '--square-hover': '#1a1a1a',
        '--border-color': '#00FF00',
        '--x-color': '#FFD700',
        '--o-color': '#00FF00',
        '--button-bg': '#FF00FF',
        '--button-hover': '#FF69B4',
        '--restart-button-bg': '#FF00FF',
        '--restart-button-hover': '#FF69B4',
        '--shadow-color': 'rgba(0, 255, 0, 0.3)',
        '--status-color': '#FFD700',
        '--move-list-color': '#00FF00',
        '--move-list-hover': '#1a1a1a',
        '--title-color': '#FFD700',
        '--title-shadow': 'rgba(0, 255, 0, 0.3)',
        '--background-pattern': 'linear-gradient(135deg, #1a1a1a 25%, transparent 25%), linear-gradient(225deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(315deg, #1a1a1a 25%, #000000 25%)'
      }
    },
    minimal: {
      name: 'Minimal',
      colors: {
        '--bg-color': '#f5f5f5',
        '--text-color': '#333333',
        '--board-bg': '#ffffff',
        '--square-bg': '#ffffff',
        '--square-hover': '#f0f0f0',
        '--border-color': '#cccccc',
        '--x-color': '#FF5722',
        '--o-color': '#009688',
        '--button-bg': '#757575',
        '--button-hover': '#616161',
        '--restart-button-bg': '#FF5722',
        '--restart-button-hover': '#F4511E',
        '--shadow-color': 'rgba(0, 0, 0, 0.1)',
        '--status-color': '#333333',
        '--move-list-color': '#757575',
        '--move-list-hover': '#f0f0f0',
        '--title-color': '#333333',
        '--title-shadow': 'rgba(0, 0, 0, 0.1)',
        '--background-pattern': 'linear-gradient(135deg, #e0e0e0 25%, transparent 25%), linear-gradient(225deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(315deg, #e0e0e0 25%, #f5f5f5 25%)'
      }
    },
    nature: {
      name: 'Nature',
      colors: {
        '--bg-color': '#E8F5E9',
        '--text-color': '#2E7D32',
        '--board-bg': '#ffffff',
        '--square-bg': '#ffffff',
        '--square-hover': '#F1F8E9',
        '--border-color': '#8BC34A',
        '--x-color': '#4CAF50',
        '--o-color': '#795548',
        '--button-bg': '#8BC34A',
        '--button-hover': '#7CB342',
        '--restart-button-bg': '#4CAF50',
        '--restart-button-hover': '#43A047',
        '--shadow-color': 'rgba(76, 175, 80, 0.2)',
        '--status-color': '#2E7D32',
        '--move-list-color': '#558B2F',
        '--move-list-hover': '#F1F8E9',
        '--title-color': '#2E7D32',
        '--title-shadow': 'rgba(76, 175, 80, 0.2)',
        '--background-pattern': 'linear-gradient(135deg, #C8E6C9 25%, transparent 25%), linear-gradient(225deg, #C8E6C9 25%, transparent 25%), linear-gradient(45deg, #C8E6C9 25%, transparent 25%), linear-gradient(315deg, #C8E6C9 25%, #E8F5E9 25%)'
      }
    },
    sunset: {
      name: 'Sunset',
      colors: {
        '--bg-color': '#FFF3E0',
        '--text-color': '#E65100',
        '--board-bg': '#ffffff',
        '--square-bg': '#ffffff',
        '--square-hover': '#FFECB3',
        '--border-color': '#FF5722',
        '--x-color': '#FF9800',
        '--o-color': '#9C27B0',
        '--button-bg': '#FF9800',
        '--button-hover': '#F57C00',
        '--restart-button-bg': '#FF5722',
        '--restart-button-hover': '#F4511E',
        '--shadow-color': 'rgba(255, 152, 0, 0.2)',
        '--status-color': '#E65100',
        '--move-list-color': '#FF5722',
        '--move-list-hover': '#FFECB3',
        '--title-color': '#E65100',
        '--title-shadow': 'rgba(255, 152, 0, 0.2)',
        '--background-pattern': 'linear-gradient(135deg, #FFE0B2 25%, transparent 25%), linear-gradient(225deg, #FFE0B2 25%, transparent 25%), linear-gradient(45deg, #FFE0B2 25%, transparent 25%), linear-gradient(315deg, #FFE0B2 25%, #FFF3E0 25%)'
      }
    }
  };

  useEffect(() => {
    const selectedTheme = themes[theme].colors;
    Object.entries(selectedTheme).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  }, [theme]);

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
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

  const handleDrawerClick = (e) => {
    // Prevent clicks from bubbling up to parent elements
    e.stopPropagation();
    
    // If clicking on the drawer itself (not its children), toggle it
    if (e.target === drawerRef.current) {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  const handleThemeOptionClick = (e, themeName) => {
    e.stopPropagation();
    selectTheme(themeName);
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDrawerOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen]);

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      
      <button className="theme-toggle" onClick={toggleDrawer} aria-label="Toggle theme drawer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      </button>

      <div 
        ref={drawerRef}
        className={`theme-drawer ${isDrawerOpen ? 'open' : ''}`}
        onClick={handleDrawerClick}
      >
        <h3>Select Theme</h3>
        {Object.entries(themes).map(([key, themeData]) => (
          <div
            key={key}
            className={`theme-option ${theme === key ? 'selected' : ''}`}
            onClick={(e) => handleThemeOptionClick(e, key)}
          >
            <div className="theme-preview">
              <div className="preview-x" style={{ color: themeData.colors['--x-color'] }}>X</div>
              <div className="preview-o" style={{ color: themeData.colors['--o-color'] }}>O</div>
            </div>
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