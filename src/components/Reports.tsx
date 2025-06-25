import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Report {
  id: string;
  token: string;
  volume: string;
  score: number;
  time: string;
  chain: string;
  analysis: string;
}

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Mock report data
  const mockReports: Report[] = [
    {
      id: 'report1',
      token: 'ETH',
      volume: '12450',
      score: 92,
      time: '2025-06-25T14:30:00Z',
      chain: 'Ethereum',
      analysis: 'High volume detected, potential whale movement.',
    },
    {
      id: 'report2',
      token: 'USDT',
      volume: '8900',
      score: 85,
      time: '2025-06-25T14:15:00Z',
      chain: 'Polygon',
      analysis: 'Unusual transfer pattern, possible arbitrage activity.',
    },
  ];

  const handleGenerateReport = (report: Report) => {
    setSelectedReport(report);
  };

  const handleDownloadReport = () => {
    if (selectedReport) {
      alert(`Downloading PDF report for ${selectedReport.token} (ID: ${selectedReport.id})`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Reports</h2>
      <div className="space-y-4">
        {mockReports.map((report) => (
          <div key={report.id} className="p-4 bg-gray-700 rounded">
            <h3 className="text-lg font-semibold">{report.token} Report</h3>
            <p className="text-gray-400">Score: {report.score}</p>
            <p className="text-gray-400">Time: {report.time}</p>
            <button
              onClick={() => handleGenerateReport(report)}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
            >
              Generate Report
            </button>
          </div>
        ))}
      </div>
      {selectedReport && (
        <div className="mt-6 p-4 bg-gray-900 rounded">
          <h3 className="text-lg font-bold">Report Details: {selectedReport.token}</h3>
          <p className="text-gray-400">Volume: {selectedReport.volume}</p>
          <p className="text-gray-400">Score: {selectedReport.score}</p>
          <p className="text-gray-400">Chain: {selectedReport.chain}</p>
          <p className="text-gray-400">AI Analysis: {selectedReport.analysis}</p>
          <button
            onClick={handleDownloadReport}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Download Report
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Reports;