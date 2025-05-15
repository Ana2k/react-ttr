import React, { useState } from 'react'
//react componenets name with capital letter while, 

function MyButton(){
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count+1);
  }
  return (
    <button onClick={handleClick}>
      Clicked me {count} times haven't you? 🫦
      Go ahead once more 😉
    </button>
  );
}

export default MyButton;
