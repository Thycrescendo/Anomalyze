import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import { ethers } from 'ethers';

interface Anomaly {
  id?: string;
  token?: string;
  volume?: string;
  score: number;
  time?: string;
  isAnomaly: boolean;
  chain?: string;
}

const Dashboard: React.FC = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [anomalyAlert, setAnomalyAlert] = useState<Anomaly | null>(null);
  const [sortBy, setSortBy] = useState<'score' | 'time'>('score');

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('newAnomaly', (anomaly: Anomaly) => {
      setAnomalies((prev) => [anomaly, ...prev.slice(0, 4)]);
      setAnomalyAlert(anomaly);
      setTimeout(() => setAnomalyAlert(null), 5000);
    });

    // Fetch on-chain anomalies
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_SEPOLIA_RPC_URL);
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const abi = [/* ABI from compiled contract */]; // Replace with actual ABI
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const fetchOnChainAnomalies = async () => {
      const count = await contract.anomalyCount();
      const anomaliesList = [];
      for (let i = 1; i <= count; i++) {
        const [token, score, timestamp, chain] = await contract.getAnomaly(i);
        anomaliesList.push({ id: i.toString(), token, score, time: new Date(timestamp * 1000).toLocaleString(), chain });
      }
      setAnomalies(anomaliesList);
    };
    fetchOnChainAnomalies();

    return () => socket.disconnect();
  }, []);

  const sortedAnomalies = [...anomalies].sort((a, b) =>
    sortBy === 'score' ? b.score - a.score : new Date(b.time || '').getTime() - new Date(a.time || '').getTime()
  );

  return (
    <div className="pt-20 p-4 bg-gray-900 min-h-screen text-gray-300">
      {anomalyAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-600 p-4 rounded-lg shadow-lg text-white z-20"
        >
          New Anomaly: {anomalyAlert.token} (Score: {anomalyAlert.score})
        </motion.div>
      )}
      <div className="mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'score' | 'time')}
          className="p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
        >
          <option value="score">Sort by Score</option>
          <option value="time">Sort by Time</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAnomalies.map((anomaly) => (
          <motion.div
            key={anomaly.id || Math.random().toString()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-white">{anomaly.token || 'Unknown'} Anomaly</h3>
            <p className="text-sm text-gray-400">Chain: {anomaly.chain || 'Unknown'}</p>
            <p className="text-sm text-gray-400">Score: {anomaly.score}</p>
            <p className="text-sm text-gray-400">Time: {anomaly.time}</p>
            <button
              onClick={() => window.alert(`View report for ${anomaly.token} (ID: ${anomaly.id})`)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              View Report
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;