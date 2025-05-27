//Option + ⌘ + J - for opening console in web-browser.
//To remember things componenets use states.
import { useState } from 'react';

function Square(){
  //value here will start off as equal to null.
  const [value,setValue] = useState(null); 
  function handleClick(){
    //setvalue from onclick means - react re-renders the square whenever it is being clicked.
    setValue("X");
  }

  return (
    <button className="square" onClick={handleClick}>{value}</button>
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