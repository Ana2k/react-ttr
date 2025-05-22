import {useState} from 'react';
import MyButton from './dummy-components/MyButton';
export default function MyApp() {
  //this causes both buttons to update together
  const [count, setCount] = useState(0);
  function handleClick(){
    setCount(count+1);
  }
  return (
    <div>
      <h1> Counters that update together</h1>
      <MyButton count = {count} onClick = {handleClick}/>
      <MyButton count = {count} onClick = {handleClick}/>
      //this is us passing the state down to the button
      //we are passing the count and the handleClick function
      //Lifting state up!!
    </div>
  );
}