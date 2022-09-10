import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ModalProvider } from './context/ModalContext';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <CartProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </CartProvider>
  </Router>
);

