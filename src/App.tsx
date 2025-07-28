import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Visualizations from './components/Visualizations';
import Reports from './components/Reports';
import Settings from './components/Settings';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4"
      >
        <Dashboard />
        <Visualizations />
        <Reports />
        <Settings />
      </motion.main>
    </div>
  );
};

export default App;