// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AnomalyRegistry {
    struct Anomaly {
        string token;
        uint256 score;
        uint256 timestamp;
        string chain;
    }

    mapping(uint256 => Anomaly) public anomalies;
    uint256 public anomalyCount;

    event AnomalyDetected(uint256 indexed id, string token, uint256 score, uint256 timestamp, string chain);

    constructor() {
        anomalyCount = 0;
    }

    function logAnomaly(string memory _token, uint256 _score, string memory _chain) public {
        anomalyCount++;
        anomalies[anomalyCount] = Anomaly(_token, _score, block.timestamp, _chain);
        emit AnomalyDetected(anomalyCount, _token, _score, block.timestamp, _chain);
    }

    function getAnomaly(uint256 _id) public view returns (string memory, uint256, uint256, string memory) {
        Anomaly memory a = anomalies[_id];
        return (a.token, a.score, a.timestamp, a.chain);
    }
}