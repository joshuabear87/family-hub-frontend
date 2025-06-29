import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaList, FaDollarSign, FaImages, FaSignInAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
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

        {/* Login button on the far right */}
        <div className="flex-shrink-0 transition-transform duration-200 hover:scale-105">
          <Link to="/login" className="bg-white shadow-md px-4 py-3 rounded-full">
            Login
          </Link>
        </div>
      </nav>

      {/* Bottom Navbar for small screens */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden flex justify-around items-center py-2 z-50">
        <Link to="/" className="flex flex-col items-center text-xs">
          <FaHome className="text-xl" />
          Home
        </Link>
        <Link to="/todo" className="flex flex-col items-center text-xs">
          <FaList className="text-xl" />
          Lists
        </Link>
        <Link to="/budget" className="flex flex-col items-center text-xs">
          <FaDollarSign className="text-xl" />
          Budget
        </Link>
        <Link to="/gallery" className="flex flex-col items-center text-xs">
          <FaImages className="text-xl" />
          Gallery
        </Link>
        <Link to="/login" className="flex flex-col items-center text-xs">
          <FaSignInAlt className="text-xl" />
          Login
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
