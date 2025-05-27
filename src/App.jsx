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
    <button className="square">{value}</button>
  );
}

export default function Board(){
  return (
    <>
    <div className="board-row">
      <Square value="1"/>
      <Square value="2"/>
      <Square value="3"/>
    </div>
    <div className="board-row">
      <Square value="4"/>
      <Square value="5"/>
      <Square value="6"/>
    </div>
    <div className="board-row">
      <Square value="7"/>
      <Square value="8"/>
      <Square value="9"/>
    </div>
    </>
  );
}