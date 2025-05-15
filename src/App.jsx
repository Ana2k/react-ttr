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

// export default App

// Array of product objects, each containing:
// - title: the name of the product
// - id: unique identifier for each product
// - isFruit: boolean flag to determine if the product is a fruit
const products = [
  {title: 'Cabbage', id: 1, isFruit: false},
  {title: 'Garlic', id: 2, isFruit: false},
  {title: 'Apple', id: 3, isFruit: true},
]

export default function ShoppingList(){
  // const listItems = products.map(
  //   product => (
  //     <li 
  //       key={product.id}
  //       style={{color: product.isFruit ? 'magenta' : 'orange'}}
  //     >
  //       {product.title}
  //     </li>
  //   )
  // );

  const listItems = products.map(product =>
    <li key = {product.id}>
      {product.title}
    </li>
  );
  return (
    // Container div with padding for better spacing
    <div style={{ padding: '20px' }}>
      {/* Heading for the shopping list */}
      <h2>Shopping List</h2>
      {/* Unordered list containing our mapped list items */}
      <ul>
        {listItems}
      </ul>
    </div>
  );
}