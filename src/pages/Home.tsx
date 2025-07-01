import React from "react";
import FadeInSlideshow from "../components/FadeInSlideshow";
import NavCard from "../components/NavCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen pt-5 pb-20 px-4">
      {/* Family Logo */}
      <motion.img
        src="/logo.png"
        alt="Family Crest"
        className="w-14 h-14 rounded-full shadow-md mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Title */}
      <motion.h1
        className="text-lg font-semibold text-gray-800 text-center leading-tight mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Atendido Bear Family Hub
      </motion.h1>

      {/* Carousel Preview */}
      <motion.div
        className="w-full max-w-sm rounded-lg overflow-hidden mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <FadeInSlideshow />
      </motion.div>

      {/* Footer Quote */}
      <motion.p
        className="text-xs text-gray-600 text-center mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        “Together is our favorite place to be.”
      </motion.p>

      {/* Quick Nav Cards */}
      <motion.div
        className="grid grid-cols-2 gap-4 w-full max-w-sm"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {[
          { to: "/todo", icon: "📝", label: "To-Do" },
          { to: "/budget", icon: "💰", label: "Budget" },
          { to: "/calendar", icon: "📅", label: "Calendar" },
          { to: "/gallery", icon: "🖼️", label: "Gallery" },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            <Link to={item.to}>
              <NavCard icon={item.icon} label={item.label} small />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
