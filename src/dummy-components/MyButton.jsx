import React, { useState } from 'react'
//react componenets name with capital letter while, 

function MyButton({ count, onClick}){
  return (
    <button onClick = {onClick}>
      Clicked {count} times.
    </button>
  )
}
