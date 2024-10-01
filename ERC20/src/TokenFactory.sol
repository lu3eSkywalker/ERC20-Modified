// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ERC20.sol";

contract TokenFactory {
    address[] public deployedTokens;
    mapping(address => address[]) public ownerTokens;

    event TokenCreated(address tokenAddress, address owner);

    function createToken(uint256 initialSupply, string memory tokenName, string memory tokenSymbol, string memory metadataURI) public returns (address) {
        ERC20 newToken = new ERC20(initialSupply, tokenName, tokenSymbol, metadataURI);

        newToken.transfer(msg.sender, initialSupply);

        deployedTokens.push(address(newToken));
        ownerTokens[msg.sender].push(address(newToken));

        emit TokenCreated(address(newToken), msg.sender);

        return address(newToken);
    }

    function getAllDeployedTokens() public view returns (address[] memory) {
        return deployedTokens;
    }

    function getTokensByOwner(address owner) public view returns (address[] memory) {
        return ownerTokens[owner];
    }

    /**
     * @dev Fetches the metadata URI of a token by its contract address.
     * @param tokenAddress The address of the deployed token contract.
     * @return metadataURI The metadata URI of the specified token contract.
     */
    function getMetadataURI(address tokenAddress) public view returns (string memory) {
        ERC20 token = ERC20(tokenAddress);
        return token.metadataURI();
    }

    function getTokenInfoOfToken(address tokenAddress) public view returns (string memory name, string memory symbol, uint256 totalSupply) {
        ERC20 token = ERC20(tokenAddress);
        
        // Retrieve the token's name, symbol, and total supply
        name = token.name();
        symbol = token.symbol();
        totalSupply = token.totalSupply();
        
        return (name, symbol, totalSupply);
    }
}
