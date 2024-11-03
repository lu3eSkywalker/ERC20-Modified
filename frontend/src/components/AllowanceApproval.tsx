import React, { useState } from "react";
import { ethers } from "ethers";
import AllowanceApprovalInfo from "./Walkthrough/AllowanceApprovalInfo";

const AllowanceApproval = () => {
  const [spenderAddress, setSpenderAddress] = useState<string>("");
  const [allowance, setAllowance] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const [contractAddress, setContractAddress] = useState<string>(
    "0xbf9fBFf01664500A33080Da5d437028b07DFcC55"
  );

  const [tokenAllowanceApprovalResponse, setTokenAllowanceApprovalResponse] =
    useState<string>("");

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

        const allowanceEth = ethers.parseUnits(allowance, 18);

        const toApprove = await contract.approve(spenderAddress, allowanceEth);
        const response = await toApprove.wait();
        console.log(toApprove);
        setHash(toApprove.hash);

        if (response.status == 1) {
          setTokenAllowanceApprovalResponse("");
        } else {
          setTokenAllowanceApprovalResponse("Error Approving the transaction");
        }
      } catch (error) {
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
    <div className="bg-gray-100">
      <br />
      <br />
      <br />

      <div className="flex flex-col items-center bg-gray-100">
        <AllowanceApprovalInfo />
      </div>
      <div
        className="bg-gray-100 flex flex-col justify-center items-center"
        style={{ height: "66.1vh" }}
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

          <div className="text-lg font-bold mt-4">
            {tokenAllowanceApprovalResponse}
          </div>
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
    </div>
  );
};

export default AllowanceApproval;
