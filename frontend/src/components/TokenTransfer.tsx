import React, { useState } from "react";
import { ethers } from "ethers";
import TokenTransferInfo from "./Walkthrough/TokenTransferInfo";

declare global {
  interface Window {
    ethereum: any;
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

        const contract = new ethers.Contract(
          contractAddress || "",
          ABI,
          signer
        );

        const tokenAmount = ethers.parseUnits(ethToSend, 1);
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
        alert(
          "An error occurred while launching the token. Check console for details."
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
      <br />

      <div className="flex flex-col items-center bg-gray-100">
        <TokenTransferInfo />
      </div>
      <div
        className="bg-gray-100 flex flex-col justify-center items-center"
        style={{ height: "70vh" }}
      >
        <div className="bg-white shadow-md rounded-lg p-8 w-[550px] mb-6">
          <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
            Address:
            <input
              type="text"
              className="grow"
              placeholder="eth address to send"
              onChange={(e) => setToSendToAddress(e.target.value)}
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
            Token_Amount:
            <input
              type="number"
              className="grow"
              placeholder="Token amount"
              onChange={(e) => setEthToSend(e.target.value)}
            />
          </label>

          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl my-2"
            onClick={() => tokenTransfer()}
          >
            Transfer Token
          </button>

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

          {/* <div className="text-lg font-bold mt-4">{tokenResponse}</div> */}
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
            <li className="step ">
              <a href="./burntokens">Burn Tokens</a>
            </li>
            <li className="step">
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

export default TokenTransfer;
