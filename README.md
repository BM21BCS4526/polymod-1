**Building with Polygon Bridge**

In this project, I've set up an NFT collection on the Ethereum blockchain and used the Polygon Bridge to transfer assets. 

**Description**

Firstly I have generated AI-based images for NFT transfer in this project. Then created a smart contract MetaToken.sol and deployed it on the goerli network.
Minted the nfts, approved and deposited these nfts and lastly created getBalnace.js for getting the balance of the token generated on the Mumbai network.

**Getting Started**

**Deployment**


 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaToken is ERC721URIStorage, Ownable {
    constructor() ERC721("MetaToken", "MTA") {}

    function mint(address to, uint256 tokenId, string memory prompt, string memory ipfsURI) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, convertIPFSURI(ipfsURI));
        _setTokenPrompt(tokenId, prompt);
    }

    function promptDescription(uint256 tokenId) public view returns (string memory) {
        return _tokenPrompts[tokenId];
    }

    function convertIPFSURI(string memory ipfsURI) internal pure returns (string memory) {
    
        return ipfsURI;
    }

    mapping(uint256 => string) private _tokenPrompts;

    function _setTokenPrompt(uint256 tokenId, string memory prompt) internal {
        _tokenPrompts[tokenId] = prompt;
    }
}
we can run these script using the command:npx hardhat run scripts/deploy.js --network goerli
npx hardhat run scripts/mint.js --network goerli
 npx hardhat run scripts/approveDeposit.js --network goerli
 npx hardhat run scripts/getBalance.js --network mumbai

 
 **Author**

 Baby Monal
