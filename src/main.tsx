import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from './context/SnackbarContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
       <SnackbarProvider>
        <App />
       </SnackbarProvider>
    </AuthProvider>
  </StrictMode>,
);
