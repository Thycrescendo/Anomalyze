const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const NODIT_API_KEY = process.env.NODIT_API_KEY || 'your_nodit_api_key'; // Replace with actual key
const WEBSOCKET_URL = process.env.NODIT_WEBSOCKET_URL || 'wss://web3.nodit.io/v1/websocket';

// Mock anomaly detection (fallback)
function detectAnomaly(transfer) {
  const volume = parseFloat(transfer.volume || transfer.amount || 0);
  const threshold = 10000;
  return {
    id: transfer.id || Math.random().toString(36).slice(2),
    token: transfer.token || 'ETH',
    volume: volume.toFixed(2),
    score: volume > threshold ? 95 : 10,
    isAnomaly: volume > threshold,
    time: transfer.time || new Date().toISOString(),
    chain: transfer.chain || 'Ethereum',
  };
}

// Mock transfer generator (fallback)
const mockTransfer = () => ({
  token: ['ETH', 'USDT', 'MATIC'][Math.floor(Math.random() * 3)],
  volume: Math.random() * 20000,
  time: new Date().toISOString(),
  chain: ['Ethereum', 'Polygon'][Math.floor(Math.random() * 2)],
});

// Basic Nodit MCP integration for anomaly scoring
function calculateZScore(volume, historicalData) {
  if (!historicalData || historicalData.length === 0) return 10;
  const mean = historicalData.reduce((sum, d) => sum + parseFloat(d.volume || d.amount || 0), 0) / historicalData.length;
  const stdDev = Math.sqrt(historicalData.reduce((sum, d) => sum + Math.pow(parseFloat(d.volume || d.amount || 0) - mean, 2), 0) / historicalData.length);
  return (volume - mean) / stdDev > 3 ? 95 : 10;
}

// WebSocket for Nodit Webhook/Stream
io.on('connection', (socket) => {
  console.log('Client connected');

  // Real-time anomaly detection with Nodit Webhook/Stream
  if (NODIT_API_KEY !== 'your_nodit_api_key') {
    const ws = require('socket.io-client')(WEBSOCKET_URL, {
      extraHeaders: { 'X-API-KEY': NODIT_API_KEY }
    });
    ws.on('connect', () => {
      console.log('Connected to Nodit WebSocket');
      ws.emit('subscription', 'anomalyze_001', 'TOKEN_TRANSFER', JSON.stringify({
        description: 'Monitor Ethereum and Polygon token transfers',
        condition: { protocol: ['ethereum', 'polygon'], network: 'mainnet' },
      }));
    });
    ws.on('subscription_event', async (data) => {
      // Fetch historical data for MCP scoring
      let historicalData = [];
      try {
        const response = await axios.post(
          'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount',
          {
            accountAddress: data.from || '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            fromDate: '2025-06-01T00:00:00+00:00',
            toDate: new Date().toISOString(),
          },
          { headers: { 'X-API-KEY': NODIT_API_KEY } }
        );
        historicalData = response.data.data;
      } catch (error) {
        console.error('Failed to fetch historical data for MCP:', error);
      }
      const anomaly = {
        ...detectAnomaly(data),
        score: calculateZScore(parseFloat(data.volume || data.amount || 0), historicalData),
      };
      if (anomaly.isAnomaly) {
        io.emit('newAnomaly', anomaly);
      }
    });
    ws.on('subscription_error', (error) => console.error('Nodit WebSocket error:', error));
  } else {
    // Mock WebSocket simulation
    console.log('Using mock data (no valid Nodit API key)');
    const mockInterval = setInterval(() => {
      const anomaly = detectAnomaly(mockTransfer());
      if (anomaly.isAnomaly) {
        io.emit('newAnomaly', anomaly);
      }
    }, 10000);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      clearInterval(mockInterval);
    });
  }

  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Historical transfers via Nodit Web3 Data API
app.get('/api/historical-transfers', async (req, res) => {
  try {
    if (NODIT_API_KEY !== 'your_nodit_api_key') {
      const response = await axios.post(
        'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount',
        {
          accountAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
          fromDate: '2025-06-01T00:00:00+00:00',
          toDate: new Date().toISOString(),
        },
        { headers: { 'X-API-KEY': NODIT_API_KEY } }
      );
      const transfers = response.data.data.map((transfer) => ({
        ...detectAnomaly(transfer),
        score: calculateZScore(parseFloat(transfer.volume || transfer.amount || 0), response.data.data),
      }));
      res.json(transfers);
    } else {
      // Mock historical data
      const mockTransfers = Array.from({ length: 5 }, () => detectAnomaly(mockTransfer()));
      res.json(mockTransfers);
    }
  } catch (error) {
    console.error('Historical transfers error:', error);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

server.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));