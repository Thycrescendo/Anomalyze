const { ethers } = require("ethers");
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const NODIT_API_KEY = process.env.NODIT_API_KEY;
const WEBSOCKET_URL = process.env.WEBSOCKET_URL || 'wss://web3.nodit.io/v1/websocket';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // Add to .env
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PROVIDER_URL = process.env.SEPOLIA_RPC_URL;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const abi = [/* ABI from compiled contract */]; // Replace with actual ABI
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

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

ws.onmessage = async (event) => {
  const data = JSON.parse(event.data);
  if (data.event === 'TOKEN_TRANSFER') {
    const volume = parseFloat(data.volume || 0);
    const historicalData = []; // Fetch from Web3 Data API if needed
    const score = calculateZScore(volume, historicalData);
    const anomaly = {
      id: data.transactionHash,
      token: data.tokenSymbol,
      volume: data.volume,
      score,
      time: data.timestamp,
      isAnomaly: score > 90,
      chain: data.chain,
    };
    await contract.logAnomaly(anomaly.token, anomaly.score, anomaly.chain);
    io.emit('newAnomaly', anomaly);
  }
};

function calculateZScore(volume, historicalData) {
  const mean = historicalData.reduce((sum, d) => sum + parseFloat(d.volume || 0), 0) / historicalData.length || 0;
  const stdDev = Math.sqrt(historicalData.reduce((sum, d) => sum + Math.pow(parseFloat(d.volume || 0) - mean, 2), 0) / historicalData.length) || 1;
  const trend = historicalData.slice(-10).reduce((sum, d) => sum + (parseFloat(d.volume || 0) - mean), 0) / 10 || 0;
  return Math.min(100, Math.max(0, (volume - mean) / stdDev * 10 + (trend > 0 ? 5 : -5)));
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