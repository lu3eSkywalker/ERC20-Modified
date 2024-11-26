import React, { useState } from "react";
import { ethers } from "ethers";
import AllowanceApprovalInfo from "./Walkthrough/AllowanceApprovalInfo";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import pattern_randomized from "../assets/pattern-randomized.svg";
import bonk from "../assets/bonk.png";

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
            <AllowanceApprovalInfo />
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
            src={bonk}
            alt="bonk"
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
            <div className="absolute w-[550px] h-[400px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50"></div>

            {/* Form Container */}
            <div className="relative bg-white shadow-md rounded-2xl p-8 w-[450px] mb-6">
              <div>
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
              </div>

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => approve()}
              >
                To Approve
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
                      <p className="font-semibold">Allowance approved</p>
                    </h2>
                  )}
                </div>
              }

              <div className="text-lg font-bold">
                {tokenAllowanceApprovalResponse}
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
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AllowanceApproval;
