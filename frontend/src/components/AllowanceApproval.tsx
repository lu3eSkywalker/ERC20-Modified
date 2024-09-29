import React, { useState } from "react";
import { ethers } from "ethers";

const AllowanceApproval = () => {
  const [spenderAddress, setSpenderAddress] = useState<string>("");
  const [allowance, setAllowance] = useState<number>();
  const [hash, setHash] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xbf9fBFf01664500A33080Da5d437028b07DFcC55"
  );

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const ABI = [
    "function approve(address, uint256) public returns (bool success)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY || "", provider);

  const contract = new ethers.Contract(contractAddress || "", ABI, wallet);

  async function approve() {
    const toApprove = await contract.approve(spenderAddress, allowance);

    // console.log(toApprove.toString());
    console.log(toApprove);
    setHash(toApprove.hash);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            This allowance approval can be used for two things:
          </p>
          <p className="text-gray-700 mb-2">
            1. To approve a user on their behalf to spend/transfer the tokens.
          </p>
          <p className="text-gray-700 mb-2">
            2. To approve the user on their behalf to burn the tokens.
          </p>
        </div>

        <input
          type="text"
          placeholder="eth address"
          onChange={(e) => setSpenderAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="eth amount"
          onChange={(e) => setAllowance(parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Enter Contract Address"
          onChange={(e) => setContractAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="min-h-8">
          {hash && (
            <h2 className="text-lg font-semibold text-center break-words">
              {`Tx Hash: ${hash}`}
              <br />
              <br />
              <p className="font-semibold">Allowance approved</p>
            </h2>
          )}
        </div>
        <button
          className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          onClick={() => approve()}
        >
          To Approve
        </button>
      </div>
    </div>
  );
};

export default AllowanceApproval;