// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import MyButton from './dummy-components/MyButton'
// import AboutPage from './dummy-components/AboutPage'
// import Profile from './dummy-components/Profile'
// import LetContent from './dummy-components/letContent'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <Profile />
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//         <MyButton />
//       </div>
//       <IfContent />
//       <AboutPage />
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

import {useState} from 'react';
import ItemList from './dummy-components/ItemList';

export default function MyApp() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ color: '#646cff', textAlign: 'center' }}>
        Hook Rules Demo
      </h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        Each item maintains its own state independently
      </p>
      <ItemList />
    </div>
  );
}