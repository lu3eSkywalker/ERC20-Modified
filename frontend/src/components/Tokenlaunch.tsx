import React, { useState } from "react";
import { ethers } from "ethers";
import TokenLaunchInfo from "./Walkthrough/TokenLaunchInfo";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import pattern_randomized from "../assets/pattern-randomized.svg";
import dogecoin from "../assets/dogecoin.png";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const TokenLaunch = () => {
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [metadataURI, setMetadataURI] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const [tokenLaunchResponse, setTokenLaunchResponse] = useState<string>("");

  // Use contract address from the environment variables
  const contractAddress = "0x873b148C1456C57316944377495B330E2fA8e972";

  // ABI of the token contract
  const ABI = [
    "function createToken(uint256, string memory, string memory, string memory) public returns (address)",
    "function getTokensByOwner(address) public view returns (address[] memory)",
  ];

  async function launchToken() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const supply = ethers.parseUnits(tokenSupply, 18);

        const txResponse = await contract.createToken(
          supply,
          tokenName,
          tokenSymbol,
          metadataURI
        );

        const receipt = await txResponse.wait();
        console.log(receipt.toString());

        console.log("Transaction Receipt:", receipt);
        setHash(receipt.transactionHash);

        if (receipt.status == 1) {
          setTokenLaunchResponse("Successfully Launched The Token");
        } else {
          setTokenLaunchResponse("Error Launching The Token");
        }
      } catch (error) {
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
            <TokenLaunchInfo />
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
            src={dogecoin}
            alt="dogecoin"
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
                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2">
                  Token_Name:
                  <input
                    type="text"
                    className="grow"
                    placeholder="DogeCoin"
                    onChange={(e) => setTokenName(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2">
                  Token_Symbol:
                  <input
                    type="text"
                    className="grow"
                    placeholder="DOGE"
                    onChange={(e) => setTokenSymbol(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl">
                  Token_Supply:
                  <input
                    type="text"
                    className="grow"
                    placeholder="1000000"
                    onChange={(e) => setTokenSupply(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
                  Metadata_URI:
                  <input
                    type="text"
                    className="grow"
                    placeholder="http://tokenuri.json"
                    onChange={(e) => setMetadataURI(e.target.value)}
                  />
                </label>
              </div>

              <button
                onClick={() => launchToken()}
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
              >
                Launch Token
              </button>

              <br />
              <br />

              {
                <div className="text-xl">
                  {" "}
                  {hash && (
                    <h2 className="text-lg font-semibold text-center break-words">
                      Tx Hash: {hash}
                      <br />
                      <p className="font-semibold">Token Created</p>
                    </h2>
                  )}
                </div>
              }

              <div className="text-lg font-bold">{tokenLaunchResponse}</div>
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
              <li className="step ">
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

export default TokenLaunch;