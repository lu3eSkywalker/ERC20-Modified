import React, { useState } from "react";
import { ethers } from "ethers";

const AllowanceApproval = () => {
  const [spenderAddress, setSpenderAddress] = useState<string>("");
  const [allowance, setAllowance] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const [contractAddress, setContractAddress] = useState<string>(
    "0xbf9fBFf01664500A33080Da5d437028b07DFcC55"
  );

  const [tokenAllowanceApprovalResponse, setTokenAllowanceApprovalResponse] = useState<string>("");

  const ABI = [
    "function approve(address, uint256) public returns (bool success)",
  ];

  async function approve() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress || "",
          ABI,
          signer
        );

        const allowanceEth = ethers.parseUnits(allowance, 1);

        const toApprove = await contract.approve(spenderAddress, allowanceEth);
        console.log(toApprove);
        setHash(toApprove.hash);

        const response = await toApprove.wait();
        if(response.status == 1) {
          setTokenAllowanceApprovalResponse("");
        } else {
          setTokenAllowanceApprovalResponse("Error Approving the transaction");
        }
      } catch (error: any) {
        console.error("Error approving the tokens:", error);
        alert(
          "An error occurred while approving the tokens. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div
      className="bg-gray-100 flex flex-col justify-center items-center"
      style={{ height: "75vh" }}
    >
      <div className="bg-white shadow-md rounded-lg p-8 w-[550px] mb-6">
        <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
          Address:
          <input
            type="text"
            className="grow"
            placeholder="eth address to approve"
            onChange={(e) => setSpenderAddress(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
          Amount:
          <input
            type="text"
            className="grow"
            placeholder="eth amount"
            onChange={(e) => setAllowance(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
          Address:
          <input
            type="text"
            className="grow"
            placeholder="Enter Contract Address"
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </label>

        <button
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
          onClick={() => approve()}
        >
          To Approve
        </button>

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

        {/* {errorMessage && (
          <div className="text-red-500 text-lg font-bold mt-4">
            {errorMessage}
          </div>
        )} */}

        <div className="text-lg font-bold mt-4">{tokenAllowanceApprovalResponse}</div>
      </div>

      <br />
      <br />
      <br />
      <br />

      <div className="text-center text-gray-700 font-medium">
        <ul className="steps text-xl">
          <li className="step step-primary">
            <a href="./tokenlaunch">Token Launch</a>
          </li>
          <li className="step step-primary">
            <a href="./gettokenscreatedbyowners">
              Get Our Token Contract Address
            </a>
          </li>
          <li className="step step-primary">
            <a href="./tokentransfer">Token Transfer</a>
          </li>
          <li className="step step-primary">
            <a href="./burntokens">Burn Tokens</a>
          </li>
          <li className="step step-primary">
            <a href="./allowanceapproval">Allowance Approval</a>
          </li>
          <li className="step ">
            <a href="./transferfrom">Transfer From</a>
          </li>
          <li className="step ">
            <a href="./burnfrom">Burn From</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AllowanceApproval;

{
  /* <div className="flex justify-center items-center h-screen bg-gray-100">
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
    onChange={(e) => setAllowance(e.target.value)}
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
</div> */
}
