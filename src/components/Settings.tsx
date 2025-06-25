import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const [threshold, setThreshold] = useState(10000);

  const handleSave = () => {
    // Placeholder: Send threshold to backend
    alert(`Threshold set to ${threshold}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <label className="block text-gray-400 mb-2">Anomaly Volume Threshold</label>
      <input
        type="number"
        value={threshold}
        onChange={(e) => setThreshold(Number(e.target.value))}
        className="w-full p-2 bg-gray-700 text-white rounded"
      />
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Save
      </button>
    </motion.div>
  );
};

export default Settings;