import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import BudgetPage from './pages/BudgetPage';
import GalleryPage from './pages/GalleryPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';
import MyAccountPage from './pages/MyAccountPage';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<ProtectedRoute><MyAccountPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUserManagementPage /></ProtectedRoute>} />
        <Route path="/todo" element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
        <Route path="/budget" element={<ProtectedRoute><BudgetPage /></ProtectedRoute>} />
        <Route path="/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
