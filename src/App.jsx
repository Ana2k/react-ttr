import { useState, useEffect } from 'react';
import TicTacToe from './components/TicTacToe';
import Flames from './components/Flames';
import './App.css';

// Theme definitions
const themes = {
  default: {
    name: 'Classic',
    colors: {
      '--bg-color': '#ffffff',
      '--text-color': '#333333',
      '--board-bg': '#ffffff',
      '--square-bg': '#ffffff',
      '--square-hover': '#f5f5f5',
      '--border-color': '#333333',
      '--x-color': '#E91E63',
      '--o-color': '#2196F3',
      '--button-bg': '#4CAF50',
      '--button-hover': '#45a049',
      '--restart-button-bg': '#f44336',
      '--restart-button-hover': '#d32f2f',
      '--shadow-color': 'rgba(0, 0, 0, 0.1)',
      '--status-color': '#333333',
      '--move-list-color': '#666666',
      '--move-list-hover': '#f0f0f0',
      '--title-color': '#333333',
      '--title-shadow': 'rgba(0, 0, 0, 0.1)',
      '--background-pattern': 'linear-gradient(135deg, #f5f5f5 25%, transparent 25%), linear-gradient(225deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(315deg, #f5f5f5 25%, #ffffff 25%)'
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      '--bg-color': '#1a1a1a',
      '--text-color': '#ffffff',
      '--board-bg': '#2d2d2d',
      '--square-bg': '#2d2d2d',
      '--square-hover': '#3d3d3d',
      '--border-color': '#ffffff',
      '--x-color': '#FF4081',
      '--o-color': '#64B5F6',
      '--button-bg': '#388E3C',
      '--button-hover': '#2E7D32',
      '--restart-button-bg': '#EF5350',
      '--restart-button-hover': '#D32F2F',
      '--shadow-color': 'rgba(0, 0, 0, 0.3)',
      '--status-color': '#ffffff',
      '--move-list-color': '#b0b0b0',
      '--move-list-hover': '#3d3d3d',
      '--title-color': '#ffffff',
      '--title-shadow': 'rgba(0, 0, 0, 0.3)',
      '--background-pattern': 'linear-gradient(135deg, #2d2d2d 25%, transparent 25%), linear-gradient(225deg, #2d2d2d 25%, transparent 25%), linear-gradient(45deg, #2d2d2d 25%, transparent 25%), linear-gradient(315deg, #2d2d2d 25%, #1a1a1a 25%)'
    }
  },
  retro: {
    name: 'Retro',
    colors: {
      '--bg-color': '#000000',
      '--text-color': '#ffffff',
      '--board-bg': '#000000',
      '--square-bg': '#000000',
      '--square-hover': '#1a1a1a',
      '--border-color': '#00FF00',
      '--x-color': '#FFD700',
      '--o-color': '#00FF00',
      '--button-bg': '#FF00FF',
      '--button-hover': '#FF69B4',
      '--restart-button-bg': '#FF00FF',
      '--restart-button-hover': '#FF69B4',
      '--shadow-color': 'rgba(0, 255, 0, 0.3)',
      '--status-color': '#FFD700',
      '--move-list-color': '#00FF00',
      '--move-list-hover': '#1a1a1a',
      '--title-color': '#FFD700',
      '--title-shadow': 'rgba(0, 255, 0, 0.3)',
      '--background-pattern': 'linear-gradient(135deg, #1a1a1a 25%, transparent 25%), linear-gradient(225deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(315deg, #1a1a1a 25%, #000000 25%)'
    }
  },
  minimal: {
    name: 'Minimal',
    colors: {
      '--bg-color': '#f5f5f5',
      '--text-color': '#333333',
      '--board-bg': '#ffffff',
      '--square-bg': '#ffffff',
      '--square-hover': '#f0f0f0',
      '--border-color': '#cccccc',
      '--x-color': '#FF5722',
      '--o-color': '#009688',
      '--button-bg': '#757575',
      '--button-hover': '#616161',
      '--restart-button-bg': '#FF5722',
      '--restart-button-hover': '#F4511E',
      '--shadow-color': 'rgba(0, 0, 0, 0.1)',
      '--status-color': '#333333',
      '--move-list-color': '#757575',
      '--move-list-hover': '#f0f0f0',
      '--title-color': '#333333',
      '--title-shadow': 'rgba(0, 0, 0, 0.1)',
      '--background-pattern': 'linear-gradient(135deg, #e0e0e0 25%, transparent 25%), linear-gradient(225deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(315deg, #e0e0e0 25%, #f5f5f5 25%)'
    }
  },
  nature: {
    name: 'Nature',
    colors: {
      '--bg-color': '#E8F5E9',
      '--text-color': '#2E7D32',
      '--board-bg': '#ffffff',
      '--square-bg': '#ffffff',
      '--square-hover': '#F1F8E9',
      '--border-color': '#8BC34A',
      '--x-color': '#4CAF50',
      '--o-color': '#795548',
      '--button-bg': '#8BC34A',
      '--button-hover': '#7CB342',
      '--restart-button-bg': '#4CAF50',
      '--restart-button-hover': '#43A047',
      '--shadow-color': 'rgba(76, 175, 80, 0.2)',
      '--status-color': '#2E7D32',
      '--move-list-color': '#558B2F',
      '--move-list-hover': '#F1F8E9',
      '--title-color': '#2E7D32',
      '--title-shadow': 'rgba(76, 175, 80, 0.2)',
      '--background-pattern': 'linear-gradient(135deg, #C8E6C9 25%, transparent 25%), linear-gradient(225deg, #C8E6C9 25%, transparent 25%), linear-gradient(45deg, #C8E6C9 25%, transparent 25%), linear-gradient(315deg, #C8E6C9 25%, #E8F5E9 25%)'
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      '--bg-color': '#FFF3E0',
      '--text-color': '#E65100',
      '--board-bg': '#ffffff',
      '--square-bg': '#ffffff',
      '--square-hover': '#FFECB3',
      '--border-color': '#FF5722',
      '--x-color': '#FF9800',
      '--o-color': '#9C27B0',
      '--button-bg': '#FF9800',
      '--button-hover': '#F57C00',
      '--restart-button-bg': '#FF5722',
      '--restart-button-hover': '#F4511E',
      '--shadow-color': 'rgba(255, 152, 0, 0.2)',
      '--status-color': '#E65100',
      '--move-list-color': '#FF5722',
      '--move-list-hover': '#FFECB3',
      '--title-color': '#E65100',
      '--title-shadow': 'rgba(255, 152, 0, 0.2)',
      '--background-pattern': 'linear-gradient(135deg, #FFE0B2 25%, transparent 25%), linear-gradient(225deg, #FFE0B2 25%, transparent 25%), linear-gradient(45deg, #FFE0B2 25%, transparent 25%), linear-gradient(315deg, #FFE0B2 25%, #FFF3E0 25%)'
    }
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Apply theme to root element
  useEffect(() => {
    const root = document.documentElement;
    const themeColors = themes[currentTheme].colors;
    Object.entries(themeColors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [currentTheme]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const selectTheme = (themeName) => {
    setCurrentTheme(themeName);
    setIsDrawerOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'tictactoe':
        return <TicTacToe currentTheme={currentTheme} />;
      case 'flames':
        return <Flames currentTheme={currentTheme} />;
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
      <button className="theme-button" onClick={toggleDrawer}>
        🎨 Theme
      </button>
      {isDrawerOpen && (
        <div className="theme-drawer">
          <div className="theme-drawer-content">
            <h3>Choose Theme</h3>
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                onClick={() => selectTheme(key)}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {renderPage()}
    </div>
  );
}
