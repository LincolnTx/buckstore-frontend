import React from 'react';
import './global.css';

import Routes from './routes';
import {AuthProvider} from './contexts/auth';
import { ShoppingCartProvider } from './contexts/shoppingCart';

function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
      <Routes />
      </ShoppingCartProvider>
    </ AuthProvider>
  );
}

export default App;
