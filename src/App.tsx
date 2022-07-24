import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  useEffect( ()=> {
    console.log(12);
  }, [])

  const OnClick = () => {
    console.log(14);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={OnClick}>Gomb</button>
      </header>
    </div>
  );
}

export default App;
