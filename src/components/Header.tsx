import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <motion.h1
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-2xl font-bold"
        >
          Anomalyze
        </motion.h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#dashboard" className="hover:text-blue-300">Dashboard</a></li>
            <li><a href="#visualizations" className="hover:text-blue-300">Visualizations</a></li>
            <li><a href="#reports" className="hover:text-blue-300">Reports</a></li>
            <li><a href="#settings" className="hover:text-blue-300">Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;