import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // KHÔNG cần .js nếu file đã là App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
