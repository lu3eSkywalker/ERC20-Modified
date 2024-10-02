import React, { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const BurnFrom = () => {
  const [ethAddress, setEthAddress] = useState<string>("");
  const [tokenAmt, setTokenAmt] = useState<string>("");
  const [hash, setHash] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xbf9fBFf01664500A33080Da5d437028b07DFcC55"
  );

  const ABI = [
    "function burnFrom(address, uint256) public returns (bool success)",
  ];

  async function burnFrom() {
    if(window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress || "", ABI, signer);

        const tokenAmount = ethers.parseUnits(tokenAmt, 18)

        const burnTokens = await contract.burnFrom(ethAddress, tokenAmount);
        console.log(burnTokens);
        setHash(burnTokens.hash);

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
          placeholder="Eth Address"
          onChange={(e) => setEthAddress(e.target.value)}
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
          placeholder="Token Amt"
          onChange={(e) => setTokenAmt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="min-h-8">
          {hash && (
            <h2 className="text-lg font-semibold text-center break-words">
              {`Tx Hash: ${hash}`}
              <br />
              <br />

              <p className="font-semibold">Tokens Burnt successfully</p>
            </h2>
          )}
        </div>

        <button
          className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          onClick={() => burnFrom()}
        >
          Burn Tokens
        </button>
      </div>
    </div>
  );
};

export default BurnFrom;
