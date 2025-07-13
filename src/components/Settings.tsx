import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const [threshold, setThreshold] = useState(10000);
  const [selectedChain, setSelectedChain] = useState('Ethereum');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');

  const handleSaveThreshold = () => {
    window.alert(`Threshold updated to ${threshold} for ${selectedChain}`);
  };

  const handleChainChange = (chain: string) => {
    setSelectedChain(chain);
    window.alert(`Monitoring switched to ${chain}`);
  };

  const handleToggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled);
    window.alert(`Real-time alerts ${alertsEnabled ? 'disabled' : 'enabled'}`);
  };

  const handleValidateApiKey = () => {
    window.alert(apiKey ? `Nodit API key validated: ${apiKey}` : 'Please enter a valid Nodit API key');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Settings (Nodit Integration)</h2>
      <div className="space-y-4">
        {/* Threshold Setting */}
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
        {/* Chain Selection */}
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
        {/* Virtual Functionality 1: Alert Toggle */}
        <div>
          <label className="block text-gray-400 mb-2">Real-Time Alerts</label>
          <button
            onClick={handleToggleAlerts}
            className={`w-full p-2 text-white rounded ${
              alertsEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {alertsEnabled ? 'Disable Alerts' : 'Enable Alerts'}
          </button>
        </div>
        {/* Virtual Functionality 2: API Key Validation */}
        <div>
          <label className="block text-gray-400 mb-2">Nodit API Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter Nodit API key"
          />
          <button
            onClick={handleValidateApiKey}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
          >
            Validate API Key
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;