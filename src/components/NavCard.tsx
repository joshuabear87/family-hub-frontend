import React from "react";

interface NavCardProps {
  icon: string; // emoji or image URL
  label: string;
  small?: boolean;
}

const NavCard: React.FC<NavCardProps> = ({ icon, label, small }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-white shadow rounded ${
        small ? "p-1 text-[10px]" : "p-2 text-xs"
      }`}
    >
      <div className={`${small ? "text-base" : "text-xl"}`}>{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export default NavCard;
