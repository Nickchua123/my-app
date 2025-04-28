import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import App from './App';
import './index.css';
import Admin from './admin';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Router> */}
    {/* <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider> */}
    <AuthProvider>

      <Admin />
    </AuthProvider>
    {/* </Router> */}
  </StrictMode>
);
