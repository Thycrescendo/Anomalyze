# Anomalyze

**AI-Powered Anomaly Detection for Token Markets**  

Anomalyze is a decentralized application (dApp) leveraging Nodit’s Blockchain Model Context Protocol (MCP) to combine AI-driven analysis with real-time token market data. It detects anomalies such as unusual trading volumes or suspicious wallet activities and provides users with anomaly scores, detailed reports, and customizable alerts.

With a sleek, animated front-end built using React, TypeScript, Tailwind CSS, and Framer Motion, Anomalyze aims to make Web3 data monitoring intuitive and accessible.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Nodit Integration](#nodit-integration)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🔍 Overview

Anomalyze harnesses the power of AI and blockchain data to monitor token markets for irregularities. By integrating Nodit’s MCP, Webhook/Stream, and Web3 Data API, the dApp provides real-time insights into token movements, enabling users to stay ahead of potential risks.

This project aligns with the Wavehack Buildathon’s goal of combining AI and Web3 to create innovative, scalable applications. Anomalyze lowers barriers to Web3 adoption by offering a user-friendly interface for monitoring complex blockchain data.

---

## ✨ Features

- **Anomaly Detection**: Identifies unusual trading volumes or suspicious wallet activities using AI.
- **Anomaly Scoring**: Assigns severity-based scores to detected anomalies.
- **Real-Time Data**: Streams live token movement data via Nodit’s Webhook/Stream.
- **Detailed Reports** *(planned)*: Offers in-depth breakdowns of detected anomalies.
- **Customizable Alerts** *(planned)*: Lets users set thresholds for alert notifications.
- **Interactive UI**: Animated dashboards built with Framer Motion and Tailwind CSS.
- **Multi-Chain Support**: Compatible with Ethereum, XRPL, and Polygon (via Nodit APIs).

---

## 🧰 Tech Stack

### Front-End
- **React** – Component-based UI framework.
- **TypeScript** – Type-safe JavaScript for maintainability.
- **Tailwind CSS** – Utility-first CSS for rapid styling.
- **Framer Motion** – High-performance animations.

### Blockchain Integration *(Planned)*
- **Nodit MCP** – AI model integration for anomaly detection.
- **Nodit Webhook/Stream** – Real-time blockchain event streaming.
- **Nodit Web3 Data API** – Structured blockchain data retrieval.

### Development Tools
- Node.js, npm
- PostCSS, Autoprefixer

---

## 🔌 Nodit Integration

Anomalyze uses Nodit’s developer suite for AI-enhanced anomaly detection:

- **Nodit MCP**: Integrates AI models to dynamically analyze blockchain data.
- **Webhook/Stream**: Provides real-time token transfer and wallet activity data.
- **Web3 Data API**: Retrieves historical transaction data to support detailed analysis.

#### Example Web3 Data API Query *(Planned)*

```bash
curl --request POST \
  --url https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount \
  --header 'X-API-KEY: YOUR_API_KEY' \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '{
    "accountAddress": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "fromDate": "2025-06-01T00:00:00+00:00",
    "toDate": "2025-06-10T00:00:00+00:00"
  }'
````

---

## 🛠 Installation

### Prerequisites

* Node.js v16.x or higher
* npm v7.x or higher
* Nodit API Key (required for backend features)

### Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/anomalyze.git
cd anomalyze
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

#### 4. Configure Environment

Create a `.env` file in the root directory:

```env
REACT_APP_NODIT_API_KEY=your_api_key
```

#### 5. Start the Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Usage

### Launch the App

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

### Explore the Dashboard

* View mock data for tokens (e.g., ETH, USDT).
* Animated anomaly cards display anomaly scores.
* Click **“View Report”** (placeholder) for more details.
* Navigate to **“Settings”** to explore planned alert features.

> ⚠️ This is currently a front-end prototype. Full backend integration is in development.



## 🔮 Future Roadmap

* ✅ Backend Integration with Nodit MCP Server
* 🔄 Real-Time Streaming with Webhook/Stream
* 📊 In-Depth Anomaly Reports
* 🛎️ User-Defined Alert Thresholds
* 🌐 Multi-Chain Support (Aptos, Bitcoin, etc.)
* 📱 Mobile UX Optimization

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create a feature branch
   `git checkout -b feature/your-feature`
3. Commit your changes
   `git commit -m 'Add your feature'`
4. Push the branch
   `git push origin feature/your-feature`
5. Open a Pull Request

Please follow best practices for TypeScript and Tailwind CSS.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---
