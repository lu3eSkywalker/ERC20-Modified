import React, { useState } from "react";
import { ethers } from "ethers";

const tokenlaunch = () => {
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const [privateKey, setPrivateKey] = useState<string>(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  );

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = [
    "function createToken(uint256, string memory, string memory) public returns (address)",
    "function getTokensByOwner(address) public view returns (address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY || "", provider);

  const contract = new ethers.Contract(contractAddress || "", ABI, wallet);

  async function launchToken() {
    try {
      const supply = ethers.parseUnits(tokenSupply, 1);
      const txResponse = await contract.createToken(
        supply,
        tokenName,
        tokenSymbol
      );
      const receipt = await txResponse.wait();

      // Log the entire receipt
      console.log("Transaction Receipt:", receipt);
      setHash(receipt.hash);
    } catch (error) {
      console.error("Error launching token:", error);
      alert(
        "An error occurred while launching the token. Check console for details."
      );
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-80">
          <input
            type="text"
            placeholder="token name"
            onChange={(e) => setTokenName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <br />

          <input
            type="text"
            placeholder="token symbol"
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <br />

          <input
            type="text"
            placeholder="token supply"
            onChange={(e) => setTokenSupply(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <br />

          <div className="min-h-8">
            {hash && (
              <h2 className="text-lg font-semibold text-center break-words">
                {`Tx Hash: ${hash}`}
                <br />
                <br />
                <p className="font-semibold">Token Created</p>

                <br></br>

                <p>Get Token Contract Address</p>
              </h2>
            )}
          </div>

          <button onClick={() => launchToken()}>Launch Token</button>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default tokenlaunch;