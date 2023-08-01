const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");

const tokenAddress = "0x55Cb406C711B338A96D540850774BA4c01EB4849";
const tokenABI = tokenContractJSON.abi;
const fxERC20RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0xCBff759a27f7A81925ef44081B9B5417fE529DD7"; 

const nftTokenIds = [1, 2, 3, 4, 5]; // Array of token IDs to transfer

async function main() {
  const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
  const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC20RootAddress);

  for (let i = 0; i < nftTokenIds.length; i++) {
    const tokenId = nftTokenIds[i];

    // Approve the NFT to be transferred
    const approveTx = await tokenContract.approve(fxERC20RootAddress, tokenId);
    await approveTx.wait();

    console.log(`Approval for NFT #${tokenId} confirmed`);

    // Deposit the NFT to the Bridge
    const depositTx = await fxContract.deposit(tokenAddress, walletAddress, tokenId, "0x6556");
    await depositTx.wait();

    console.log(`NFT #${tokenId} deposited to the Bridge`);
  }

  console.log("Batch NFT transfer completed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
