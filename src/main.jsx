import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Import your new Global Styles FIRST
import './styles/Global.css'; 
import './index.css'; // Keep the existing file for basic resets if you like

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);