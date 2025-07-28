import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const [threshold, setThreshold] = useState(10000);
  const [selectedChain, setSelectedChain] = useState('Ethereum');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');

  const handleSaveThreshold = () => window.alert(`Threshold updated to ${threshold} for ${selectedChain}`);
  const handleChainChange = (chain: string) => {
    setSelectedChain(chain);
    window.alert(`Monitoring switched to ${chain}`);
  };
  const handleToggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled);
    window.alert(`Alerts ${alertsEnabled ? 'disabled' : 'enabled'}`);
  };
  const handleValidateApiKey = () => window.alert(apiKey ? `API key validated: ${apiKey}` : 'Enter a valid API key');

  return (
    <div className="pt-20 p-4 bg-gray-900 min-h-screen text-gray-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Threshold</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
            <button
              onClick={handleSaveThreshold}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Save Threshold
            </button>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Chain</label>
            <select
              value={selectedChain}
              onChange={(e) => handleChainChange(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            >
              <option value="Ethereum">Ethereum</option>
              <option value="Polygon">Polygon</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Alerts</label>
            <button
              onClick={handleToggleAlerts}
              className={`w-full p-2 text-white rounded-lg ${alertsEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {alertsEnabled ? 'Disable Alerts' : 'Enable Alerts'}
            </button>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nodit API Key</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
              placeholder="Enter API key"
            />
            <button
              onClick={handleValidateApiKey}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Validate API Key
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;