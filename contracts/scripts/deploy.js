const hre = require("hardhat");

async function main() {
  const AnomalyRegistry = await hre.ethers.getContractFactory("AnomalyRegistry");
  const anomalyRegistry = await AnomalyRegistry.deploy();
  await anomalyRegistry.deployed();
  console.log("AnomalyRegistry deployed to:", anomalyRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});