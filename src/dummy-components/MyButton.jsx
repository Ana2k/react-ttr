import React, { useState } from 'react'


function MyButton({ count, onClick}){
  return (
    <button onClick = {onClick}>
      Clicked {count} times.
    </button>
  )
}
