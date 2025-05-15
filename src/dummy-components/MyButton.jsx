import React, { useState } from 'react'
//react componenets name with capital letter while, 

function MyButton({ itemName }) {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid #646cff', borderRadius: '8px' }}>
      <h3>{itemName}</h3>
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
    </div>
  );
}

export default MyButton;
