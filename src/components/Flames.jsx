import { useState } from 'react';
import '../styles/Flames.css';

export default function Flames() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Get uncommon letters between two names (exact same logic as flames.py)
  const getUncommonLetters = (name1, name2) => {
    // Create frequency maps for both names
    const count1 = {};
    const count2 = {};

    // Count characters in first name
    for (let char of name1) {
      count1[char] = (count1[char] || 0) + 1;
    }

    // Count characters in second name
    for (let char of name2) {
      count2[char] = (count2[char] || 0) + 1;
    }

    // Get uncommon letters (same logic as Python's Counter)
    let uncommon = '';
    for (let char in count1) {
      if (!count2[char]) {
        uncommon += char;
      }
    }
    for (let char in count2) {
      if (!count1[char]) {
        uncommon += char;
      }
    }

    return uncommon;
  };

  // Calculate FLAMES result (exact same logic as flames.py)
  const flamesResult = (totalUncommon) => {
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let index = 0;
    while (flames.length > 1) {
      index = (index + totalUncommon - 1) % flames.length;
      flames.splice(index, 1);
    }
    return flames[0];
  };

  // Interpret the result (exact same logic as flames.py)
  const interpretResult = (letter) => {
    const meanings = {
      'F': 'Friends',
      'L': 'Lovers',
      'A': 'Affectionate',
      'M': 'Marriage',
      'E': 'Enemies',
      'S': 'Siblings'
    };
    return meanings[letter] || 'Unknown';
  };

  const calculateFlames = () => {
    setError('');
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names');
      return;
    }

    // Process names (same as Python's replace and lower)
    const processedName1 = name1.replace(/\s+/g, '').toLowerCase();
    const processedName2 = name2.replace(/\s+/g, '').toLowerCase();

    // Get uncommon letters
    const uncommon = getUncommonLetters(processedName1, processedName2);
    const totalUncommon = uncommon.length;

    // Calculate result
    const resultLetter = flamesResult(totalUncommon);
    const relationship = interpretResult(resultLetter);

    setResult(relationship);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateFlames();
  };

  return (
    <div className="flames-container">
      <h2 className="flames-title">FLAMES Calculator</h2>
      <form className="flames-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="flames-input"
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="Enter first name"
          />
          <div className="input-focus-border"></div>
        </div>
        <div className="input-group">
          <input
            className="flames-input"
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="Enter second name"
          />
          <div className="input-focus-border"></div>
        </div>
        <div className="button-group">
          <button className="flames-button calculate" type="submit">Calculate</button>
          <button 
            className="flames-button reset" 
            type="button" 
            onClick={() => {
              setName1('');
              setName2('');
              setResult('');
              setError('');
            }}
          >
            Reset
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {result && (
        <div className="result-container">
          <div className="result-card">
            <h2>Your FLAMES Result</h2>
            <div className="result-value">
              {result} {
                result === 'Friends' && '👥'
                || result === 'Lovers' && '❤️'
                || result === 'Affectionate' && '🥰'
                || result === 'Marriage' && '💑'
                || result === 'Enemies' && '😠'
                || result === 'Siblings' && '👭'
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 