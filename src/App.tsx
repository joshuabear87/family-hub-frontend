import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import BudgetPage from './pages/BudgetPage';
import GalleryPage from './pages/GalleryPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
};

export default App;
