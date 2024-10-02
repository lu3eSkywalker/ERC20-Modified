import React, { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any; // You can also specify a more accurate type if needed
  }
}

const TokenTransfer = () => {
  const [toSendToAddress, setToSendToAddress] = useState<string>("");
  const [ethToSend, setEthToSend] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xbf9fBFf01664500A33080Da5d437028b07DFcC55"
  );
  const [hash, setHash] = useState<string>("");

  const ABI = [
    "function transfer(address,uint256) public returns (bool success)",
  ];

  async function tokenTransfer() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        const contract = new ethers.Contract(contractAddress || "", ABI, signer);

        const tokenAmount = ethers.parseUnits(ethToSend, 18);
        const transferToken = await contract.transfer(
          toSendToAddress,
          tokenAmount,
          {
            gasLimit: 10000000,
          }
        );
    
        const receipt = await transferToken.wait();
        console.log("Hash: ", receipt.hash);
        setHash(receipt.hash);


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
        <h1 className="text-2xl font-bold mb-6 text-center">Token Transfer</h1>

        <p>
          You should be the owner of the token to transfer it to other users
        </p>
        <br />

        <input
          type="text"
          placeholder="eth address to send"
          onChange={(e) => setToSendToAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <br />

        <input
          type="text"
          placeholder="Enter Contract Address"
          onChange={(e) => setContractAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <br />

        <input
          type="number"
          placeholder="Token amount"
          onChange={(e) => setEthToSend(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <br />

        <div className="min-h-8">
          {hash && (
            <h2 className="text-lg font-semibold text-center break-words">
              {`Tx Hash: ${hash}`}
              <br />
              <br />
              <p className="font-semibold">Tokens sent successfully</p>
            </h2>
          )}
        </div>

        <button
          className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          onClick={() => tokenTransfer()}
        >
          Transfer Token
        </button>
      </div>
    </div>
  );
};

export default TokenTransfer;
