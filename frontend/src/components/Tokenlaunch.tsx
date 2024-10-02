import React, { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const TokenLaunch = () => {
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [metadataURI, setMetadataURI] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  // Use contract address from the environment variables
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // ABI of the token contract
  const ABI = [
    "function createToken(uint256, string memory, string memory, string memory) public returns (address)",
    "function getTokensByOwner(address) public view returns (address[] memory)",
  ];

  async function launchToken() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress || "", ABI, signer);


        const supply = ethers.parseUnits(tokenSupply, 18);

        const txResponse = await contract.createToken(
          supply,
          tokenName,
          tokenSymbol,
          metadataURI
        );

        const receipt = await txResponse.wait();

        console.log("Transaction Receipt:", receipt);
        setHash(receipt.transactionHash);
      } catch (error: any) {
        console.error("Error launching token:", error);
        alert("An error occurred while launching the token. Check console for details.");
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-80">
          <input
            type="text"
            placeholder="Token Name"
            onChange={(e) => setTokenName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Token Symbol"
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Token Supply"
            onChange={(e) => setTokenSupply(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Token Metadata URI"
            onChange={(e) => setMetadataURI(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="min-h-8">
            {hash && (
              <h2 className="text-lg font-semibold text-center break-words">
                Tx Hash: {hash}
                <br />
                <p className="font-semibold">Token Created</p>
              </h2>
            )}
          </div>

          <button onClick={launchToken} className="w-full bg-blue-500 text-white py-2 rounded-md">
            Launch Token
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenLaunch;