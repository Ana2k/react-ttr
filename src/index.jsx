import { StrictMode } from 'react'; //React
import { createRoot } from 'react-dom/client'; //React library to talk to web-browsers.
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);