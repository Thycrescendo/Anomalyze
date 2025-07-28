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

  const mockReports: Report[] = [
    { id: 'report1', token: 'ETH', volume: '12450', score: 92, time: '2025-07-15T08:00:00Z', chain: 'Ethereum', analysis: 'High volume detected.' },
    { id: 'report2', token: 'USDT', volume: '8900', score: 85, time: '2025-07-15T08:15:00Z', chain: 'Polygon', analysis: 'Unusual pattern.' },
  ];

  const handleGenerateReport = (report: Report) => setSelectedReport(report);
  const handleDownloadReport = () => selectedReport && window.alert(`Downloading PDF for ${selectedReport.token}`);
  const handleExportAll = () => window.alert('Exporting all reports as CSV');

  const filteredReports = filterChain === 'All' ? mockReports : mockReports.filter((r) => r.chain === filterChain);

  return (
    <div className="pt-20 p-4 bg-gray-900 min-h-screen text-gray-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Reports</h2>
        <div className="mb-4">
          <select
            value={filterChain}
            onChange={(e) => setFilterChain(e.target.value as 'All' | 'Ethereum' | 'Polygon')}
            className="p-2 bg-gray-700 text-white rounded-lg border border-gray-600"
          >
            <option value="All">All Chains</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
          </select>
        </div>
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700 p-4 rounded-lg shadow"
            >
              <h3 className="text-lg font-medium text-white">{report.token} Report</h3>
              <p className="text-sm text-gray-400">Score: {report.score}</p>
              <p className="text-sm text-gray-400">Chain: {report.chain}</p>
              <button
                onClick={() => handleGenerateReport(report)}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Generate Report
              </button>
            </motion.div>
          ))}
        </div>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-gray-700 p-4 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold text-white">Details: {selectedReport.token}</h3>
            <p className="text-sm text-gray-400">Volume: {selectedReport.volume}</p>
            <p className="text-sm text-gray-400">Score: {selectedReport.score}</p>
            <p className="text-sm text-gray-400">Analysis: {selectedReport.analysis}</p>
            <button
              onClick={handleDownloadReport}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              Download Report
            </button>
          </motion.div>
        )}
        <button
          onClick={handleExportAll}
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
        >
          Export All Reports
        </button>
      </motion.div>
    </div>
  );
};

export default Reports;