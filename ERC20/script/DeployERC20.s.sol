// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Script} from "forge-std/Script.sol";
import {ERC20} from "../src/ERC20.sol";
import {TokenFactory} from "../src/TokenFactory.sol";

contract DeployERC20 is Script {
    function run() external returns (TokenFactory, address) {
        // Define initial supply, token name, and symbol
        uint256 initialSupply = 10000;
        string memory tokenName = "Baby-Yoda-Coin";
        string memory tokenSymbol = "Yoda";
        
        // Start broadcasting transactions
        vm.startBroadcast();
        
        // Deploy the TokenFactory
        TokenFactory tokenFactory = new TokenFactory();

        // Use the factory to create a new ERC20 token
        address newTokenAddress = tokenFactory.createToken(initialSupply, tokenName, tokenSymbol);
        
        // Stop broadcasting
        vm.stopBroadcast();
        
        // Return the deployed TokenFactory and the newly created token address
        return (tokenFactory, newTokenAddress);
    }
}
