import React, { useState } from "react";
import { ethers } from "ethers";
import BurnTokensInfo from "./Walkthrough/BurnTokensInfo";

declare global {
  interface Window {
    ethereum: any;
  }
}

const BurnTokens = () => {
  const [tokenAmt, setTokenAmt] = useState<string>("");
  const [hash, setHash] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xbf9fBFf01664500A33080Da5d437028b07DFcC55"
  );

  const [tokenBurnResponse, setTokenBurnResponse] = useState<string>("");

  const ABI = ["function burn(uint256) public returns (bool success)"];

  async function burnTokens() {
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

        const tokenAmount = ethers.parseUnits(tokenAmt, 1);
        const burnTokens = await contract.burn(tokenAmount);
        // console.log(burnTokens);
        console.log("Hash: ", burnTokens.hash);
        setHash(burnTokens.hash);

        const response = await burnTokens.wait();
        if (response.status == 1) {
          setTokenBurnResponse("");
        } else {
          setTokenBurnResponse("Error Burning the token");
        }
      } catch (error: any) {
        console.error("Error burning token:", error);
        alert(
          "An error occurred while Burning the token. Check console for details."
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
        <BurnTokensInfo />
      </div>
      <div
        className="bg-gray-100 flex flex-col justify-center items-center"
        style={{ height: "66.1vh" }}
      >
        <div className="bg-white shadow-md rounded-lg p-8 w-[550px] mb-6">
          <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
            Amount
            <input
              type="number"
              className="grow"
              placeholder="Token Amt"
              onChange={(e) => setTokenAmt(e.target.value)}
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
            onClick={() => burnTokens()}
          >
            Burn Tokens
          </button>

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

          <div className="text-lg font-bold mt-4">{tokenBurnResponse}</div>
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

export default BurnTokens;
