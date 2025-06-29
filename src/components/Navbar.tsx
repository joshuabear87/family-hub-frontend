import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaList,
  FaDollarSign,
  FaImages,
  FaSignInAlt,
  FaCalendar,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes,
} from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navbar for md+ screens */}
      <nav className="hidden md:flex mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-60 items-center justify-between text-black rounded m-1 py-4">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src="/atendido-bear-logo.png" alt="Logo" className="rounded h-10 w-auto" />
          </Link>
        </div>

        {/* Nav links centered */}
        <div className="flex justify-center rounded-full mx-auto shadow-md bg-white px-7 py-3 space-x-8">
          <Link to="/" className="transition-transform duration-200 hover:scale-110">Home</Link>
          <Link to="/todo" className="transition-transform duration-200 hover:scale-110">Lists</Link>
          <Link to="/budget" className="transition-transform duration-200 hover:scale-110">Budget</Link>
          <Link to="/gallery" className="transition-transform duration-200 hover:scale-110">Gallery</Link>
          <Link to="/calendar" className="transition-transform duration-200 hover:scale-110">Calendar</Link>
        </div>

        {/* Account menu on the far right */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="transition-transform duration-200 hover:scale-110"
          >
            <FaUserCircle className="text-2xl" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded shadow-lg py-2 w-48 z-50">
              {/* Close button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-end w-full px-4 py-2 text-gray-500 hover:text-black"
              >
                <FaTimes className="mr-2" /> Close
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/users"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Approve Users
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <FaSignInAlt className="inline mr-2" /> Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Navbar for small screens */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden flex justify-around items-center py-2 z-50">
        <Link to="/" className="flex flex-col items-center text-xs">
          <FaHome className="text-xl" /> Home
        </Link>
        <Link to="/todo" className="flex flex-col items-center text-xs">
          <FaList className="text-xl" /> Lists
        </Link>
        <Link to="/budget" className="flex flex-col items-center text-xs">
          <FaDollarSign className="text-xl" /> Budget
        </Link>
        <Link to="/gallery" className="flex flex-col items-center text-xs">
          <FaImages className="text-xl" /> Gallery
        </Link>
        <Link to="/calendar" className="flex flex-col items-center text-xs">
          <FaCalendar className="text-xl" /> Calendar
        </Link>

        {/* Mobile Account Menu */}
        <div className="relative flex flex-col items-center text-xs">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center text-xs"
          >
            <FaUserCircle className="text-xl" /> Account
          </button>

          {menuOpen && (
            <div className="absolute bottom-12 right-0 bg-white rounded shadow-lg py-2 w-48 z-50">
              {/* Close button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-end w-full px-4 py-2 text-gray-500 hover:text-black"
              >
                <FaTimes className="mr-2" /> Close
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/users"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Approve Users
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <FaSignInAlt className="inline mr-2" /> Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
