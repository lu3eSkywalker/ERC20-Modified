import React, { useState } from "react";
import { ethers } from "ethers";
import TokenTransferInfo from "./Walkthrough/TokenTransferInfo";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import pattern_randomized from "../assets/pattern-randomized.svg";
import floki from "../assets/floki.png";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const TokenTransfer = () => {
  const [toSendToAddress, setToSendToAddress] = useState<string>("");
  const [ethToSend, setEthToSend] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xbf9fBFf01664500A33080Da5d437028b07DFcC55"
  );
  const [hash, setHash] = useState<string>("");

  const [tokenTransferResponse, setTokenTransferResponse] =
    useState<string>("");

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

        const tokenAmount = ethers.parseUnits(ethToSend, 18);
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

        if (receipt.status == 1) {
          setTokenTransferResponse("Token Transferred Successfully");
        } else {
          setTokenTransferResponse("Error Tranferring the Tokens");
        }
      } catch (error) {
        console.error("Error transferring the token:", error);
        alert(
          "An error occurred while transferring the token. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div
      className="bg-container"
      style={{
        backgroundImage: `url(${pattern_randomized.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "90vh",
      }}
    >
      <div>
        <div className="flex justify-between items-center">
          <div className="flex justify-end">
            <Image
              src={asset2}
              alt="Description of the image"
              width={290}
              // height={100}
            />
          </div>

          <div className="flex justify-center flex-grow ml-[200px]">
            <TokenTransferInfo />
          </div>

          <div className="flex justify-start">
            <Image
              src={asset1}
              alt="Description of the image"
              width={500}
              height={300}
            />
          </div>
        </div>

        <div className="absolute left-0" style={{ marginTop: "10px" }}>
          <Image src={asset4} alt="Ethereum Logo" width={400} height={200} />
        </div>

        <div
          className="absolute right-0 rounded-full"
          style={{ marginTop: "20px" }}
        >
          <Image
            src={floki}
            alt="floki"
            width={300}
            height={150}
            className="mx-5 my-5"
          />
        </div>

        <div>
          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "15vh" }}
          >
            {/* Background tilted card */}
            <div className="absolute w-[550px] h-[450px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50"></div>

            {/* Form Container */}
            <div className="relative bg-white shadow-md rounded-2xl p-8 w-[450px] mb-6">
              <div>
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
              </div>

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl my-2"
                onClick={() => tokenTransfer()}
              >
                Transfer Token
              </button>

              <br />
              <br />

              {
                <div className="text-xl">
                  {" "}
                  {hash && (
                    <h2 className="text-lg font-semibold text-center break-words">
                      {`Tx Hash: ${hash}`}
                      <br />
                      <br />
                      <p className="font-semibold">Tokens sent successfully</p>
                    </h2>
                  )}
                </div>
              }

              <div className="text-lg font-bold mt-4">
                {tokenTransferResponse}
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          {/* <div className="bg-purple-200 rounded-2xl p-5"> */}
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
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default TokenTransfer;
