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

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function getTokenInfo() public view returns(string memory, string memory, uint256, uint256)",
    "function getTokenMetadata() public view returns (string memory)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(contractAddress || "", ABI, provider);

  async function tokenInfo() {
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

    async function tokenMetaData() {
      const getTokenMetadata = await contract.getTokenMetadata();
      console.log(getTokenMetadata);
      setTokenMetadataURI(getTokenMetadata);
    }

    tokenMetaData();

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

    getTokenLogo();
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <div>
          <input
            type="text"
            placeholder="contract address"
            onChange={(e) => setContractAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button onClick={() => tokenInfo()}>Token Info</button>
        <br></br>
        <br></br>

        <p>Name: {tokenName}</p>
        <br />
        <p>Symbol: {tokenSymbol}</p>
        <br />
        <p>Supply: {tokenSupply}</p>
        <br />
        <p>Metadata: {tokenMetadataURI}</p>

        <br />
        <br />

        <img src={tokenLogo} className="w-30 h-30 rounded-full object-cover" alt="" />
      </div>
    </div>
  );
};

export default TokenInfo;
