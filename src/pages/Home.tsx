import React from 'react';
import Card from '../components/NavCard';
import { FaCheck, FaDollarSign, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavCard from '../components/NavCard';

const Home: React.FC = () => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-60 py-5">
      <h1 className="text-3xl mb-10 text-center">Welcome to the Atendido Bear Family Hub!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <Link to="/todo">
          <NavCard icon={<FaCheck />} label="To-Do" />
        </Link>
        <Link to="/budget">
          <NavCard icon={<FaDollarSign />} label="Budget" />
        </Link>
        <Link to="/gallery">
          <NavCard icon={<FaCamera />} label="Gallery" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
