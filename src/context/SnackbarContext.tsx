import React, { createContext, useState } from 'react';

interface SnackbarContextType {
  message: string;
  showSnackbar: (msg: string) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  message: '',
  showSnackbar: () => {},
  hideSnackbar: () => {},
});

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000); // hides after 3s
  };

  const hideSnackbar = () => setMessage('');

  return (
    <SnackbarContext.Provider value={{ message, showSnackbar, hideSnackbar }}>
      {children}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow z-50">
          {message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
