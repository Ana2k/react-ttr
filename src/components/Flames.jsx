import { useState } from 'react';
import './Flames.css';

export default function Flames() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const calculateFlames = (name1, name2) => {
    // Remove spaces and convert to lowercase
    name1 = name1.replace(/\s+/g, '').toLowerCase();
    name2 = name2.replace(/\s+/g, '').toLowerCase();

    // Create frequency maps for both names
    const freq1 = {};
    const freq2 = {};

    // Count characters in first name
    for (let char of name1) {
      freq1[char] = (freq1[char] || 0) + 1;
    }

    // Count characters in second name
    for (let char of name2) {
      freq2[char] = (freq2[char] || 0) + 1;
    }

    // Calculate remaining characters
    let remaining = 0;
    for (let char in freq1) {
      if (freq2[char]) {
        remaining += Math.abs(freq1[char] - freq2[char]);
      } else {
        remaining += freq1[char];
      }
    }
    for (let char in freq2) {
      if (!freq1[char]) {
        remaining += freq2[char];
      }
    }

    // Calculate FLAMES result
    const flames = ['Friends', 'Love', 'Affection', 'Marriage', 'Enemy', 'Sister'];
    let index = 0;
    let flamesLength = flames.length;

    while (flamesLength > 1) {
      index = (index + remaining - 1) % flamesLength;
      flames.splice(index, 1);
      flamesLength--;
    }

    return flames[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names');
      return;
    }

    const result = calculateFlames(name1, name2);
    setResult(result);
  };

  return (
    <div className="flames-container">
      <h2>FLAMES Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="Enter first name"
          />
          <input
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="Enter second name"
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
} 