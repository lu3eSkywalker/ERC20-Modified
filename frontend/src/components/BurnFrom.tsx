import React, { useState } from "react";
import { ethers } from "ethers";
import BurnFromInfo from "./Walkthrough/BurnFromInfo";

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

  const [tokenBurnFromResponse, setTokenBurnFromResponse] =
    useState<string>("");

  const ABI = [
    "function burnFrom(address, uint256) public returns (bool success)",
  ];

  async function burnFrom() {
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

        const burnTokens = await contract.burnFrom(ethAddress, tokenAmount, {
          gasLimit: 10000000,
        });
        console.log(burnTokens);
        setHash(burnTokens.hash);

        const response = await burnTokens.wait();
        if (response.status == 1) {
          setTokenBurnFromResponse("");
        } else {
          setTokenBurnFromResponse("Error burning the token");
        }
      } catch (error: any) {
        console.error("Error burning token:", error);
        alert(
          "An error occurred while burning the token. Check console for details."
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
        <BurnFromInfo />
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
              placeholder="Eth Address to burn tokens from"
              onChange={(e) => setEthAddress(e.target.value)}
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
              placeholder="Token Amt"
              onChange={(e) => setTokenAmt(e.target.value)}
            />
          </label>

          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
            onClick={() => burnFrom()}
          >
            Burn Tokens
          </button>

          <div className="text-lg font-bold mt-4">{tokenBurnFromResponse}</div>
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
            <li className="step step-primary">
              <a href="./burnfrom">Burn From</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BurnFrom;
