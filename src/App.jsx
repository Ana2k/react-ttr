import { useState } from 'react';
import TicTacToe from './components/TicTacToe';
import Flames from './components/Flames';
import './App.css';
//not sure if this works but hopefully it does?
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'tictactoe':
        return <TicTacToe />;
      case 'flames':
        return <Flames />;
      default:
        return (
          <div className="home">
            <h1>Choose Your Game</h1>
            <div className="game-buttons">
              <button onClick={() => setCurrentPage('tictactoe')}>
                Tic Tac Toe
              </button>
              <button onClick={() => setCurrentPage('flames')}>
                Flames
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app">
      {currentPage !== 'home' && (
        <button className="back-button" onClick={() => setCurrentPage('home')}>
          ← Back to Home
        </button>
      )}
      {renderPage()}
    </div>
  );
}
