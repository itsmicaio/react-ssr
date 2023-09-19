import React from 'react'

export const Counter = () => {
  const [state, setState] = React.useState(0);
  
  const count = () => {
    const newState = state + 1
    setState(newState);
    console.log(newState)
  }

  return (
    <div>
      <h1>Counter: {state}</h1>
      <button onClick={count}>Counter</button>
    </div>
  );
}