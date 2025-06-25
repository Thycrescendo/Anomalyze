const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const NODIT_API_KEY = process.env.NODIT_API_KEY;
const WEBSOCKET_URL = process.env.NODIT_WEBSOCKET_URL;

// Mock anomaly detection logic
function detectAnomaly(transfer) {
  const volume = parseFloat(transfer.value);
  const threshold = 10000; // Example threshold for high volume
  return volume > threshold ? { ...transfer, score: 95, isAnomaly: true } : { ...transfer, score: 10, isAnomaly: false };
}

// Webhook/Stream subscription
io.on('connection', (socket) => {
  console.log('Client connected');
  const ws = require('socket.io-client')(WEBSOCKET_URL);
  ws.on('connect', () => {
    ws.emit('subscription', 'anomalyze_001', 'TOKEN_TRANSFER', JSON.stringify({
      description: 'Monitor Ethereum token transfers',
      condition: { protocol: 'ethereum', network: 'mainnet' },
    }));
  });
  ws.on('subscription_event', (data) => {
    const anomaly = detectAnomaly(data);
    if (anomaly.isAnomaly) {
      io.emit('newAnomaly', anomaly); // Broadcast to front-end
    }
  });
  ws.on('subscription_error', (error) => console.error('WebSocket error:', error));
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Web3 Data API: Fetch historical token transfers
app.get('/api/historical-transfers', async (req, res) => {
  try {
    const response = await axios.post(
      'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount',
      {
        accountAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        fromDate: '2025-06-01T00:00:00+00:00',
        toDate: '2025-06-10T00:00:00+00:00',
      },
      { headers: { 'X-API-KEY': NODIT_API_KEY } }
    );
    const transfers = response.data.data.map(detectAnomaly);
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));