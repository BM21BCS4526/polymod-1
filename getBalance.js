const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");

const tokenAddress = "0x08e450d7BA9842d1C2095e85A04FBaC88E726171";
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xCBff759a27f7A81925ef44081B9B5417fE529DD7"; 

async function main() {
  const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

  const balance = await token.balanceOf(walletAddress);
  console.log(`Balance of tokens for address ${walletAddress}: ${balance}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
