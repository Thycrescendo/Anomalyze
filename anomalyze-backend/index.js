require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const NODIT_API_KEY = process.env.NODIT_API_KEY;
const WEBSOCKET_URL = process.env.WEBSOCKET_URL || 'wss://web3.nodit.io/v1/websocket';

app.use(express.json());

let subscriptionConditions = { chains: ['Ethereum', 'Polygon'], minVolume: 10000 };

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('updateConditions', (conditions) => {
    subscriptionConditions = { ...subscriptionConditions, ...conditions };
    socket.emit('conditionsUpdated', subscriptionConditions);
  });
});

const ws = new WebSocket(WEBSOCKET_URL);
ws.onopen = () => {
  ws.send(JSON.stringify({
    apiKey: NODIT_API_KEY,
    event: 'subscribe',
    type: 'TOKEN_TRANSFER',
    conditions: subscriptionConditions,
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.event === 'TOKEN_TRANSFER') {
    const anomaly = detectAnomaly(data);
    io.emit('newAnomaly', anomaly);
  }
};

function detectAnomaly(data) {
  const volume = parseFloat(data.volume || 0);
  const historicalData = []; // To be populated from Web3 Data API
  return {
    id: data.transactionHash,
    token: data.tokenSymbol,
    volume: data.volume,
    score: calculateZScore(volume, historicalData),
    time: data.timestamp,
    isAnomaly: calculateZScore(volume, historicalData) > 90,
    chain: data.chain,
  };
}

app.get('/api/historical-transfers', async (req, res) => {
  try {
    const response = await axios.post(
      'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount',
      { accountAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', fromDate: '2025-07-01T00:00:00+00:00', toDate: new Date().toISOString() },
      { headers: { 'X-API-KEY': NODIT_API_KEY, 'accept': 'application/json', 'content-type': 'application/json' } }
    );
    res.json(response.data.data.map(d => ({
      id: d.transactionHash,
      token: d.tokenSymbol,
      volume: d.value,
      time: d.timestamp,
      isAnomaly: false,
      chain: 'Ethereum',
    })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

server.listen(5000, () => console.log('Server running on port 5000'));