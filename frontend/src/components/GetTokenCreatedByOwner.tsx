import React, { useState } from "react";
import { ethers } from "ethers";
import GetTokenCreatedByOwnerInfo from "./Walkthrough/GetTokenCreatedByOwnerInfo";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import pattern_randomized from "../assets/pattern-randomized.svg";
import floki from "../assets/floki.png";

const GetTokenCreatedByOwner = () => {
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenResponse, setTokenResponse] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const contractAddress = "0x873b148C1456C57316944377495B330E2fA8e972";
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const ABI = [
    "function getTokensByOwner(address) public view returns (address[] memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  async function getTokensByOwner() {
    if (!ethers.isAddress(ownerAddress)) {
      setErrorMessage("Invalid Ethereum address");
      setTokens([]);
      setTokenResponse("");
      return;
    }

    try {
      const getTokens = await contract.getTokensByOwner(ownerAddress);

      if (getTokens.length > 0) {
        setTokens(getTokens);
        setTokenResponse("");
      } else {
        setTokenResponse("No Tokens Found");
        setTokens([]);
      }
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching tokens:", error);
      setTokenResponse("Error fetching tokens");
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
            <GetTokenCreatedByOwnerInfo />
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
            <div className="absolute w-[550px] h-[350px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50"></div>

            {/* Form Container */}
            <div className="relative bg-white shadow-md rounded-2xl p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 my-4 font-black text-xl">
                  Address:
                  <input
                    type="text"
                    className="grow"
                    placeholder="OwnerAddress"
                    onChange={(e) => setOwnerAddress(e.target.value)}
                  />
                </label>
              </div>

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl my-2"
                onClick={getTokensByOwner}
              >
                getTokensByOwner
              </button>

              <br />
              <br />

              {errorMessage && (
                <div className="text-red-500 text-lg font-bold mt-4">
                  {errorMessage}
                </div>
              )}

              {tokens.map((data, index) => (
                <div
                  key={index}
                  className="text-lg font-semibold text-center break-words"
                >
                  {data}
                  <br />
                  <br />
                </div>
              ))}

              <div className="text-lg font-bold mt-4">{tokenResponse}</div>
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
              <li className="step ">
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

export default GetTokenCreatedByOwner;

<div className="bg-gray-100">
  <br />
  <br />
  <br />
  <br />

  <div className="flex flex-col items-center bg-gray-100">
    <GetTokenCreatedByOwnerInfo />
  </div>
  <div
    className="bg-gray-100 flex flex-col justify-center items-center"
    style={{ height: "63.999999vh" }}
  >
    <div className="bg-white shadow-md rounded-lg p-8 w-[550px] mb-6">
      <div className="min-h-8 mt-4"></div>
    </div>

    <br />
    <br />
    <br />
    <br />
  </div>
</div>;
