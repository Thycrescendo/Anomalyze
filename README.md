# Anomalyze

A real-time anomaly detection platform for blockchain token transfers, leveraging **Nodit’s full stack** (Webhook/Stream, Web3 Data API, MCP)

# Anomalyze - AI-Powered Anomaly Detection dApp

## Nodit Feature Utilization
- **Webhook/Stream**: Real-time token transfer event detection on Ethereum and Polygon.
- **Web3 Data API**: Historical transaction data for anomaly scoring.
- **Blockchain MCP**: AI-driven anomaly prediction using Z-score with trend analysis.
# Anomalyze - AI-Powered Anomaly Detection dApp

## Smart Contract
- **Contract**: `AnomalyRegistry` deployed on Sepolia testnet.
- **Purpose**: Logs anomalies on-chain for transparency.
- **Deployment**: Use Hardhat with `scripts/deploy.js`.

## Nodit Feature Utilization
- **Webhook/Stream**: Real-time token transfer detection.
- **Web3 Data API**: Historical data for scoring.
- **Blockchain MCP**: AI-driven anomaly prediction.

## Installation
- Backend: `npm install && node index.js`
- Frontend: `npm install && npm start`


## Features
- **Real-Time Anomaly Detection**: Uses **Nodit Webhook/Stream** to monitor Ethereum and Polygon token transfers, with mock data fallback.
- **Anomaly Sorting and Watchlist**: Sort anomalies by score or time and add to a watchlist (Dashboard).
- **Anomaly Score Trends**: Visualize anomaly scores over time using **Nodit Web3 Data API** and Recharts (Visualizations).
- **Filtered Reports**: Generate, filter (by chain), and export mock reports with **Nodit MCP** Z-score analysis (Reports).
- **Customizable Settings**: Adjust thresholds, select blockchains, toggle alerts, and validate **Nodit API key** (Settings).

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js, Express, Socket.IO, Axios, **Nodit Webhook/Stream**, **Nodit Web3 Data API**, **Nodit MCP**
- **Deployment**: Local development (http://localhost:3000)

## Installation
1. Clone the repository:
```bash
   git clone https://github.com/Thycrescendo/Anomalyze.git
   cd anomalyze
```
2. Install frontend dependencies:
```bash
   npm install
   npm install framer-motion socket.io-client@latest recharts
```
3. Install backend dependencies:
```bash
   cd anomalyze-backend
   npm install express socket.io axios dotenv socket.io-client
```
4. Configure environment:
   Create `anomalyze-backend/.env`:
```env
   NODIT_API_KEY=your_nodit_api_key
   WEBSOCKET_URL=wss://web3.nodit.io/v1/websocket
   PORT=5000
```
5. Run backend:
```bash
   cd anomalyze-backend
   node index.js
```
6. Run frontend:
```bash
   cd anomalyze
   npm start
```

## Wave 3 Roadmap
- Enhanced **Nodit MCP** integration with Z-score analysis for anomaly scoring.
- Multi-chain support (Ethereum, Polygon) via **Nodit Webhook/Stream**.
- Visualizations of anomaly trends using **Recharts** and **Nodit Web3 Data API**.
- Improved UX with filtering, watchlist, and alert toggling.

---

### Step 6: Testing Steps

1. **Install Dependencies**:
```bash
   cd anomalyze
   npm install
   npm install framer-motion socket.io-client@latest recharts
   cd anomalyze-backend
   npm install express socket.io axios dotenv socket.io-client
```

2. **Configure Backend**:
   - Create `anomalyze-backend/.env`:
```env
     NODIT_API_KEY=your_nodit_api_key
     WEBSOCKET_URL=wss://web3.nodit.io/v1/websocket
     PORT=5000
```

3. **Run the Backend**:
   ```bash
   cd anomalyze-backend
   node index.js
   ```

4. **Run the Front-End**:
   ```bash
   cd anomalyze
   npm start
   ```

5. **Verify Functionalities**:
   - **Dashboard**:
     - Mock or real anomalies (via **Nodit Webhook/Stream**) appear every 10 seconds.
     - Sort anomalies by score or time.
     - Click “View Report” or “Add to Watchlist” to see browser alerts.
   - **Visualizations**:
     - View a line chart of anomaly scores over time.
   - **Reports**:
     - Filter reports by chain (All, Ethereum, Polygon).
     - Click “Generate Report” to view details and “Download Report” or “Export All Reports” for alerts.
   - **Settings**:
     - Update threshold, switch chains, toggle alerts, or validate API key to see alerts.
   - Open `http://localhost:3000` and check animations and responsiveness.

6. **Debug Issues**:
   - Check browser console for errors (WebSocket, fetch, rendering).
   - Verify backend logs for Nodit API calls and client connections.
   - Run `npm run build` to ensure no compilation errors.
   - Share any errors for debugging.

---

### Step 7: Alignment

- **Clear Nodit Usage**:
  - Backend explicitly uses **Nodit Webhook/Stream** and **Web3 Data API** with real API calls (mock fallback).
  - **Nodit MCP** Z-score analysis enhances anomaly detection.
  - README and comments highlight Nodit integration.
- **Code Progress**:
  - Fixed compilation errors for a stable build.
  - Added visualizations and new virtual functionalities (watchlist, report filtering, alert toggle, API key validation).
- **Roadmap Execution**:
  - Implemented Wave 2’s visualization and multi-chain plans.
  - Added MCP for advanced anomaly scoring, preparing for Wave 3.
- **UX**:
  - Enhanced interactivity with sorting, filtering, watchlist, and alert toggling.
  - Animations and charts improve visual appeal.

---