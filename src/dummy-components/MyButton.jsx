import React from 'react'
//react componenets name with capital letter while, 
function MyButton(){
  function handleClick(){
    alert("You clicked me...")
  }
  return (
    <button onClick = {handleClick}>
      Click me.
    </button>
  )
}
