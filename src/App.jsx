//Option + ⌘ + J - for opening console in web-browser.
//To remember things componenets use states.
import { useState } from 'react';

//To check for the winner of the tic-tac-toe game the Board would somehow need to know state of each of the 9 components.

//store game's state in the parent board's component.

//board component can tell each square what to display by passing a prop.

//Have two child components communicate with each other.

//Parent component can pass state back down to the children.

function Square(){
  //value here will start off as equal to null.
  const [value,setValue] = useState(Array(9).fill(null));

  function handleClick(){
    //setvalue from onclick means - react re-renders the square whenever it is being clicked.
    setValue("X");
  }

  return (
    <button className="square">{value}</button>
  );
}

export default function Board(){
  const [squares,setSquares] = useState(Array(9).fill(null));
  return (
    <>
    <div className="board-row">
      <Square value={squares[0]}/>
      <Square value={squares[1]}/>
      <Square value={squares[2]}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]}/>
      <Square value={squares[4]}/>
      <Square value={squares[5]}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]}/>
      <Square value={squares[7]}/>
      <Square value={squares[8]}/>
    </div>
    </>
  );
}