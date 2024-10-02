import React, { useState } from "react";
import { ethers } from "ethers";

const GetTokenCreatedByOwner = () => {
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [tokens, setTokens] = useState<string[]>([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getTokensByOwner(address) public view returns (address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const contract = new ethers.Contract(contractAddress || "", ABI, provider);

  async function getTokensByOwner() {
    const getTokens = await contract.getTokensByOwner(ownerAddress);

    console.log(getTokens);
    setTokens(getTokens);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <input
          type="text"
          placeholder="ownerAddress"
          onChange={(e) => setOwnerAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <br />
        <br />

        <button onClick={() => getTokensByOwner()}>getTokensByOwner</button>

        <br />
        <br />

        <div className="min-h-8">
          {tokens.map((data) => (
            <div className="text-lg font-semibold text-center break-words">
              {data}
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetTokenCreatedByOwner;