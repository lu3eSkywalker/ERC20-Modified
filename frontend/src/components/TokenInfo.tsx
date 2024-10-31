import React, { useState } from "react";
import { ethers } from "ethers";

const TokenInfo = () => {
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [tokenMetadataURI, setTokenMetadataURI] = useState<string>("");
  const [tokenLogo, setTokenLogo] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xb0279db6a2f1e01fbc8483fccef0be2bc6299cc3"
  );

  const [tokenResponse, setTokenResponse] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getTokenInfo() public view returns(string memory, string memory, uint256, uint256)",
    "function getTokenMetadata() public view returns (string memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  async function tokenInfo() {
    if (!ethers.isAddress(contractAddress)) {
      setErrorMessage("Invalid Ethereum address");
      return;
    }

    try {
      const tokenInfo = await contract.getTokenInfo();
      const fullTokenInfo = tokenInfo.toString();
      console.log(tokenInfo);
      console.log(fullTokenInfo);

      const name = fullTokenInfo.split(",")[0];
      setTokenName(name);

      const symbol = fullTokenInfo.split(",")[1];
      setTokenSymbol(symbol);

      const totalSupply = fullTokenInfo.split(",")[2];
      setTokenSupply(totalSupply);

      tokenMetaData();
    } catch (error) {
      console.log("Error fetching tokens info", error);
    }
  }

  async function tokenMetaData() {
    const getTokenMetadata = await contract.getTokenMetadata();
    console.log(getTokenMetadata);
    setTokenMetadataURI(getTokenMetadata);
    getTokenLogo();
  }

  async function getTokenLogo() {
    const url = `https://thingproxy.freeboard.io/fetch/${tokenMetadataURI}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.image);
      setTokenLogo(data.image);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
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
            placeholder="contract address"
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </label>

        <button
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
          onClick={() => tokenInfo()}
        >
          Token Info
        </button>

        <br />
        <br />

        <p>Name: {tokenName}</p>
        <br />
        <p>Symbol: {tokenSymbol}</p>
        <br />
        <p>Supply: {tokenSupply}</p>
        <br />
        <p>Metadata: {tokenMetadataURI}</p>

        {errorMessage && (
          <div className="text-red-500 text-lg font-bold mt-4">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenInfo;