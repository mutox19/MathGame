import React from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './quiz';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome To Math Game</h2>
      </div>
      <Quiz />
    </div>
  );
}

export default App;
