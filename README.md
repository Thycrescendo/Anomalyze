# Anomalyze

**AI-Powered Anomaly Detection for Token Markets**

Anomalyze is a decentralized application (dApp) built for the leveraging of **Nodit’s Blockchain Model Context Protocol (MCP)**, **Webhook/Stream**, and **Web3 Data API** to detect anomalies in token markets. The app monitors real-time token transfers, flags unusual activities (e.g., high-volume trades), and provides anomaly scores and alerts. Built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, Anomalyze offers a modern, animated UI for Web3 data monitoring.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Nodit Integration](#nodit-integration)
- [Anomaly Detection Logic](#anomaly-detection-logic)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Anomalyze combines AI and blockchain data to monitor token markets for irregularities, such as unusual trading volumes or suspicious wallet activities. It integrates **Nodit’s Webhook/Stream** for real-time data, **Web3 Data API** for historical data, and **MCP** for AI-driven analysis. The front-end features a responsive dashboard with animated anomaly cards, real-time alerts, and a settings panel for customizable thresholds.

This project addresses the Wavehack Buildathon’s goal of creating innovative Web3 + AI applications, with a focus on real-time data processing and user-friendly UX.

---

## Features

- **Real-Time Anomaly Detection**: Flags high-volume token transfers using Nodit’s Webhook/Stream.
- **Anomaly Scoring**: Assigns scores (e.g., 95 for anomalies, 10 for normal) based on volume thresholds.
- **Real-Time Alerts**: Displays new anomalies in a banner for 5 seconds.
- **Historical Data**: Fetches past token transfers via Nodit’s Web3 Data API.
- **Customizable Thresholds**: Allows users to adjust anomaly detection thresholds in the settings panel.
- **Responsive UI**: Adapts to mobile, tablet, and desktop with Tailwind CSS.
- **Animated Dashboard**: Uses Framer Motion for smooth transitions and engaging visuals.

---

## Tech Stack

- **Front-End**:
  - **React**: Component-based UI framework.
  - **TypeScript**: Type-safe JavaScript.
  - **Tailwind CSS**: Utility-first CSS for styling.
  - **Framer Motion**: Animations for UX.
  - **Socket.IO**: Real-time WebSocket communication.
- **Backend**:
  - **Node.js/Express**: API and WebSocket server.
  - **Socket.IO**: Broadcasts real-time anomalies.
  - **Axios**: Handles Nodit API requests.
- **Blockchain Integration**:
  - **Nodit Webhook/Stream**: Streams real-time token transfer events.
  - **Nodit Web3 Data API**: Retrieves historical token data.
  - **Nodit MCP**: Processes data for AI-driven anomaly detection (planned).
- **Development Tools**:
  - Node.js, npm, PostCSS, Autoprefixer

---

## Nodit Integration

Anomalyze leverages Nodit’s Web3 infrastructure for real-time and historical data processing:

1. **Webhook/Stream**:
   - Subscribes to Ethereum token transfer events via Nodit’s WebSocket API.
   - Example subscription:
     ```javascript
     ws.emit('subscription', 'anomalyze_001', 'TOKEN_TRANSFER', {
       description: 'Monitor Ethereum token transfers',
       condition: { protocol: 'ethereum', network: 'mainnet' },
     });
     ```
   - Streams data to the backend, which broadcasts anomalies to the front-end.[](https://developer.nodit.io/reference/how-to-use-stream)

2. **Web3 Data API**:
   - Fetches historical token transfers for a given account.
   - Example API call:
     ```bash
     curl --request POST \
       --url https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount \
       --header 'X-API-KEY: YOUR_API_KEY' \
       --data '{
         "accountAddress": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
         "fromDate": "2025-06-01T00:00:00+00:00",
         "toDate": "2025-06-10T00:00:00+00:00"
       }'
     ```
   - Used to display past anomalies in the dashboard.[](https://developer.nodit.io/docs/nodit-overview)

3. **Model Context Protocol (MCP)**:
   - Planned integration to feed token transfer data to an AI model (e.g., Claude) for advanced anomaly detection.
   - Example use case: Analyze wallet activity for unusual patterns using natural language prompts.
   - Current implementation uses a threshold-based algorithm as a placeholder.[](https://www.investing.com/news/cryptocurrency-news/nodit-launches-blockchain-mcp-to-bring-blockchain-context-to-gpts-and-ai-tools-4069100)

---

## Anomaly Detection Logic

The current anomaly detection uses a **threshold-based algorithm**:
- **Input**: Token transfer data (e.g., value, token, timestamp) from Nodit’s Webhook/Stream or Web3 Data API.
- **Logic**: Flags transfers with a value > 10,000 units as anomalies (score: 95). Others are non-anomalies (score: 10).
- **Output**: Anomaly objects with token, volume, score, and timestamp, displayed in the dashboard.

**Example**:
```javascript
function detectAnomaly(transfer) {
  const volume = parseFloat(transfer.value);
  const threshold = 10000;
  return volume > threshold ? { ...transfer, score: 95, isAnomaly: true } : { ...transfer, score: 10, isAnomaly: false };
}
Future Enhancement:
Integrate Nodit MCP to use AI models for statistical analysis (e.g., Z-score) or machine learning to detect complex patterns.
Example: Z-score = (volume - mean_volume) / std_dev_volume. Flag Z-score > 3 as anomalies.
Installation
Prerequisites
Node.js: v16.x or higher
npm: v7.x or higher
Nodit API Key: Obtain from Nodit Console
Front-End Setup
Clone the repository:
bash
git clone https://github.com/thycrescendo/anomalyze.git
cd anomalyze
Install dependencies:
bash
npm install
Initialize Tailwind CSS:
bash
npx tailwindcss init -p
Start the front-end:
bash
npm start
Backend Setup
Navigate to the backend directory:
bash
cd anomalyze-backend
Install dependencies:
bash
npm install
Create a .env file:
env
NODIT_API_KEY=your_nodit_api_key
NODIT_WEBSOCKET_URL=wss://web3.nodit.io/v1/websocket
PORT=5000
Start the backend:
bash
node index.js
Usage
Launch the App:
Run the backend (node index.js) and front-end (npm start).
Open http://localhost:3000.
Monitor Anomalies:
View real-time anomaly alerts in the banner.
Browse anomaly cards with token, volume, score, and timestamp.
Adjust Settings:
Set a custom volume threshold in the settings panel.
View Historical Data:

Dashboard displays past anomalies fetched via Nodit’s Web3 Data API.
Project Structure


Future Roadmap
Full MCP Integration: Use AI models for advanced anomaly detection.
Detailed Reports: Generate comprehensive anomaly reports via Web3 Data API.
Multi-Chain Support: Extend to Aptos, Bitcoin, and other chains.
Enhanced UX: Add charts and visualizations for anomaly trends.
Deployment: Host on Vercel (front-end) and Render (backend).
Contributing
Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.


---

## Testing and Validation
1. **Run Both Servers**:
   - Backend: `cd anomalyze-backend && node index.js`
   - Front-End: `cd anomalyze && npm start`
2. **Verify Features**:
   - Real-time alerts appear when mock or Nodit data triggers anomalies.
   - Historical anomalies load in the dashboard.
   - Settings panel updates thresholds (alert confirms).
   - UI is responsive on mobile devices.
3. **Check Nodit Integration**:
   - WebSocket logs show subscription events.
   - API endpoint returns historical data.

---


- **Nodit Integration**: Implemented Webhook/Stream and Web3 Data API; planned MCP for AI analysis.
- **Anomaly Detection**: Defined threshold-based logic with plans for AI enhancement.
- **UX**: Added alerts, settings, color-coded cards, and responsive design.
- **Acceleration**: Used mock data and prioritized minimal viable features.
