import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';

const Dashboard: React.FC = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Connect to WebSocket
    const socket = io('http://localhost:5000');
    socket.on('newAnomaly', (anomaly) => {
      setAnomalies((prev) => [anomaly, ...prev.slice(0, 4)]); // Keep latest 5
      setAlert(anomaly); // Show alert for new anomaly
      setTimeout(() => setAlert(null), 5000); // Clear alert after 5s
    });

    // Fetch historical anomalies
    fetch('http://localhost:5000/api/historical-transfers')
      .then((res) => res.json())
      .then((data) => setAnomalies(data.filter((d) => d.isAnomaly)));

    return () => socket.disconnect();
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-Time Alert Banner */}
      {alert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 p-4 rounded-lg text-center"
        >
          New Anomaly Detected: {alert.token} (Score: {alert.score})
        </motion.div>
      )}
      {/* Anomaly Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anomalies.map((anomaly) => (
          <motion.div
            key={anomaly.id || anomaly.hash}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 ${
              anomaly.score > 90 ? 'border-2 border-red-500' : 'border-2 border-blue-500'
            }`}
          >
            <h3 className="text-lg font-semibold">{anomaly.token || 'Unknown'} Anomaly</h3>
            <p className="text-gray-400">Volume: {anomaly.value || anomaly.volume}</p>
            <p className="text-gray-400">Score: {anomaly.score}</p>
            <p className="text-gray-400">Time: {anomaly.time || new Date().toISOString()}</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              View Report
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;