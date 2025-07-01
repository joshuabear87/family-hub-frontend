import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ListTodo,
  DollarSign,
  Image as ImageIcon,
  Calendar,
  UserCircle,
  LogIn,
  LogOut,
  X,
  Users
} from "lucide-react";
import AuthContext from "../context/AuthContext";

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
            <img
              src="/atendido-bear-logo.png"
              alt="Logo"
              className="rounded h-10 w-auto"
            />
          </Link>
        </div>

        {/* Nav links centered */}
        <div className="flex justify-center rounded-full mx-auto shadow-md bg-white px-7 py-3 space-x-8">
          <Link to="/" className="flex items-center space-x-1 hover:text-gray-700 transition">
            <Home size={18} /> <span>Home</span>
          </Link>
          <Link to="/todo" className="flex items-center space-x-1 hover:text-gray-700 transition">
            <ListTodo size={18} /> <span>Lists</span>
          </Link>
          <Link to="/budget" className="flex items-center space-x-1 hover:text-gray-700 transition">
            <DollarSign size={18} /> <span>Budget</span>
          </Link>
          <Link to="/gallery" className="flex items-center space-x-1 hover:text-gray-700 transition">
            <ImageIcon size={18} /> <span>Gallery</span>
          </Link>
          <Link to="/calendar" className="flex items-center space-x-1 hover:text-gray-700 transition">
            <Calendar size={18} /> <span>Calendar</span>
          </Link>
        </div>

        {/* Account menu on the far right */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="transition-transform duration-200 hover:scale-110"
          >
            <UserCircle size={24} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded shadow-lg py-2 w-48 z-50 text-sm">
              {/* Close button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-end w-full px-4 py-2 text-gray-500 hover:text-black"
              >
                <X size={16} className="mr-2" /> Close
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
                  {user?.role === "admin" && (
                    <Link
                      to="/admin/users"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      <Users size={16} className="inline mr-2" /> Approve Users
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="inline mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <LogIn size={16} className="inline mr-2" /> Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

{/* Bottom Navbar for small screens */}
<nav className="fixed h-25 bottom-0 left-0 right-0 bg-rainbow shadow-md md:hidden flex justify-around items-top py-3 z-50 text-black">
  <Link to="/" className="flex flex-col items-center text-[10px] hover:text-gray-100 transition duration-150">
    <Home size={18} className="mb-0.5" /> Home
  </Link>
  <Link to="/todo" className="flex flex-col items-center text-[10px] hover:text-gray-100 transition duration-150">
    <ListTodo size={18} className="mb-0.5" /> Lists
  </Link>
  <Link to="/budget" className="flex flex-col items-center text-[10px] hover:text-gray-100 transition duration-150">
    <DollarSign size={18} className="mb-0.5" /> Budget
  </Link>
  <Link to="/gallery" className="flex flex-col items-center text-[10px] hover:text-gray-100 transition duration-150">
    <ImageIcon size={18} className="mb-0.5" /> Gallery
  </Link>
  <Link to="/calendar" className="flex flex-col items-center text-[10px] hover:text-gray-100 transition duration-150">
    <Calendar size={18} className="mb-0.5" /> Calendar
  </Link>

  {/* Mobile Account Menu */}
  <div className="relative flex flex-col items-center text-[10px]">
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="flex flex-col items-center text-[10px] hover:text-gray-100 transition duration-150"
    >
      <UserCircle size={18} className="mb-0.5" /> Account
    </button>

    {menuOpen && (
      <div className="absolute bottom-12 right-0 bg-white rounded shadow-lg py-2 w-44 z-50 text-gray-800 text-[12px]">
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-end w-full px-4 py-2 text-gray-500 hover:text-black text-xs"
        >
          <X size={16} className="mr-2" /> Close
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
            {user?.role === "admin" && (
              <Link
                to="/admin/users"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <Users size={16} className="inline mr-2" /> Approve Users
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              <LogOut size={16} className="inline mr-2" /> Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <LogIn size={16} className="inline mr-2" /> Login
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
