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
              <button 
                className="game-button flames-button"
                onClick={() => setCurrentPage('flames')}
              >
                <span className="emoji">🔥</span>
                <span className="text">FLAMES</span>
                <span className="description">Calculate your relationship</span>
              </button>
              <button 
                className="game-button tictactoe-button"
                onClick={() => setCurrentPage('tictactoe')}
              >
                <span className="emoji">⭕</span>
                <span className="text">Tic Tac Toe</span>
                <span className="description">Play with themes</span>
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
