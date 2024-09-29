import React, { useState } from "react";
import { ethers } from "ethers";

const TokenInfo = () => {
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  const [contractAddress, setContractAddress] = useState<string>("0xa783cdc72e34a174cca57a6d9a74904d0bec05a9");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = [
    "function getTokenInfo() public view returns(string memory, string memory, uint256, uint256)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY || "", provider);

  const contract = new ethers.Contract(contractAddress || "", ABI, wallet);

  async function tokenInfo() {
    const tokenInfo = await contract.getTokenInfo();

    const fullTokenInfo = tokenInfo.toString();
    console.log(fullTokenInfo);
    const name = fullTokenInfo.split(",")[0];
    setTokenName(name);

    const symbol = fullTokenInfo.split(",")[1];
    setTokenSymbol(symbol);

    const totalSupply = fullTokenInfo.split(",")[2];
    setTokenSupply(totalSupply);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <div>
          <input
            type="text"
            placeholder="contract address"
            onChange={(e) => setContractAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button onClick={() => tokenInfo()}>Token Info</button>
        <br></br>
        <br></br>

        <p>Name: {tokenName}</p>
        <br />
        <p>Symbol: {tokenSymbol}</p>
        <br />
        <p>Supply: {tokenSupply}</p>
      </div>
    </div>
  );
};

export default TokenInfo;
