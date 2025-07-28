import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, HeatMapChart, XAxis, YAxis, Tooltip } from 'recharts';

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
    fetch('http://localhost:5000/api/historical-transfers')
      .then((res) => res.json())
      .then((data: Anomaly[]) => {
        const heatmapData = data.map(d => ({
          time: new Date(d.time || '').toLocaleDateString(),
          token: d.token || 'Unknown',
          score: d.score,
        }));
        setData(heatmapData);
      })
      .catch(() => console.log('Failed to fetch heatmap data'));
  }, []);

  return (
    <div className="pt-20 p-4 bg-gray-900 min-h-screen text-gray-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Anomaly Risk Heatmap</h2>
        <ResponsiveContainer width="100%" height={400}>
          <HeatMapChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="time" stroke="#A0AEC0" />
            <YAxis dataKey="token" stroke="#A0AEC0" />
            <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
            <HeatMapChart.RectData
              dataKey="score"
              isAnimationActive={true}
              colorScale={['#ffeda0', '#feb24c', '#f03b20']}
            />
          </HeatMapChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Visualizations;