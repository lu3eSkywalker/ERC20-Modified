import React, { useState } from "react";
import { ethers } from "ethers";

const TokenInfo = () => {
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [tokenMetadataURI, setTokenMetadataURI] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xb0279db6a2f1e01fbc8483fccef0be2bc6299cc3"
  );

  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const ABI = [
    "function getTokenInfo() public view returns(string memory, string memory, uint256, uint256)",
    "function getTokenMetadata() public view returns (string memory)",
  ];

  async function tokenInfo() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        // This gets the token info
        const tokenInfo = await contract.getTokenInfo();

        const fullTokenInfo = tokenInfo.toString();
        console.log(tokenInfo);
        console.log(fullTokenInfo);

        const name = fullTokenInfo.split(",")[0];
        setTokenName(name);

        const symbol = fullTokenInfo.split(",")[1];
        setTokenSymbol(symbol);

        // const totalSupply = fullTokenInfo.split(",")[2];
        // setTokenSupply(totalSupply);

        const totalSupplyRaw = fullTokenInfo.split(",")[2];
        const decimals = 18; // Adjust this based on your token's actual decimals

        // Convert the raw total supply to a readable format
        const totalSupply = ethers.formatUnits(totalSupplyRaw, decimals);
        setTokenSupply(totalSupply);

        setDataFetched(true);

        // This Gets the token Metadata
        const getTokenMetadata = await contract.getTokenMetadata();
        console.log(getTokenMetadata);
        setTokenMetadataURI(getTokenMetadata);
        console.log(tokenMetadataURI);
        getTokenLogo();
      } catch (error) {
        console.error("Error Getting the Token Info", error);
        alert(
          "An error occurred while Getting the Token Info. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
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
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <div className="bg-gray-100">
      <div
        className="bg-gray-100 flex flex-col justify-center items-center"
        style={{ height: "77.1vh" }}
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

          {dataFetched ? (
            <div className="text-xl font-semibold">
              {" "}
              <p>Name: {tokenName}</p>
              <br />
              <p>Symbol: {tokenSymbol}</p>
              <br />
              <p>Supply: {tokenSupply}</p>
              <br />
              <p>Metadata: {tokenMetadataURI}</p>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
