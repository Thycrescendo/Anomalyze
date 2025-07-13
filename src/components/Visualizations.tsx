import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Anomaly {
  id?: string;
  token?: string;
  volume?: string;
  score: number;
  time?: string;
  chain?: string;
}

const Visualizations: React.FC = () => {
  const [data, setData] = useState<Anomaly[]>([]);

  useEffect(() => {
    // Fetch historical anomalies for visualization
    fetch('http://localhost:5000/api/historical-transfers')
      .then((res) => res.json())
      .then((fetchedData: Anomaly[]) => {
        setData(fetchedData.slice(0, 10)); // Limit to 10 for demo
      })
      .catch((error) => {
        console.error('Failed to fetch visualization data:', error);
        // Mock data
        setData([
          { time: '2025-06-25T14:00:00Z', score: 85, token: 'ETH' },
          { time: '2025-06-25T14:15:00Z', score: 90, token: 'USDT' },
          { time: '2025-06-25T14:30:00Z', score: 95, token: 'MATIC' },
        ]);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Anomaly Score Trends (Powered by Nodit Web3 Data API)</h2>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </motion.div>
  );
};

export default Visualizations;