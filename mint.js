const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");
require('dotenv').config();

const tokenAddress = "0x55Cb406C711B338A96D540850774BA4c01EB4849"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xCBff759a27f7A81925ef44081B9B5417fE529DD7"; 

async function main() {
  const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

  for (let i = 0; i < tokenUrls.length; i++) {
    const tokenId = i + 1;
    const ipfsURI = tokenUrls[i];
    const prompt = "Token prompt #" + tokenId; 

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
