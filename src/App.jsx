//Option + ⌘ + J - for opening console in web-browser.
import { useState } from 'react';

function Square({value, onSquareClick}){
  const [value, setValue] = useState(Array(9).fill(null));

  function handleClick(){
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }

  return (
    <button className="board-row">
    <Square value={squares[0]} onSquareClick={handleClick} />
    </button>
  );
}

export default function board(){
  return (
    <>
    <div className="board-row">
      <Square value={squares[0]} />
      <Square value={squares[1]} />
      <Square value={squares[2]} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} />
      <Square value={squares[4]} />
      <Square value={squares[5]} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} />
      <Square value={squares[7]} />
      <Square value={squares[8]} />
    </div>
    </>
  );
}