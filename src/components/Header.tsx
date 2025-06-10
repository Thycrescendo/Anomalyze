import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <motion.h1
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-2xl font-bold"
        >
          Anomalyze
        </motion.h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#dashboard" className="hover:text-blue-400">Dashboard</a></li>
            <li><a href="#reports" className="hover:text-blue-400">Reports</a></li>
            <li><a href="#settings" className="hover:text-blue-400">Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;