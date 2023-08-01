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
