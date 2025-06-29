import React, { JSX } from 'react';

interface CardProps {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
}

const NavCard: React.FC<CardProps> = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-6 cursor-pointer hover:scale-105 transform transition duration-200"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-lg font-medium text-gray-800">{label}</div>
    </div>
  );
};

export default NavCard;
