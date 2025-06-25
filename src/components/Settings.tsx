import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const [threshold, setThreshold] = useState(10000);
  const [selectedChain, setSelectedChain] = useState('Ethereum');

  const handleSaveThreshold = () => {
    alert(`Threshold updated to ${threshold} for ${selectedChain}`);
  };

  const handleChainChange = (chain: string) => {
    setSelectedChain(chain);
    alert(`Monitoring switched to ${chain}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-2">Anomaly Volume Threshold</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
          <button
            onClick={handleSaveThreshold}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
          >
            Save Threshold
          </button>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Select Blockchain</label>
          <select
            value={selectedChain}
            onChange={(e) => handleChainChange(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
          >
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;