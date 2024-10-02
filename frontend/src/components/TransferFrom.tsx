import React, { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const TransferFrom = () => {
  const [originalOwner, setOriginalOwner] = useState<string>("");
  const [addressToSend, setAddressToSend] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xbf9fBFf01664500A33080Da5d437028b07DFcC55"
  );

  const ABI = [
    "function transferFrom(address, address, uint256) public returns (bool success)",
  ];


  async function transferTokens() {
    if(window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress || "", ABI, signer);

        const tokenAmountToSend = ethers.parseUnits(tokenAmount, 18);

        const toSend = await contract.transferFrom(
          originalOwner,
          addressToSend,
          tokenAmountToSend
        );
        console.log(toSend.toString());

      } catch (error: any) {
        console.error("Error launching token:", error);
        alert("An error occurred while launching the token. Check console for details.");
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }

  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <input
          type="text"
          placeholder="Original Owner"
          onChange={(e) => setOriginalOwner(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Address to Send"
          onChange={(e) => setAddressToSend(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Enter Contract Address"
          onChange={(e) => setContractAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="token amount"
          onChange={(e) => setTokenAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />

        <button onClick={() => transferTokens()}>Transfer Tokens</button>
      </div>
    </div>
  );
};

export default TransferFrom;