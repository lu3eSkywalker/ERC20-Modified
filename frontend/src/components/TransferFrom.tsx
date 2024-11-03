import React, { useState } from "react";
import { ethers } from "ethers";
import TransferFromInfo from "./Walkthrough/TransferFromInfo";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const TransferFrom = () => {
  const [originalOwner, setOriginalOwner] = useState<string>("");
  const [addressToSend, setAddressToSend] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xbf9fBFf01664500A33080Da5d437028b07DFcC55"
  );

  const [tokenTransferFromResponse, setTokenTransferFromResponse] =
    useState<string>("");

  const ABI = [
    "function transferFrom(address, address, uint256) public returns (bool success)",
  ];

  async function transferTokens() {
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

        const tokenAmountToSend = ethers.parseUnits(tokenAmount, 18);

        const toSend = await contract.transferFrom(
          originalOwner,
          addressToSend,
          tokenAmountToSend
        );
        console.log(toSend.toString());

        const response = await toSend.wait();

        if (response.status == 1) {
          setTokenTransferFromResponse("");
        } else {
          setTokenTransferFromResponse("Error Transferring the token");
        }
      } catch (error) {
        console.error("Error transferring token:", error);
        alert(
          "An error occurred while transferring the token. Check console for details."
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
        <TransferFromInfo />
      </div>
      <div
        className="bg-gray-100 flex flex-col justify-center items-center"
        style={{ height: "66.2vh" }}
      >
        <div className="bg-white shadow-md rounded-lg p-8 w-[550px] mb-6">
          <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
            Address:
            <input
              type="text"
              className="grow"
              placeholder="Original Owner"
              onChange={(e) => setOriginalOwner(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
            Address:
            <input
              type="text"
              className="grow"
              placeholder="Address to Send"
              onChange={(e) => setAddressToSend(e.target.value)}
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

          <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
            Amount:
            <input
              type="number"
              className="grow"
              placeholder="token amount"
              onChange={(e) => setTokenAmount(e.target.value)}
            />
          </label>

          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
            onClick={() => transferTokens()}
          >
            Transfer Tokens
          </button>

          <div className="text-lg font-bold mt-4">
            {tokenTransferFromResponse}
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
            <li className="step step-primary">
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

export default TransferFrom;
