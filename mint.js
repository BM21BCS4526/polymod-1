const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");
require('dotenv').config();

const tokenAddress = "0x55Cb406C711B338A96D540850774BA4c01EB4849"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xCBff759a27f7A81925ef44081B9B5417fE529DD7"; // Place your public address for your wallet here
const tokenUrls = [
  "ipfs://QmYUvviBgriWavWijJ9q4bFKZv4sgnAKPbpBUqY8GcxmwA/7fddfb96-23a3-4e28-8c50-679c7f9a98cf.jpg",
  "ipfs://QmYUvviBgriWavWijJ9q4bFKZv4sgnAKPbpBUqY8GcxmwA/80e339f0-35a9-48d4-8da4-2dbc4155bc03.jpg",
  "ipfs://QmYUvviBgriWavWijJ9q4bFKZv4sgnAKPbpBUqY8GcxmwA/be99c598-556a-413b-8668-ba782d77c9b8.jpg",
  "ipfs://QmYUvviBgriWavWijJ9q4bFKZv4sgnAKPbpBUqY8GcxmwA/c0d63920-abf9-4614-971e-b98ca2789e65.jpg",
  "ipfs://QmYUvviBgriWavWijJ9q4bFKZv4sgnAKPbpBUqY8GcxmwA/f9899424-e0c9-45a8-af04-87c44fbd6bf9.jpg" 
];

async function main() {
  const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

  for (let i = 0; i < tokenUrls.length; i++) {
    const tokenId = i + 1;
    const ipfsURI = tokenUrls[i];
    const prompt = "Token prompt #" + tokenId; // Replace this with your desired prompt

    const tx = await token.mint(walletAddress, tokenId, prompt, ipfsURI);
    await tx.wait();

    console.log(`Token #${tokenId} minted successfully.`);
  }

  console.log("Batch minting completed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
