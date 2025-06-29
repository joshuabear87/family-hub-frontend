import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import SnackbarContext from '../context/SnackbarContext';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      showSnackbar('Please login to access family private information.');
    }
  }, [isAuthenticated, showSnackbar]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
