// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ERC20.sol";

contract TokenFactory {
    // Store all deployed token addresses
    address[] public deployedTokens;

    // Mapping to associate token addresses with their owners
    mapping(address => address[]) public ownerTokens;

    // Event to emit when a new token is deployed
    event TokenCreated(address tokenAddress, address owner);

    /**
     * @dev Creates a new ERC20 token.
     * @param initialSupply The initial supply of the token.
     * @param tokenName The name of the token.
     * @param tokenSymbol The symbol of the token.
     * @return The address of the newly created token contract.
     */
    function createToken(uint256 initialSupply, string memory tokenName, string memory tokenSymbol) public returns (address) {
        // Deploy a new ERC20 token
        ERC20 newToken = new ERC20(initialSupply, tokenName, tokenSymbol);

        // Transfer ownership of the newly created token to the sender
        newToken.transfer(msg.sender, initialSupply);

        // Store the token's address in the deployedTokens array
        deployedTokens.push(address(newToken));

        // Map the new token address to the owner's address
        ownerTokens[msg.sender].push(address(newToken));

        // Emit an event with the new token address and the owner
        emit TokenCreated(address(newToken), msg.sender);

        return address(newToken);  // Return the new token address
    }

    /**
     * @dev Get all deployed tokens.
     * @return The addresses of all deployed tokens.
     */
    function getAllDeployedTokens() public view returns (address[] memory) {
        return deployedTokens;
    }

    /**
     * @dev Get all tokens created by an owner.
     * @param owner The address of the owner.
     * @return The addresses of all tokens created by the owner.
     */
    function getTokensByOwner(address owner) public view returns (address[] memory) {
        return ownerTokens[owner];
    }
}