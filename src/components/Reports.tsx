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
  const [filterChain, setFilterChain] = useState<'All' | 'Ethereum' | 'Polygon'>('All');

  // Mock report data (simulating Nodit Web3 Data API results)
  const mockReports: Report[] = [
    {
      id: 'report1',
      token: 'ETH',
      volume: '12450',
      score: 92,
      time: '2025-06-25T14:30:00Z',
      chain: 'Ethereum',
      analysis: 'High volume detected, potential whale movement (Nodit MCP Z-score: 3.2).',
    },
    {
      id: 'report2',
      token: 'USDT',
      volume: '8900',
      score: 85,
      time: '2025-06-25T14:15:00Z',
      chain: 'Polygon',
      analysis: 'Unusual transfer pattern, possible arbitrage (Nodit MCP Z-score: 2.8).',
    },
  ];

  const handleGenerateReport = (report: Report) => {
    setSelectedReport(report);
  };

  const handleDownloadReport = () => {
    if (selectedReport) {
      window.alert(`Downloading PDF report for ${selectedReport.token} (ID: ${selectedReport.id})`);
    }
  };

  const handleExportAll = () => {
    window.alert('Exporting all reports as CSV');
  };

  // Filter reports by chain
  const filteredReports = filterChain === 'All' ? mockReports : mockReports.filter((report) => report.chain === filterChain);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Reports (Powered by Nodit Web3 Data API)</h2>
      {/* Virtual Functionality 1: Filter by Chain */}
      <div className="flex justify-end mb-4">
        <select
          value={filterChain}
          onChange={(e) => setFilterChain(e.target.value as 'All' | 'Ethereum' | 'Polygon')}
          className="p-2 bg-gray-700 text-white rounded"
        >
          <option value="All">All Chains</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Polygon">Polygon</option>
        </select>
      </div>
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="p-4 bg-gray-700 rounded">
            <h3 className="text-lg font-semibold">{report.token} Report</h3>
            <p className="text-gray-400">Score: {report.score}</p>
            <p className="text-gray-400">Time: {report.time}</p>
            <p className="text-gray-400">Chain: {report.chain}</p>
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
      {/* Virtual Functionality 2: Export All Reports */}
      <button
        onClick={handleExportAll}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
      >
        Export All Reports
      </button>
    </motion.div>
  );
};

export default Reports;