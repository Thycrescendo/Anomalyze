import React from 'react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const anomalies = [
    { id: 1, token: 'ETH', volume: '12,450', score: 92, time: '2025-06-10 08:30' },
    { id: 2, token: 'USDT', volume: '8,900', score: 85, time: '2025-06-10 08:15' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {anomalies.map((anomaly) => (
        <motion.div
          key={anomaly.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700"
        >
          <h3 className="text-lg font-semibold">{anomaly.token} Anomaly</h3>
          <p className="text-gray-400">Volume: {anomaly.volume}</p>
          <p className="text-gray-400">Score: {anomaly.score}</p>
          <p className="text-gray-400">Time: {anomaly.time}</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            View Report
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default Dashboard;