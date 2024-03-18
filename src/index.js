import React from 'react'; //  imports the React library
import ReactDOM from 'react-dom/client'; // imports the ReactDOM library
import './index.css'; // imports a CSS file that will be applied to the root component
import App from './App'; //imports a component called App from a file located at './App'.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
