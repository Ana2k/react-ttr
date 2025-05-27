//Option + ⌘ + J - for opening console in web-browser.
import { useState } from 'react';

function Square({value}){
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(){
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }

  return (
    <button className="square">1</button>
  );
}

export default function Board({value}){
  return (
    <>
    <div className="board-row">
      <Square />
      <Square/>
      <Square />
    </div>
    <div className="board-row">
      <Square />
      <Square />
      <Square />
    </div>
    <div className="board-row">
      <Square />
      <Square />
      <Square />
    </div>
    </>
  );
}