import React from "react";
import Carousel from "../components/Carousel";

const Home: React.FC = () => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-60 pt-10 pb-32 space-y-6">
      <h1 className="text-3xl text-center">
        Welcome to the Atendido Bear Family Hub!
      </h1>

      {/* Carousel */}
      <div>
        <Carousel />
      </div>

      {/* Family snippet */}
      <div className="p-4 text-center">
        <p className="text-md">
Welcome to our Family Hub. This is our little space to stay organized, connected, and celebrate everyday moments together.        </p>
      </div>
    </div>
  );
};

export default Home;
