import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastProvider } from './context/ToastContext';
import { SoundProvider } from './context/SoundContext';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <SoundProvider>
        <AuthProvider>
          <WalletProvider>
            <App />
          </WalletProvider>
        </AuthProvider>
      </SoundProvider>
    </ToastProvider>
  </React.StrictMode>
);
