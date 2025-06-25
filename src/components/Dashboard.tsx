import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import io, { Socket } from 'socket.io-client';

// Define Anomaly interface
interface Anomaly {
  id?: string;
  hash?: string;
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

  // Mock anomaly generator
  const generateMockAnomaly = (): Anomaly => ({
    id: Math.random().toString(36).slice(2),
    token: ['ETH', 'USDT', 'MATIC'][Math.floor(Math.random() * 3)],
    volume: (Math.random() * 20000).toFixed(2),
    score: Math.floor(Math.random() * 100),
    time: new Date().toISOString(),
    isAnomaly: Math.random() > 0.5,
    chain: ['Ethereum', 'Polygon'][Math.floor(Math.random() * 2)],
  });

  useEffect(() => {
    // Connect to WebSocket
    const socket: Socket = io('http://localhost:5000');
    socket.on('newAnomaly', (anomaly: Anomaly) => {
      setAnomalies((prev: Anomaly[]) => [anomaly, ...prev.slice(0, 4)]);
      setAnomalyAlert(anomaly);
      setTimeout(() => setAnomalyAlert(null), 5000);
    });

    // Mock data simulation if no backend
    const mockInterval = setInterval(() => {
      const mockAnomaly = generateMockAnomaly();
      if (mockAnomaly.isAnomaly) {
        setAnomalies((prev: Anomaly[]) => [mockAnomaly, ...prev.slice(0, 4)]);
        setAnomalyAlert(mockAnomaly);
        setTimeout(() => setAnomalyAlert(null), 5000);
      }
    }, 10000);

    // Fetch historical anomalies
    fetch('http://localhost:5000/api/historical-transfers')
      .then((res) => res.json())
      .then((data: Anomaly[]) => setAnomalies(data.filter((d: Anomaly) => d.isAnomaly)))
      .catch((error) => {
        console.error('Failed to fetch historical data:', error);
        // Fallback to mock data
        setAnomalies([generateMockAnomaly(), generateMockAnomaly()]);
      });

    // Cleanup
    return () => {
      socket.disconnect();
      clearInterval(mockInterval);
    };
  }, []);

  // Sort anomalies
  const sortedAnomalies = [...anomalies].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    return new Date(b.time || '').getTime() - new Date(a.time || '').getTime();
  });

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {anomalyAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 p-4 rounded-lg text-center"
        >
          New Anomaly Detected: {anomalyAlert.token || 'Unknown'} (Score: {anomalyAlert.score}, Chain: {anomalyAlert.chain || 'Unknown'})
        </motion.div>
      )}
      {/* Sort Controls */}
      <div className="flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'score' | 'time')}
          className="p-2 bg-gray-700 text-white rounded"
        >
          <option value="score">Sort by Score</option>
          <option value="time">Sort by Time</option>
        </select>
      </div>
      {/* Anomaly Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAnomalies.map((anomaly) => (
          <motion.div
            key={anomaly.id || Math.random().toString()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 ${
              anomaly.score > 90 ? 'border-2 border-red-500' : 'border-2 border-blue-500'
            }`}
          >
            <h3 className="text-lg font-semibold">{anomaly.token || 'Unknown'} Anomaly</h3>
            <p className="text-gray-400">Volume: {anomaly.volume || 'N/A'}</p>
            <p className="text-gray-400">Score: {anomaly.score}</p>
            <p className="text-gray-400">Time: {anomaly.time || 'N/A'}</p>
            <p className="text-gray-400">Chain: {anomaly.chain || 'Unknown'}</p>
            <button
              onClick={() => window.alert(`View report for ${anomaly.token || 'Unknown'} (ID: ${anomaly.id || 'N/A'})`)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
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