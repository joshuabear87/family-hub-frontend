import React from "react";
import FadeInSlideshow from "../components/FadeInSlideshow";
import NavCard from "../components/NavCard";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen pt-5 pb-20 px-2">
      {/* Family Logo */}
      <img
        src="/logo.png"
        alt="Family Crest"
        className="w-10 h-10 rounded-full shadow-md"
      />

      {/* Title */}
      <h1 className="text-base font-semibold text-gray-800 text-center leading-tight">
        Atendido Bear Family Hub
      </h1>


      {/* Carousel Preview */}
      <div className="w-full max-w-xs rounded-lg overflow-hidden">
<FadeInSlideshow />
      </div>

      
      {/* Footer Quote */}
      <p className="text-[10px] text-gray-600 text-center">
        “Together is our favorite place to be.”
      </p>
      
      {/* Quick Nav Cards */}
      <div className="grid grid-cols-2 gap-5 w-50 max-w-xs">
        <Link to="/todo">
          <NavCard icon="📝" label="To-Do" small />
        </Link>
        <Link to="/budget">
          <NavCard icon="💰" label="Budget" small />
        </Link>
        <Link to="/calendar">
          <NavCard icon="📅" label="Calendar" small />
        </Link>
        <Link to="/gallery">
          <NavCard icon="🖼️" label="Gallery" small />
        </Link>
      </div>
    </div>
  );
};

export default Home;
